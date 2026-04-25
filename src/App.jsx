import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/index"; // ඔයාගේ ලොකු ChamuBuilds code එක තියෙන්නේ මෙතන
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Admin from "./pages/Admin";
import Message from "./pages/Message";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/message" element={<Message />} />
      </Routes>
    </Router>
  );
}