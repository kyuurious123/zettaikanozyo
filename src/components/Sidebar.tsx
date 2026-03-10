import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const MENU = [
  {
    label: "글",
    children: [
      { label: "↳ 이츠키 슈", path: "/posts/category1" },
      { label: "↳ 모로후시 타카아키", path: "/posts/category2" },
      { label: "↳ 후루야 레이", path: "/posts/category3" },
    ],
  },
  {
    label: "방명록",
    path: "/guestbook",
    children: [],
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <>
      {/* ───── MOBILE HEADER ───── */}
      <header
        className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(0,0,0,0.0)" }}
      >
        {/* Site title */}
        <span
          className="font-bold text-base cursor-pointer"
          onClick={() => handleNavigate("/")}
          style={{ fontFamily: "'Georgia', serif", letterSpacing: "0.15em" }}
        >
          zettai,kanozyo
        </span>

        {/* Hamburger button */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="flex flex-col justify-center gap-1.5 w-8 h-8"
          style={{ background: "none", border: "none", cursor: "pointer" }}
          aria-label="메뉴"
        >
          <span
            className="block h-px w-6 transition-all duration-300"
            style={{
              background: "currentColor",
              transform: mobileOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
            }}
          />
          <span
            className="block h-px w-6 transition-all duration-300"
            style={{
              background: "currentColor",
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            className="block h-px w-6 transition-all duration-300"
            style={{
              background: "currentColor",
              transform: mobileOpen ? "rotate(-45deg) translate(3px, -3px)" : "none",
            }}
          />
        </button>
      </header>

      {/* ───── MOBILE DROPDOWN MENU ───── */}
      <div
        className="md:hidden fixed top-14 left-0 right-0 z-39 overflow-hidden transition-all duration-300"
        style={{
          maxHeight: mobileOpen ? "400px" : "0px",
          backdropFilter: mobileOpen ? "blur(12px)" : "blur(12px)",
          background: mobileOpen ? "transparent" : "transparent",
        }}
      >
        <ul className="flex flex-col px-6 py-4 gap-4">
          {MENU.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => item.path && handleNavigate(item.path)}
                className="font-semibold text-xl uppercase"
                style={{ background: "none", border: "none", cursor: item.path ? "pointer" : "default" }}
              >
                {item.label}
              </button>

              {item.children.length > 0 && (
                <ul className="flex flex-col gap-1 pl-3 border-l border-white/30 mt-1">
                  {item.children.map((child) => (
                    <li key={child.path}>
                      <button
                        onClick={() => handleNavigate(child.path)}
                        className="text-lg py-1"
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontWeight: location.pathname === child.path ? 700 : 400,
                        }}
                      >
                        {child.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* ───── DESKTOP SIDEBAR ───── */}
      <nav
        className="hidden md:flex fixed left-0 top-0 h-full z-30 flex-col justify-end px-8 pb-10"
        style={{ width: "30vw" }}
      >
        <div
          className="mb-10 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span
            className="font-bold text-lg"
            style={{
              fontFamily: "'Georgia', serif",
              letterSpacing: "0.2em",
            }}
          >
            zettai,kanozyo
          </span>
        </div>

        <ul className="flex flex-col gap-6">
          {MENU.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => item.path && navigate(item.path)}
                className="!font-semibold !text-2xl uppercase mb-2 !p-0"
                style={{
                  background: "none",
                  border: "none",
                  cursor: item.path ? "pointer" : "default",
                }}
              >
                {item.label}
              </button>

              {item.children.length > 0 && (
                <ul className="flex flex-col gap-1 pl-3 border-l border-white/30">
                  {item.children.map((child) => {
                    const isActive = location.pathname === child.path;
                    return (
                      <li key={child.path}>
                        <button
                          onClick={() => navigate(child.path)}
                          className="text-2xl pb-2"
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: isActive ? 700 : 400,
                          }}
                        >
                          {child.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}