"use client";

import { useState } from "react";
import { DesktopMenu } from "@/components/macos-design/DesktopMenu";
import { windowOrigins } from "@/components/macos-design/data";
import { Toast } from "@/components/macos-design/Toast";
import { ToolDock } from "@/components/macos-design/ToolDock";
import type { ToolId, WindowLayout } from "@/components/macos-design/types";
import { SettingsWindow, type WallpaperId } from "@/components/macos-design/windows/SettingsWindow";

export default function Home() {
  const [notice, setNotice] = useState("");
  const [openTools, setOpenTools] = useState<ToolId[]>(["settings"]);
  const [closingTools, setClosingTools] = useState<ToolId[]>([]);
  const [windowLayout, setWindowLayout] = useState<Record<ToolId, WindowLayout>>(windowOrigins);
  const [wallpaper, setWallpaper] = useState<WallpaperId>("aletheia");
  const [, setTopWindowLayer] = useState(20);

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

  function moveWindow(id: ToolId, x: number, y: number) {
    setWindowLayout((layout) => ({ ...layout, [id]: { ...layout[id], x, y } }));
  }

  const frameProps = (id: ToolId) => ({
    layout: windowLayout[id],
    isClosing: closingTools.includes(id),
    onFocus: focusWindow,
    onClose: closeTool,
    onOpenChat: () => {},
    onMove: moveWindow,
  });

  return <main className={`mac-desktop wallpaper-${wallpaper}`}>
    <DesktopMenu />
    {openTools.includes("settings") && <SettingsWindow {...frameProps("settings")} wallpaper={wallpaper} onWallpaperChange={(nextWallpaper) => { setWallpaper(nextWallpaper); setNotice(`${nextWallpaper === "aletheia" ? "Aletheia" : nextWallpaper === "aurora" ? "Aurora" : nextWallpaper === "mist" ? "Morning mist" : "Midnight"} wallpaper applied`); }} onLogout={() => { closeTool("settings"); setNotice("Signed out of Aletheia"); }} />}
    <ToolDock openTools={openTools} onToggle={toggleTool} />
    {notice && <Toast message={notice} onDismiss={() => setNotice("")} />}
  </main>;
}
