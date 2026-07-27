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
    <div className="w-full h-full bg-white" style={{ minHeight: "400px" }} />
  </WindowFrame>;
}
