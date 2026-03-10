export default function Background() {
  const isMobile = window.innerWidth < 768;

  return (
    <div
      className="fixed inset-0 w-full h-full z-0"
      style={{
        backgroundImage: `url('${isMobile ? '/main-bg-mo.jpg' : '/main-bg.jpg'}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}