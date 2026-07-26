import type { ReactNode } from "react";

export type ToolId =
  | "conversation"
  | "reasoning"
  | "perspectives"
  | "bias"
  | "evidence"
  | "reports"
  | "settings";

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

export type GraphNode = {
  id: string;
  label: string;
  type: string;
  x: string;
  y: string;
  color: string;
};

export type Perspective = readonly [name: string, glyph: string, detail: string];

export type UtilityPanel = {
  eyebrow: string;
  title: string;
  lines: string[];
  accent: string;
};
