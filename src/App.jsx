import { HashRouter as Router, Routes, Route } from "react-router-dom"; // HashRouter import කරන්න
import Home from "./pages/index";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Admin from "./pages/Admin";
import Message from "./pages/Message";

export default function App() {
  return (
    <Router>  
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