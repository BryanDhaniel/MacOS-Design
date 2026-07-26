import type { FormEvent } from "react";
import { Icon } from "@/components/macos-design/Icon";
import { sessionItems } from "@/components/macos-design/data";
import { WindowFrame } from "@/components/macos-design/WindowFrame";
import type { WindowChromeProps } from "@/components/macos-design/types";

type ConversationWindowProps = Omit<WindowChromeProps, "id" | "title" | "eyebrow" | "showChatLink"> & {
  draft: string;
  isThinking: boolean;
  onDraftChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onNewConversation: () => void;
  onOpenHistory: (title: string) => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
};

export function ConversationWindow({ draft, isThinking, onDraftChange, onSubmit, onNewConversation, onOpenHistory, isSidebarOpen, onToggleSidebar, ...frameProps }: ConversationWindowProps) {
  return <WindowFrame id="conversation" eyebrow="CONVERSATION" title="Career decision" showChatLink={false} {...frameProps}>
    <div className="chatgpt-layout">
      <aside className={isSidebarOpen ? "chatgpt-sidebar" : "chatgpt-sidebar closed"}>
        <div className="chatgpt-brand"><span>✦</span><strong>BryanDhaniel</strong><button onClick={onToggleSidebar} aria-label="Close sidebar">‹</button></div>
        <button className="chatgpt-new" onClick={onNewConversation}><Icon name="plus" size={15} /> New chat <kbd>⌘ K</kbd></button>
        <button className="chatgpt-search"><span>⌕</span> Search chats</button>
        <div className="chatgpt-history-label">TODAY</div>
        {sessionItems.slice(0, 1).map(([title]) => <button key={title} className="chatgpt-history-item active" onClick={() => onOpenHistory(title)}><span>{title}</span><i>•••</i></button>)}
        <div className="chatgpt-history-label">PREVIOUS 7 DAYS</div>
        {sessionItems.slice(1).map(([title]) => <button key={title} className="chatgpt-history-item" onClick={() => onOpenHistory(title)}><span>{title}</span><i>•••</i></button>)}
        <button className="chatgpt-history-item"><span>Career experiments</span><i>•••</i></button>
        <div className="chatgpt-sidebar-footer"><span>AM</span><div><strong>Alex Morgan</strong><small>Free plan</small></div><b>⋯</b></div>
      </aside>
      <section className="chatgpt-main">
        <header className="chatgpt-topbar"><div><button className="sidebar-toggle" onClick={onToggleSidebar} aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}>☰</button><button>BryanD <span>⌄</span></button></div><div><button aria-label="Share chat">↗</button><button aria-label="More options">•••</button></div></header>
        <div className="chatgpt-thread">
          <div className="chatgpt-topic"><span>✦</span><div><small>REASONING MODE</small><strong>Career decision</strong></div></div>
          <p className="chatgpt-user-message">I’m wondering whether leaving now is a real opportunity or just a reaction to feeling stuck.</p>
          {isThinking ? <div className="chatgpt-thinking"><span><i /><i /><i /></span> Aletheia is thinking</div> : <div className="chatgpt-response"><span className="chatgpt-response-mark">✦</span><div><p><strong>Start with the counterfactual.</strong> What would have to be true for staying six more months to be the more rational experiment?</p><ul><li>Separate dissatisfaction from opportunity.</li><li>Name the evidence that would change your mind.</li></ul><div className="chatgpt-actions"><button>↻</button><button>⧉</button><button>♡</button><button>♧</button></div></div></div>}
        </div>
        <form className="chatgpt-composer" onSubmit={onSubmit}><textarea value={draft} onChange={(event) => onDraftChange(event.target.value)} rows={1} placeholder="Message BryanD" /><div className="chatgpt-composer-bar"><div><button type="button" aria-label="Attach"><Icon name="plus" size={16} /></button><button type="button" className="reasoning-chip">Reasoning <span>⌄</span></button></div><div><button type="button" aria-label="Voice input" className="voice-button">◉</button><button type="submit" aria-label="Send message" className={draft.trim() ? "chatgpt-send ready" : "chatgpt-send"}><Icon name="arrow" size={15} /></button></div></div></form>
        <p className="chatgpt-disclaimer">Aletheia can make mistakes. Check important information.</p>
      </section>
    </div>
  </WindowFrame>;
}
