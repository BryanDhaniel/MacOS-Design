import type { ReactNode } from "react";

export type IconName = "spark" | "plus" | "arrow" | "chevron" | "more" | "shield" | "bolt" | "close";

export function Icon({ name, size = 18, stroke = 1.8 }: { name: IconName; size?: number; stroke?: number }) {
  const paths: Record<IconName, ReactNode> = {
    spark: <><path d="m12 2 1.65 5.35L19 9l-5.35 1.65L12 16l-1.65-5.35L5 9l5.35-1.65L12 2Z" /><path d="m19 15 .75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75L19 15Z" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    arrow: <><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    more: <><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" /></>,
    shield: <><path d="M12 3 20 6v5c0 5.1-3.3 8.3-8 10-4.7-1.7-8-4.9-8-10V6l8-3Z" /><path d="m8.6 12.2 2.2 2.2 4.7-4.8" /></>,
    bolt: <path d="m13.2 2-8 11.2h6.4L10.8 22l8-11.2h-6.4L13.2 2Z" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
  };

  return <svg aria-hidden="true" className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}
