import { Icon } from "@/components/macos-design/Icon";
import { Meter } from "@/components/macos-design/Meter";
import { WindowFrame } from "@/components/macos-design/WindowFrame";
import type { WindowChromeProps } from "@/components/macos-design/types";

type EvidenceWindowProps = Omit<WindowChromeProps, "id" | "title" | "eyebrow">;

const evidenceGroups = [
  { status: "VERIFIED", title: "Confirmed inputs", tone: "verified", count: "02", rows: [["Savings runway", "12 months · checked today"], ["Living costs", "Fixed monthly baseline"]] },
  { status: "UNVERIFIED", title: "Claims to test", tone: "unverified", count: "02", rows: [["Market demand", "No paid proof yet"], ["Return-to-work option", "Assumed, not validated"]] },
  { status: "MISSING", title: "Information needed", tone: "missing", count: "03", rows: [["Customer commitments", "Before resigning"], ["Experiment budget", "Cap the cost of learning"], ["Decision date", "Avoid indefinite delay"]] },
] as const;

export function EvidenceWindow(props: EvidenceWindowProps) {
  return <WindowFrame id="evidence" eyebrow="EVIDENCE LEDGER" title="What the decision rests on" {...props}>
    <div className="evidence-screen">
      <header className="evidence-overview"><div><small>EVIDENCE STRENGTH</small><strong>Low <span>· insufficient validation</span></strong><p>The case relies more on felt urgency than observable market signal.</p></div><div className="evidence-score"><span>Coverage</span><strong>32%</strong><Meter value={3.2} /></div></header>
      <div className="evidence-columns">{evidenceGroups.map((group) => <section key={group.status} className={`evidence-column ${group.tone}`}><header><div><small>{group.status}</small><h3>{group.title}</h3></div><strong>{group.count}</strong></header><div className="evidence-rows">{group.rows.map(([label, detail]) => <article key={label}><span>{group.tone === "verified" ? "✓" : group.tone === "unverified" ? "?" : "+"}</span><div><strong>{label}</strong><p>{detail}</p></div><button aria-label={`Open ${label}`}><Icon name="chevron" size={14} /></button></article>)}</div><button className="evidence-add"><Icon name="plus" size={14} /> Add evidence</button></section>)}</div>
      <footer className="evidence-footer"><Icon name="spark" size={16} /><p><strong>Next useful experiment:</strong> get three paid customer commitments before treating market demand as confirmed.</p><button>Open experiment <Icon name="arrow" size={14} /></button></footer>
    </div>
  </WindowFrame>;
}
