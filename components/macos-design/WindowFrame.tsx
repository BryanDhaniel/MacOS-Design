import { useRef } from "react";
import type { WindowFrameProps } from "@/components/macos-design/types";

export function WindowFrame({ id, title, eyebrow, layout, isClosing, showChatLink = true, children, onFocus, onClose, onOpenChat, onMove }: WindowFrameProps) {
  const drag = useRef<{ x: number; y: number; originX: number; originY: number } | null>(null);

  function startDrag(event: React.PointerEvent<HTMLElement>) {
    const frame = event.currentTarget.closest(".mac-window");
    if (!frame) return;
    const bounds = frame.getBoundingClientRect();
    onFocus(id);
    drag.current = { x: event.clientX, y: event.clientY, originX: bounds.left, originY: bounds.top };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function beginTitleDrag(event: React.PointerEvent<HTMLElement>) {
    if (event.button !== 0) return;
    if ((event.target as HTMLElement).closest("button")) return;
    startDrag(event);
  }

  function beginRightClickDrag(event: React.PointerEvent<HTMLElement>) {
    if (event.button !== 2) return;
    event.preventDefault();
    startDrag(event);
  }

  function moveDrag(event: React.PointerEvent<HTMLElement>) {
    if (!drag.current) return;
    onMove(id, drag.current.originX + event.clientX - drag.current.x, drag.current.originY + event.clientY - drag.current.y);
  }

  function endDrag() { drag.current = null; }

  return <section className={`mac-window ${id}-mac-window ${isClosing ? "closing" : ""}`} style={{ left: layout.x, top: layout.y, zIndex: layout.z }} onPointerDown={(event) => { onFocus(id); beginRightClickDrag(event); }} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} onContextMenu={(event) => event.preventDefault()}>
    <header className="mac-window-bar" onPointerDown={beginTitleDrag}>
      <span className="window-dots"><button onClick={() => onClose(id)} aria-label={`Close ${title}`} /><i /><i /></span>
      <div className="mac-window-title"><small>{eyebrow}</small><strong>{title}</strong></div>
      {showChatLink && <button className="window-chat-link" onClick={onOpenChat}><span>💬</span> Career decision</button>}
    </header>
    <div className="mac-window-content">{children}</div>
    <span className="window-resize-grip" aria-hidden="true">⋰</span>
  </section>;
}
