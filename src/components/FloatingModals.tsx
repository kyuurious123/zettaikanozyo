import { useState, useRef, useEffect } from "react";

interface ModalProps {
  id: number;
  color: string;
  title: string;
  content: React.ReactNode;
  initialX: number;
  initialY: number;
  frozen: boolean;
  width: number;
  height: number;
  mobileWidth: number;
  mobileHeight: number;
}

function DraggableModal({ color, title, content, initialX, initialY, frozen, width, height, mobileWidth, mobileHeight }: ModalProps) {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);
  const isMobile = window.innerWidth < 768;

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

  const w = isMobile ? mobileWidth : width;
  const h = isMobile ? mobileHeight : height;

  return (
    <div
      ref={modalRef}
      onMouseDown={onMouseDown}
      className="absolute"
      style={{
        left: pos.x,
        top: pos.y,
        width: w,
        height: h,
        zIndex: frozen ? 10 : 20,
        cursor: frozen ? "default" : "grab",
        userSelect: "none",
        pointerEvents: frozen ? "none" : "auto",
      }}
    >
      {/* Soft blob layer */}
      <div
        style={{
          position: "absolute",
          inset: isMobile ? "-5%" : "-10%",
          background: color,
          filter: isMobile ? "blur(6px)" : "blur(10px)",
          opacity: 0.75,
          borderRadius: "5%",
        }}
      />
      {/* Content layer */}
      <div
        className="absolute inset-0 flex flex-col justify-start p-2"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${color}cc 0%, transparent 75%)`,
        }}
      >
        <p className="text-sm font-bold uppercase mb-2 opacity-60 text-white">
          {title}
        </p>
        <div className="leading-relaxed text-white opacity-90">{content}</div>
      </div>
    </div>
  );
}

const isMobile = window.innerWidth < 768;

const MODALS = [
  {
    id: 1,
    color: "#FF3FA8",
    title: "Profile",
    content: (
      <>
      <div className="pb-4">
        <p className="font-bold">100의 드림상자</p>
        <a href="https://x.com/skittcn" target="_blank" className="underline">@skittcn</a>
        <p><span className="italic font-bold pr-2">ING</span><span>타카아키, 후루야 드림</span></p>
        <p><span className="italic font-bold pr-2">NG</span><span>후루야른</span></p>
      </div>
      <div>
        <img src="https://zettaikanozyo.web.app/banner.jpg" alt="" className="rounded-lg w-50 mb-2" />
        <p className="text-xs italic">https://zettaikanozyo.web.app/banner.jpg</p>
      </div>
      </>
    ),
    initialX: isMobile ? 32 : window.innerWidth - 300 - 60,
    initialY: isMobile ? window.innerHeight - 240 - 32 : 100,
    width: 300,
    height: 600,
    mobileWidth: window.innerWidth - 64,
    mobileHeight: 240,
  },
  {
    id: 2,
    color: "#3BFFEF",
    title: "links",
    content: (
      <>
      <div>
        <a href="https://mokuba.tistory.com/">
          <img src="https://r2.naru.pub/mokuba/banner03.png" alt="" className="rounded-lg" />
        </a>
        
      </div>
      </>
    ),
    initialX: isMobile ? 160 : 300,
    initialY: isMobile ? 80 : 100,
    width: 200,
    height: 240,
    mobileWidth: 220,
    mobileHeight: 140,
  },
  {
    id: 3,
    color: "#3BFF6E",
    title: "Links",
    content: (
      <>
        <p>이웃할사람</p>
      </>
    ),
    initialX: isMobile ? 80 : 960,
    initialY: isMobile ? 540 : 700,
    width: 200,
    height: 240,
    mobileWidth: 120,
    mobileHeight: 140,
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