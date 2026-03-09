import { useState } from "react";

interface PasswordModalProps {
  onSuccess: () => void;
  onClose: () => void;
  correctPassword: string;
}

export default function PasswordModal({ onSuccess, onClose, correctPassword }: PasswordModalProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (input === correctPassword) {
      onSuccess();
    } else {
      setError(true);
      setInput("");
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0" style={{ backdropFilter: "blur(8px)" }} />

      {/* Modal wrapper */}
      <div
        className="relative"
        style={{ width: 300, height: 220 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Blob blur layer */}
        <div
          style={{
            position: "absolute",
            inset: "-10%",
            background: "#FF3FA8",
            filter: "blur(10px)",
            opacity: 0.75,
            borderRadius: "5%",
          }}
        />

        {/* Inner content */}
        <div
          className="absolute inset-0 flex flex-col justify-center gap-4 px-8 py-8"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(255,63,168,0.45) 0%, transparent 75%)",
            borderRadius: "12px",
          }}
        >
          <p
            className="text-white text-sm tracking-widest uppercase text-center"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}
          >
            비밀번호 확인
          </p>

          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="password"
            className="bg-transparent border-b text-white text-sm text-center outline-none placeholder-white/40 py-2 tracking-widest"
            style={{
              borderColor: error ? "white" : "rgba(255,255,255,0.4)",
              transition: "border-color 0.2s",
            }}
            autoFocus
          />

          {error && (
            <p className="text-center text-xs tracking-wider text-white/70">
              비밀번호가 틀렸습니다
            </p>
          )}

          <button
            onClick={handleSubmit}
            className="text-white text-xs tracking-widest uppercase py-2 transition-opacity hover:opacity-60"
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}