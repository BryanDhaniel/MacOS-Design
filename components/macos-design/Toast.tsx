import { Icon } from "@/components/macos-design/Icon";

export function Toast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return <div className="toast"><Icon name="shield" size={15} />{message}<button onClick={onDismiss} aria-label="Dismiss"><Icon name="close" size={14} /></button></div>;
}
