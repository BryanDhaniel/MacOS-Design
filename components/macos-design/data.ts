import type { GraphNode, Perspective, ToolId, UtilityPanel, WindowLayout } from "@/components/macos-design/types";

export const sessionItems = [
  ["Should I leave my job?", "Today, 10:42"],
  ["Pricing a consulting offer", "Yesterday"],
  ["Move closer to family", "May 14"],
] as const;

export const dockTools: { id: ToolId; emoji: string; label: string; tint: string }[] = [
  { id: "conversation", emoji: "💬", label: "Conversation", tint: "indigo" },
  { id: "reasoning", emoji: "🌳", label: "Reasoning Graph", tint: "mint" },
  { id: "perspectives", emoji: "⚖", label: "Perspectives", tint: "gold" },
  { id: "bias", emoji: "🧠", label: "Bias Inspector", tint: "pink" },
  { id: "evidence", emoji: "📚", label: "Evidence", tint: "orange" },
  { id: "reports", emoji: "📊", label: "Reports", tint: "violet" },
  { id: "settings", emoji: "⚙", label: "Settings", tint: "slate" },
];

export const graphNodes: GraphNode[] = [
  { id: "decision", label: "Leave my job?", type: "DECISION", x: "50%", y: "15%", color: "decision" },
  { id: "goals", label: "Autonomy", type: "GOAL", x: "18%", y: "42%", color: "goal" },
  { id: "evidence", label: "12 mo. runway", type: "EVIDENCE", x: "39%", y: "42%", color: "evidence" },
  { id: "assumption", label: "Market demand", type: "ASSUMPTION", x: "61%", y: "42%", color: "assumption" },
  { id: "risk", label: "Income volatility", type: "RISK", x: "82%", y: "42%", color: "risk" },
  { id: "alternative", label: "Test while employed", type: "ALTERNATIVE", x: "18%", y: "75%", color: "alternative" },
  { id: "bias", label: "Optimism bias", type: "BIAS", x: "39%", y: "75%", color: "bias" },
  { id: "counter", label: "Counter argument", type: "COUNTER", x: "61%", y: "75%", color: "counter" },
  { id: "reflection", label: "Reflection", type: "REFLECTION", x: "82%", y: "75%", color: "reflection" },
  { id: "questions", label: "Open questions", type: "OPEN QUESTIONS", x: "50%", y: "57%", color: "questions" },
];

export const perspectives: Perspective[] = [
  ["Economist", "◒", "Cost & upside"],
  ["Psychologist", "◌", "Motivation"],
  ["Engineer", "⌘", "Systems"],
  ["Lawyer", "§", "Downside"],
  ["Friend", "♡", "Human impact"],
  ["Investor", "↗", "Expected value"],
  ["Scientist", "⌬", "Evidence"],
  ["Parent", "⌂", "Stability"],
];

export const utilityPanels: Record<"bias" | "evidence" | "settings", UtilityPanel> = {
  bias: { eyebrow: "BIAS INSPECTOR", title: "Patterns worth challenging", lines: ["Optimism bias  ·  outcome certainty exceeds evidence", "Sunk cost  ·  past effort is shaping the next move", "Anchoring  ·  current salary may be narrowing options"], accent: "rose" },
  evidence: { eyebrow: "EVIDENCE LEDGER", title: "What the decision rests on", lines: ["Verified  ·  savings runway and living costs", "Unverified  ·  customer demand at target price", "Missing  ·  a reversible, low-risk experiment"], accent: "blue" },
  settings: { eyebrow: "WORKSPACE SETTINGS", title: "Reasoning preferences", lines: ["Evidence threshold  ·  Medium", "Default perspective  ·  Economist", "Reflection prompts  ·  Always on"], accent: "slate" },
};

export const windowOrigins: Record<ToolId, WindowLayout> = {
  conversation: { x: 92, y: 82, z: 12 },
  reasoning: { x: 290, y: 138, z: 13 },
  perspectives: { x: 210, y: 108, z: 14 },
  bias: { x: 250, y: 124, z: 14 },
  evidence: { x: 275, y: 148, z: 14 },
  reports: { x: 170, y: 90, z: 14 },
  settings: { x: 330, y: 130, z: 14 },
};
