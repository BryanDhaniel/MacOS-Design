"use client";

import { useRef, useState } from "react";
import { DesktopMenu } from "@/components/macos-design/DesktopMenu";
import { windowOrigins } from "@/components/macos-design/data";
import { Toast } from "@/components/macos-design/Toast";
import { ToolDock } from "@/components/macos-design/ToolDock";
import type { ToolId, WindowLayout } from "@/components/macos-design/types";
import { ConversationWindow } from "@/components/macos-design/windows/ConversationWindow";
import { BiasInspectorWindow } from "@/components/macos-design/windows/BiasInspectorWindow";
import { EvidenceWindow } from "@/components/macos-design/windows/EvidenceWindow";
import { PerspectivesWindow } from "@/components/macos-design/windows/PerspectivesWindow";
import { ReasoningGraphWindow } from "@/components/macos-design/windows/ReasoningGraphWindow";
import { ReportWindow } from "@/components/macos-design/windows/ReportWindow";
import { SettingsWindow, type WallpaperId } from "@/components/macos-design/windows/SettingsWindow";

export default function Home() {
  const [draft, setDraft] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isChatSidebarOpen, setIsChatSidebarOpen] = useState(true);
  const [notice, setNotice] = useState("");
  const [activePerspective, setActivePerspective] = useState("Economist");
  const [selectedNode, setSelectedNode] = useState("decision");
  const [isolatedNode, setIsolatedNode] = useState(false);
  const [canvasScale, setCanvasScale] = useState(1);
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [openTools, setOpenTools] = useState<ToolId[]>(["conversation"]);
  const [closingTools, setClosingTools] = useState<ToolId[]>([]);
  const [windowLayout, setWindowLayout] = useState<Record<ToolId, WindowLayout>>(windowOrigins);
  const [wallpaper, setWallpaper] = useState<WallpaperId>("aletheia");
  const [, setTopWindowLayer] = useState(20);
  const canvasDrag = useRef<{ x: number; y: number; originX: number; originY: number } | null>(null);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.trim() || isThinking) return;
    setDraft("");
    setIsThinking(true);
    window.setTimeout(() => setIsThinking(false), 700);
  }

  function focusWindow(id: ToolId) {
    setTopWindowLayer((layer) => {
      const z = layer + 1;
      setWindowLayout((layout) => ({ ...layout, [id]: { ...layout[id], z } }));
      return z;
    });
  }

  function closeTool(id: ToolId) {
    if (closingTools.includes(id)) return;
    setClosingTools((tools) => [...tools, id]);
    window.setTimeout(() => {
      setOpenTools((tools) => tools.filter((tool) => tool !== id));
      setClosingTools((tools) => tools.filter((tool) => tool !== id));
    }, 180);
  }

  function toggleTool(id: ToolId) {
    if (openTools.includes(id)) {
      closeTool(id);
      return;
    }
    setOpenTools((tools) => [...tools, id]);
    focusWindow(id);
  }

  function openConversation() {
    if (!openTools.includes("conversation")) setOpenTools((tools) => [...tools, "conversation"]);
    focusWindow("conversation");
  }

  function moveWindow(id: ToolId, x: number, y: number) {
    setWindowLayout((layout) => ({ ...layout, [id]: { ...layout[id], x, y } }));
  }

  function beginCanvasDrag(event: React.PointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("button")) return;
    canvasDrag.current = { x: event.clientX, y: event.clientY, originX: canvasOffset.x, originY: canvasOffset.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveCanvas(event: React.PointerEvent<HTMLDivElement>) {
    if (!canvasDrag.current) return;
    setCanvasOffset({ x: canvasDrag.current.originX + event.clientX - canvasDrag.current.x, y: canvasDrag.current.originY + event.clientY - canvasDrag.current.y });
  }

  function endCanvasDrag() { canvasDrag.current = null; }

  function zoomCanvas(event: React.WheelEvent<HTMLDivElement>) {
    event.preventDefault();
    setCanvasScale((value) => Math.max(.55, Math.min(1.5, value - event.deltaY * .001)));
  }

  const frameProps = (id: ToolId) => ({
    layout: windowLayout[id],
    isClosing: closingTools.includes(id),
    onFocus: focusWindow,
    onClose: closeTool,
    onOpenChat: openConversation,
    onMove: moveWindow,
  });

  return <main className={`mac-desktop wallpaper-${wallpaper}`}>
    <DesktopMenu />
    {openTools.includes("conversation") && <ConversationWindow {...frameProps("conversation")} draft={draft} isThinking={isThinking} onDraftChange={setDraft} onSubmit={submit} onNewConversation={() => { setDraft(""); setNotice("New conversation created"); }} onOpenHistory={(title) => setNotice(`Opened “${title}”`)} isSidebarOpen={isChatSidebarOpen} onToggleSidebar={() => setIsChatSidebarOpen((isOpen) => !isOpen)} />}
    {openTools.includes("reasoning") && <ReasoningGraphWindow {...frameProps("reasoning")} canvasScale={canvasScale} canvasOffset={canvasOffset} isThinking={isThinking} isolatedNode={isolatedNode} selectedNode={selectedNode} onScaleChange={setCanvasScale} onReset={() => { setCanvasScale(1); setCanvasOffset({ x: 0, y: 0 }); }} onCanvasPointerDown={beginCanvasDrag} onCanvasPointerMove={moveCanvas} onCanvasPointerEnd={endCanvasDrag} onCanvasWheel={zoomCanvas} onSelectNode={(id) => { setSelectedNode(id); setIsolatedNode(false); }} onIsolateNode={(id) => { setSelectedNode(id); setIsolatedNode(true); }} />}
    {openTools.includes("perspectives") && <PerspectivesWindow {...frameProps("perspectives")} activePerspective={activePerspective} onSelectPerspective={setActivePerspective} />}
    {openTools.includes("bias") && <BiasInspectorWindow {...frameProps("bias")} />}
    {openTools.includes("evidence") && <EvidenceWindow {...frameProps("evidence")} />}
    {openTools.includes("settings") && <SettingsWindow {...frameProps("settings")} wallpaper={wallpaper} onWallpaperChange={(nextWallpaper) => { setWallpaper(nextWallpaper); setNotice(`${nextWallpaper === "aletheia" ? "Aletheia" : nextWallpaper === "aurora" ? "Aurora" : nextWallpaper === "mist" ? "Morning mist" : "Midnight"} wallpaper applied`); }} onLogout={() => { closeTool("settings"); setNotice("Signed out of Aletheia"); }} />}
    {openTools.includes("reports") && <ReportWindow {...frameProps("reports")} />}
    <ToolDock openTools={openTools} onToggle={toggleTool} />
    {notice && <Toast message={notice} onDismiss={() => setNotice("")} />}
  </main>;
}
