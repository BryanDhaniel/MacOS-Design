import { Icon } from "@/components/macos-design/Icon";
import { WindowFrame } from "@/components/macos-design/WindowFrame";
import type { WindowChromeProps } from "@/components/macos-design/types";

export type WallpaperId = "aletheia" | "aurora" | "mist" | "midnight";

type SettingsWindowProps = Omit<WindowChromeProps, "id" | "title" | "eyebrow"> & {
  wallpaper: WallpaperId;
  onWallpaperChange: (wallpaper: WallpaperId) => void;
  onLogout: () => void;
};

const wallpapers: { id: WallpaperId; name: string; detail: string }[] = [
  { id: "aletheia", name: "Aletheia", detail: "Current artwork" },
  { id: "aurora", name: "Aurora", detail: "Lilac atmosphere" },
  { id: "mist", name: "Morning mist", detail: "Soft neutral" },
  { id: "midnight", name: "Midnight", detail: "Deep focus" },
];

export function SettingsWindow({ wallpaper, onWallpaperChange, onLogout, ...frameProps }: SettingsWindowProps) {
  return <WindowFrame id="settings" eyebrow="WORKSPACE SETTINGS" title="Preferences" {...frameProps}>
    <div className="settings-screen">
      <aside className="settings-nav"><div className="settings-profile"><span>AM</span><div><strong>Alex Morgan</strong><small>Personal workspace</small></div></div><button><span>⌘</span> General</button><button className="active"><span>◌</span> Appearance</button><button><span>◒</span> Reasoning</button><button><span>⌁</span> Privacy & data</button><button><span>⌨</span> Shortcuts</button></aside>
      <main className="settings-content"><header><small>APPEARANCE</small><h2>Make this workspace yours.</h2><p>Changes apply instantly to this workspace.</p></header><section className="settings-section"><div className="settings-section-heading"><div><small>WALLPAPER</small><h3>Desktop background</h3></div><span>Click a preset to apply it</span></div><div className="wallpaper-grid">{wallpapers.map((item) => <button key={item.id} onClick={() => onWallpaperChange(item.id)} className={wallpaper === item.id ? `wallpaper-option ${item.id} active` : `wallpaper-option ${item.id}`}><i>{wallpaper === item.id ? "✓" : ""}</i><strong>{item.name}</strong><small>{item.detail}</small></button>)}</div></section><section className="settings-section settings-options"><div className="settings-section-heading"><div><small>REASONING DEFAULTS</small><h3>How Aletheia challenges you</h3></div></div><label><span><strong>Evidence threshold</strong><small>Mark claims as tentative until adequate support exists.</small></span><button>Medium <b>⌄</b></button></label><label><span><strong>Default perspective</strong><small>Use this lens first when a new session starts.</small></span><button>Economist <b>⌄</b></button></label><label><span><strong>Reflection prompts</strong><small>End every completed session with open questions.</small></span><button className="settings-switch active" aria-label="Reflection prompts enabled"><i /></button></label></section><section className="settings-section danger-zone"><div><small>ACCOUNT</small><h3>Sign out of Aletheia</h3><p>Your local preferences remain on this device.</p></div><button onClick={onLogout}><Icon name="close" size={14} /> Log out</button></section></main>
    </div>
  </WindowFrame>;
}
