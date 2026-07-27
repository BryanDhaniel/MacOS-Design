import type { ToolId, WindowLayout, UtilityPanel } from "@/components/macos-design/types";

export const dockTools: { id: ToolId; emoji: string; label: string; tint: string; icon: string }[] = [
  { id: "finder", emoji: "⌣", label: "Finder", tint: "blue", icon: "/icons/finder.png" },
  { id: "safari", emoji: "⌘", label: "Safari", tint: "blue", icon: "/icons/safari.svg" },
  { id: "photos", emoji: "✦", label: "Photos", tint: "pink", icon: "/icons/photos.svg" },
  { id: "notes", emoji: "☰", label: "Notes", tint: "gold", icon: "/icons/notes.svg" },
  { id: "mail", emoji: "✉", label: "Mail", tint: "blue", icon: "/icons/mail.svg" },
  { id: "terminal", emoji: ">_", label: "Terminal", tint: "slate", icon: "/icons/terminal.svg" },
  { id: "calculator", emoji: "±", label: "Calculator", tint: "slate", icon: "/icons/calculator.svg" },
  { id: "settings", emoji: "⚙", label: "Settings", tint: "slate", icon: "/icons/Settings_macOS.png" },
];

export const utilityPanels: Record<"settings", UtilityPanel> = {
  settings: { eyebrow: "WORKSPACE SETTINGS", title: "Reasoning preferences", lines: ["Evidence threshold  ·  Medium", "Default perspective  ·  Economist", "Reflection prompts  ·  Always on"], accent: "slate" },
};

export const windowOrigins: Record<ToolId, WindowLayout> = {
  settings: { x: 330, y: 130, z: 14 },
  finder: { x: 380, y: 160, z: 13 },
  safari: { x: 430, y: 160, z: 12 },
  photos: { x: 480, y: 160, z: 11 },
  notes: { x: 530, y: 160, z: 10 },
  mail: { x: 580, y: 160, z: 9 },
  terminal: { x: 630, y: 160, z: 8 },
  calculator: { x: 680, y: 160, z: 7 },
};
