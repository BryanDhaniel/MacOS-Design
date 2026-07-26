import { Icon } from "@/components/macos-design/Icon";
import { Meter } from "@/components/macos-design/Meter";
import { WindowFrame } from "@/components/macos-design/WindowFrame";
import type { WindowChromeProps } from "@/components/macos-design/types";

type BiasInspectorWindowProps = Omit<WindowChromeProps, "id" | "title" | "eyebrow">;

export function BiasInspectorWindow(props: BiasInspectorWindowProps) {
  return <WindowFrame id="bias" eyebrow="BIAS INSPECTOR" title="Patterns worth challenging" {...props}>
    <div className="bias-inspector-screen">
      <header className="bias-overview"><div><small>COGNITIVE PRESSURE</small><strong>2 patterns detected</strong><p>These are hypotheses to examine—not labels to accept.</p></div><div className="bias-score"><span>Medium</span><strong>62<small>/100</small></strong><Meter value={6.2} /></div></header>
      <div className="bias-card-grid">
        <article className="bias-detail-card optimism"><div className="bias-card-heading"><span>◒</span><div><small>01 · OPTIMISM BIAS</small><h3>Upside is more vivid than downside</h3></div><b>MEDIUM</b></div><blockquote>“It feels like the right move.”</blockquote><p>The confidence in the move is stronger than the evidence currently available to support it.</p><div className="bias-challenge"><Icon name="spark" size={15} /><div><small>CHALLENGE IT</small><strong>What would make this plan fail even if you execute well?</strong></div></div></article>
        <article className="bias-detail-card sunk"><div className="bias-card-heading"><span>↺</span><div><small>02 · SUNK COST FALLACY</small><h3>Past effort may be steering the next move</h3></div><b>LOW</b></div><blockquote>“I’ve already spent years building this skill set.”</blockquote><p>Time already invested is relevant context, but it should not determine whether the next step has value.</p><div className="bias-challenge"><Icon name="spark" size={15} /><div><small>CHALLENGE IT</small><strong>If you were starting today, would you still choose this path?</strong></div></div></article>
      </div>
      <footer className="bias-footer"><span><Icon name="shield" size={15} /></span><p><strong>No recommendation issued.</strong> Gather the missing evidence before committing to an interpretation.</p><button>View reasoning notes <Icon name="arrow" size={14} /></button></footer>
    </div>
  </WindowFrame>;
}
