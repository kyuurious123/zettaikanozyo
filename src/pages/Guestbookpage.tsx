export default function GuestbookPage() {
  return (
    <>
      {/* Blur overlay */}
      <div
        className="fixed inset-0 z-20"
        style={{ backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.08)" }}
      />

      {/* Content area */}
      <main
        className="fixed top-0 right-0 h-full z-30 overflow-y-auto"
        style={{ width: "70vw", left: "40vw" }}
      >
        <div className="px-12 py-16 max-w-3xl">
          <h1
            className="text-3xl font-bold tracking-widest uppercase mb-10"
          >
            방명록
          </h1>
          <p className="text-sm tracking-wider">Now coming . . .</p>
        </div>
      </main>
    </>
  );
}