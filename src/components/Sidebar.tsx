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

  return (
    <nav
      className="fixed left-0 top-0 h-full z-30 flex flex-col justify-end px-8 pb-10"
      style={{ width: "30vw" }}
    >
      {/* Site title */}
      <div
        className="mb-10 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <span
          className="font-bold text-lg"
          style={{
            textShadow: "0 2px 16px rgba(0,0,0,0.4)",
            fontFamily: "'Georgia', serif",
            letterSpacing: "0.2em",
          }}
        >
          zettai,kanozyo
        </span>
      </div>

      {/* Menu items */}
      <ul className="flex flex-col gap-6">
        {MENU.map((item) => (
          <li key={item.label}>
            {/* Parent */}
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

            {/* Children - always expanded */}
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
  );
}