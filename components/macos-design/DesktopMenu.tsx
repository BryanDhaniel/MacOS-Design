import { Icon } from "@/components/macos-design/Icon";

export function DesktopMenu() {
  return <header className="desktop-menubar">
    <div className="menu-left"><span className="apple-mark">●</span><strong>BryanD</strong><span>File</span><span>Edit</span><span>View</span><span>Window</span><span>Help</span></div>
    <div className="menu-right"><span><Icon name="bolt" size={13} /> 100%</span><span>◔</span><span>Tue Jul 21&nbsp;&nbsp; 10:42 AM</span></div>
  </header>;
}
