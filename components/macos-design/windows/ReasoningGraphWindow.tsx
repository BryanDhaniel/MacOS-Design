import type { PointerEvent, WheelEvent } from "react";
import { graphNodes } from "@/components/macos-design/data";
import { WindowFrame } from "@/components/macos-design/WindowFrame";
import type { WindowChromeProps } from "@/components/macos-design/types";

type ReasoningGraphWindowProps = Omit<WindowChromeProps, "id" | "title" | "eyebrow"> & {
  canvasScale: number;
  canvasOffset: { x: number; y: number };
  isThinking: boolean;
  isolatedNode: boolean;
  selectedNode: string;
  onScaleChange: (updater: (value: number) => number) => void;
  onReset: () => void;
  onCanvasPointerDown: (event: PointerEvent<HTMLDivElement>) => void;
  onCanvasPointerMove: (event: PointerEvent<HTMLDivElement>) => void;
  onCanvasPointerEnd: () => void;
  onCanvasWheel: (event: WheelEvent<HTMLDivElement>) => void;
  onSelectNode: (id: string) => void;
  onIsolateNode: (id: string) => void;
};

export function ReasoningGraphWindow({ canvasScale, canvasOffset, isThinking, isolatedNode, selectedNode, onScaleChange, onReset, onCanvasPointerDown, onCanvasPointerMove, onCanvasPointerEnd, onCanvasWheel, onSelectNode, onIsolateNode, ...frameProps }: ReasoningGraphWindowProps) {
  return <WindowFrame id="reasoning" eyebrow="REASONING GRAPH" title="Career decision map" {...frameProps}>
    <div className="multi-graph-surface" onPointerDown={onCanvasPointerDown} onPointerMove={onCanvasPointerMove} onPointerUp={onCanvasPointerEnd} onPointerCancel={onCanvasPointerEnd} onWheel={onCanvasWheel}>
      <div className="canvas-toolbar"><span><i /> LIVE REASONING</span><button onClick={() => onScaleChange((value) => Math.max(.55, value - .1))}>−</button><strong>{Math.round(canvasScale * 100)}%</strong><button onClick={() => onScaleChange((value) => Math.min(1.5, value + .1))}>+</button><button className="reset-canvas" onClick={onReset}>Reset</button></div>
      <div className={isolatedNode ? "reasoning-map isolated" : "reasoning-map"} style={{ transform: `translate(-50%, -50%) translate(${canvasOffset.x}px, ${canvasOffset.y}px) scale(${canvasScale})` }}>
        <svg className="graph-edges" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true"><path d="M500 96 C440 150 280 195 180 268" /><path d="M500 96 C470 160 430 202 390 268" /><path d="M500 96 C530 160 570 202 610 268" /><path d="M500 96 C560 150 720 195 820 268" /><path d="M180 268 C180 345 180 410 180 480" /><path d="M390 268 C390 345 390 410 390 480" /><path d="M610 268 C610 345 610 410 610 480" /><path d="M820 268 C820 345 820 410 820 480" /><path d="M500 96 C500 180 500 275 500 365" /></svg>
        {graphNodes.map((node, index) => <button key={node.id} onClick={() => onSelectNode(node.id)} onDoubleClick={() => onIsolateNode(node.id)} className={`graph-node ${node.color} ${selectedNode === node.id ? "selected" : ""} ${isThinking ? "thinking-node" : ""}`} style={{ left: node.x, top: node.y, animationDelay: `${index * 75}ms` }}><small>{node.type}</small><strong>{node.label}</strong><span className="node-halo" /></button>)}
        <div className="map-label map-label-top">DOUBLE CLICK A NODE TO ISOLATE</div>
      </div>
      <div className="graph-caption"><span>∞ Canvas</span><span>Drag to pan</span><span>Scroll to zoom</span></div>
    </div>
  </WindowFrame>;
}
