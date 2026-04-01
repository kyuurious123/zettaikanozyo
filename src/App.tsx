import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Background from "./components/Background";
import Sidebar from "./components/Sidebar";
import FloatingModals from "./components/FloatingModals";
import MainPage from "./pages/MainPage";
import PostListPage from "./pages/PostListPage";
import PostDetailPage from "./pages/PostDetailPage";
import GuestbookPage from "./pages/GuestbookPage";
import AprilFoolsPage from "./pages/AprilFoolsPage";


function Layout() {
  const location = useLocation();
  const isMain = location.pathname === "/";

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Layer 1: Background image (always) */}
      <Background />

      {/* Layer 2: Floating modals (always visible, frozen when not main) */}
      <FloatingModals frozen={!isMain} />

      {/* Layer 3: Sidebar (always) */}
      <Sidebar />

      {/* Layer 4: Page content */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/posts/:category" element={<PostListPage />} />
        <Route path="/posts/:category/:slug" element={<PostDetailPage />} />
        <Route path="/guestbook" element={<GuestbookPage />} />
        <Route path="/aprilfoolsday" element={<AprilFoolsPage />} />

      </Routes>
    </div>
  );
}

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Layout />
//     </BrowserRouter>
//   );
// }


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/aprilfoolsday" element={<AprilFoolsPage />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}