import { dockTools } from "@/components/macos-design/data";
import type { ToolId } from "@/components/macos-design/types";

type ToolDockProps = { openTools: ToolId[]; onToggle: (tool: ToolId) => void };

export function ToolDock({ openTools, onToggle }: ToolDockProps) {
  return <nav className="toolbox-dock" aria-label="Aletheia tools">
    {dockTools.map((tool) => <button key={tool.id} className={`toolbox-icon ${tool.tint} ${openTools.includes(tool.id) ? "active" : ""}`} onClick={() => onToggle(tool.id)} aria-label={tool.label}><span>{tool.emoji}</span><small>{tool.label}</small><i /></button>)}
  </nav>;
}
