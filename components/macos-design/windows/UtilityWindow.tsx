import { Icon } from "@/components/macos-design/Icon";
import { WindowFrame } from "@/components/macos-design/WindowFrame";
import type { ToolId, UtilityPanel, WindowChromeProps } from "@/components/macos-design/types";

type UtilityWindowProps = Omit<WindowChromeProps, "title" | "eyebrow"> & {
  id: Extract<ToolId, "bias" | "evidence" | "settings">;
  panel: UtilityPanel;
  onOpenItem: (line: string) => void;
  onAddItem: () => void;
};

export function UtilityWindow({ panel, onOpenItem, onAddItem, ...frameProps }: UtilityWindowProps) {
  return <WindowFrame title={panel.title} eyebrow={panel.eyebrow} {...frameProps}>
    <div className="multi-utility-items">{panel.lines.map((line, index) => <button key={line} onClick={() => onOpenItem(line)}><span>0{index + 1}</span><p>{line}</p><Icon name="chevron" size={14} /></button>)}</div>
    <button className="multi-utility-add" onClick={onAddItem}><Icon name="plus" size={14} /> Add to this workspace</button>
  </WindowFrame>;
}
