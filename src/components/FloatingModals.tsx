import { useState, useRef, useEffect } from "react";

interface ModalProps {
  id: number;
  color: string;
  title: string;
  content: string;
  initialX: number;
  initialY: number;
  frozen: boolean;
}

function DraggableModal({ color, title, content, initialX, initialY, frozen }: ModalProps) {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current || frozen) return;
      setPos({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    };
    const onMouseUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [frozen]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (frozen) return;
    dragging.current = true;
    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
  };

  return (
    <div
      ref={modalRef}
      onMouseDown={onMouseDown}
      className="absolute"
      style={{
        left: pos.x,
        top: pos.y,
        width: 200,
        height: 240,
        zIndex: frozen ? 10 : 20,
        cursor: frozen ? "default" : "grab",
        userSelect: "none",
        pointerEvents: frozen ? "none" : "auto",
      }}
    >
      
      {/* Soft blob layer - 경계 없이 번지는 효과 */}
        <div
        style={{
            position: "absolute",
            inset: "-10%",
            background: color,
            filter: "blur(10px)",
            opacity: 0.75,
            borderRadius: "5%",
        }}
        />
        {/* Content layer */}
        <div
        className="absolute inset-0 flex flex-col justify-start p-5"
        style={{
            background: `radial-gradient(ellipse at 50% 50%, ${color}cc 0%, transparent %)`,
        }}
        >
        <p className="text-sm font-bold uppercase mb-2 opacity-60 text-white">
          {title}
        </p>
        <p className="leading-relaxed text-white opacity-90">{content}</p>
      </div>
    </div>
  );
}

const MODALS = [
  {
    id: 1,
    color: "#FF3FA8",
    title: "Profile",
    content: "100의 드림상자 아직 공사중이에요",
    initialX: 900,
    initialY: 320,
  },
  {
    id: 2,
    color: "#3BFFEF",
    title: "About",
    content: "ES/DS 夢",
    initialX: 1200,
    initialY: 100,
  },
  {
    id: 3,
    color: "#3BFF6E",
    title: "Links",
    content: "이웃할사람",
    initialX: 960,
    initialY: 700,
  },
];

interface FloatingModalsProps {
  frozen: boolean;
}

export default function FloatingModals({ frozen }: FloatingModalsProps) {
  return (
    <>
      {MODALS.map((m) => (
        <DraggableModal key={m.id} {...m} frozen={frozen} />
      ))}
    </>
  );
}