import { LayoutPanelLeft, Search } from "lucide-react";

export function TitleBar() {
    return (
        <div className="flex items-center justify-between h-10 px-4 bg-panel border-b border-border select-none text-xs text-muted">
            {/* Mac window controls */}
            <div className="flex items-center gap-2 w-1/3">
                <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500" />

                <LayoutPanelLeft className="w-4 h-4 ml-2 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
            </div>

            {/* Title */}
            <div className="flex-1 text-center font-medium tracking-wide">
                anas-portfolio — claude-bash — 80x24
            </div>

            {/* Right side actions */}
            <div className="flex justify-end gap-3 w-1/3">
                <div className="flex items-center gap-2 bg-background px-2 py-1 rounded border border-border">
                    <Search className="w-3 h-3" />
                    <span>Search</span>
                    <span className="opacity-50 ml-2">⌘K</span>
                </div>
            </div>
        </div>
    );
}
