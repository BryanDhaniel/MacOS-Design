import { Meter } from "@/components/macos-design/Meter";
import { WindowFrame } from "@/components/macos-design/WindowFrame";
import type { WindowChromeProps } from "@/components/macos-design/types";

type ReportWindowProps = Omit<WindowChromeProps, "id" | "title" | "eyebrow">;

export function ReportWindow(props: ReportWindowProps) {
  return <WindowFrame id="reports" eyebrow="DECISION REPORT" title="Career decision report" {...props}>
    <div className="multi-report"><h2>Evidence before momentum.</h2><p>The case for leaving is emotionally coherent, but still strategically under-specified.</p><div className="report-metrics"><div><small>DECISION QUALITY</small><strong>46<span>/100</span></strong><Meter value={4.6} /></div><div><small>EVIDENCE BREAKDOWN</small><strong>2<span> verified</span></strong><p>3 key inputs still missing</p></div><div><small>ALTERNATIVE PATH</small><strong>Test first</strong><p>Keep the option reversible</p></div></div><div className="report-timeline"><small>REASONING TIMELINE</small><div><span>01</span><p><strong>Claim surfaced</strong> — autonomy is worth the income risk</p></div><div><span>02</span><p><strong>Assumption challenged</strong> — demand is not yet verified</p></div><div><span>03</span><p><strong>Next experiment</strong> — secure three paid commitments</p></div></div></div>
  </WindowFrame>;
}
