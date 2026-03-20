# Portfolio-Agent

An interactive AI-powered portfolio built to look and feel like **Claude Code** — a terminal IDE in the browser, backed by a real AI assistant (Chitti) powered by Groq.

## Features

- **Terminal interface** — type commands like `about`, `projects`, `experience`, `skills`, `contact` for instant responses
- **Chitti AI** — natural language Q&A about Anas, powered by Groq's compound model with SSE streaming
- **Autocomplete** — Tab/arrow key command suggestions as you type
- **VS Code-style panels** — Problems, Output, Debug Console, Terminal, Ports tabs
- **Standard view** — `/non-tech` command switches to a scroll-based portfolio with photo collage hero
- **Live GitHub activity** — sidebar shows recent public GitHub events
- **Session rate limiting** — 15 AI messages per session

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS** + **Framer Motion**
- **Groq SDK** (compound model, SSE streaming)
- **Lucide React** icons

