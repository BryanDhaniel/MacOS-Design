import type { ReactNode } from "react";

export type ToolId = "settings" | "finder" | "safari" | "photos" | "notes" | "mail" | "terminal" | "calculator";

export type WindowLayout = { x: number; y: number; z: number };

export type WindowChromeProps = {
  id: ToolId;
  title: string;
  eyebrow: string;
  layout: WindowLayout;
  isClosing: boolean;
  showChatLink?: boolean;
  onFocus: (id: ToolId) => void;
  onClose: (id: ToolId) => void;
  onOpenChat: () => void;
  onMove: (id: ToolId, x: number, y: number) => void;
};

export type WindowFrameProps = WindowChromeProps & { children: ReactNode };

export type UtilityPanel = {
  eyebrow: string;
  title: string;
  lines: string[];
  accent: string;
};
