import { perspectives } from "@/components/macos-design/data";
import { WindowFrame } from "@/components/macos-design/WindowFrame";
import type { WindowChromeProps } from "@/components/macos-design/types";

type PerspectivesWindowProps = Omit<WindowChromeProps, "id" | "title" | "eyebrow"> & {
  activePerspective: string;
  onSelectPerspective: (name: string) => void;
};

export function PerspectivesWindow({ activePerspective, onSelectPerspective, ...frameProps }: PerspectivesWindowProps) {
  return <WindowFrame id="perspectives" eyebrow="PERSPECTIVE ENGINE" title="Borrow a different lens" {...frameProps}>
    <div className="multi-perspective-grid">{perspectives.map(([name, glyph, detail]) => <button key={name} onClick={() => onSelectPerspective(name)} className={activePerspective === name ? "perspective-card active" : "perspective-card"}><span>{glyph}</span><strong>{name}</strong><small>{detail}</small></button>)}</div>
    <div className="multi-perspective-footer"><span>ACTIVE LENS</span><strong>{activePerspective}</strong><p>Reframe the decision through a different set of priorities.</p></div>
  </WindowFrame>;
}
