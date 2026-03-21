import { NextRequest } from "next/server";
import Groq from "groq-sdk";
import { checkRateLimit } from "@/lib/rate-limiter";
import { chittiSystemPrompt } from "@/data/portfolio";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId, history } = await req.json();

    const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!message || !sessionId) {
      return new Response(JSON.stringify({ error: "Missing message or sessionId" }), { status: 400 });
    }

    if (!UUID_REGEX.test(sessionId)) {
      return new Response(JSON.stringify({ error: "Invalid session" }), { status: 400 });
    }

    if (typeof message !== "string" || message.length > 500) {
      return new Response(JSON.stringify({ error: "Message too long" }), { status: 400 });
    }

    const rateCheck = checkRateLimit(sessionId);
    if (!rateCheck.allowed) {
      return new Response(JSON.stringify({ error: rateCheck.message }), { status: 429 });
    }

    const messages = [
      { role: "system" as const, content: chittiSystemPrompt },
      ...(history || []).slice(-6).map((h: { role: string; content: string }) => ({
        role: h.role as "user" | "assistant",
        content: h.content,
      })),
      { role: "user" as const, content: message },
    ];

    const stream = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages,
      temperature: 0.7,
      max_completion_tokens: 512,
      top_p: 1,
      stream: true,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        // Send remaining count as first chunk metadata
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ meta: true, remaining: rateCheck.remaining })}\n\n`)
        );

        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || "";
          if (text) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
            );
          }
        }

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Try a command like 'help' instead." }),
      { status: 500 }
    );
  }
}
