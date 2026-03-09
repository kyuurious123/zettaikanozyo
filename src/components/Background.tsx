export default function Background() {
  return (
    <div
      className="fixed inset-0 w-full h-full z-0"
      style={{
        backgroundImage: `url('/main-bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}