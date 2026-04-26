/* 
  API Integration Stubs
  Replace these with your actual fetch/axios calls to your backend.
*/
import axios from 'axios';
import config from '../config';

const API_BASE_URL = config.BASE_URL;

const MOCK_PROJECTS = [
  {
    id: "codeprep",
    title: "CodePrep",
    tagline: "Interview Engineering Platform",
    one_line: "MERN-stack platform bridging the gap between university CS and industry expectations.",
    introduction: "CodePrep is an end-to-end learning platform...",
    why_i_built_it: "I noticed a concerning disconnect...",
    problem: "University curriculums often focus on pure algorithms...",
    focus_area: "EdTech, Scalability, Full-stack System Architecture",
    challenges: ["Integrating live compilation with OneCompiler without exposing API keys", "Designing a scalable phase-gated execution pipeline"],
    tech: ["React", "Node.js", "Express", "MongoDB", "OneCompiler API"],
    architecture: "Phase-gated learning engine with live code execution pipeline.",
    metrics: { phase: "Phase 3 / 4", runtime: "Live execution", focus: "SL Engineers" },
    category: "EdTech · DevTools",
    status: "In Development",
    github: "#",
    live: "#",
    screenshots: [
      "https://placehold.co/800x450/111111/f59e0b?text=CodePrep:+Dashboard",
      "https://placehold.co/800x450/111111/f59e0b?text=CodePrep:+Live+Execution",
      "https://placehold.co/800x450/111111/f59e0b?text=CodePrep:+Metrics"
    ]
  },
  {
    id: "ecotrace",
    title: "EcoTrace",
    tagline: "Android Eco-Commerce Platform",
    one_line: "Eco-friendly product marketplace on Android with Firestore-powered filtering and PayHere payments.",
    introduction: "EcoTrace is a natively built Android ecosystem...",
    why_i_built_it: "Sustainable shopping in local areas often requires heavily researching brands...",
    problem: "Environmentally conscious consumers lack a centralized platform...",
    focus_area: "Mobile Development, GreenTech, Composite Querying",
    challenges: ["Creating seamless mapping to PayHere SDK on native Android", "Indexing highly nested subcategories securely"],
    tech: ["Java", "Android", "Firebase Firestore", "PayHere SDK"],
    architecture: "RBAC-controlled admin layer with composite Firestore indexing.",
    metrics: { platform: "Android", db: "Firestore", payment: "PayHere" },
    category: "GreenTech · Mobile",
    status: "MVP Complete",
    github: "#",
    live: "#",
    screenshots: [
      "https://placehold.co/800x450/111111/f59e0b?text=EcoTrace:+Mobile+View",
      "https://placehold.co/800x450/111111/f59e0b?text=EcoTrace:+Product+Page"
    ]
  },
  {
    id: "blessedblooms",
    title: "Blessed Blooms",
    tagline: "Enterprise Java E-Commerce",
    one_line: "Full-featured enterprise e-commerce system built with Spring Boot and layered architecture.",
    introduction: "An exhaustive enterprise scale E-Commerce engine...",
    why_i_built_it: "I wanted to prove absolute competence within the massive scope of the Java Enterprise...",
    problem: "Boutique agricultural systems struggle tracking expansive inventory...",
    focus_area: "Enterprise Architecture, Service-Repository Pattern, Logistics",
    challenges: ["Securing strict Role-Based Access controls via Spring Security", "Handling high concurrency locking"],
    tech: ["Java", "Spring Boot", "MySQL", "Thymeleaf"],
    architecture: "Service-repository pattern with role-based access.",
    metrics: { stack: "Spring Boot", pattern: "MVC", scope: "Enterprise" },
    category: "E-Commerce · Java",
    status: "Complete",
    github: "#",
    live: "#",
    screenshots: [
      "https://placehold.co/800x450/111111/f59e0b?text=Blessed+Blooms:+Storefront",
      "https://placehold.co/800x450/111111/f59e0b?text=Blessed+Blooms:+Inventory+Dashboard"
    ]
  }
];

export const getProjects = async () => {
  try {
    const response = await axios.get(`https://chamubuilds-backend.onrender.com/api/projects`);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects from backend API:', error);
    throw error;
  }
};

export const getProjectById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project ${id} from backend API:`, error);
    throw error;
  }
};

export const addProject = async (newProject) => {
  console.log("Sending structured project to backend via Axios:", newProject);
  try {
    const response = await axios.post(`${API_BASE_URL}/api/projects`, newProject);
    return response.data;
  } catch (error) {
    console.error("Error posting project to backend API:", error);
    throw error;
  }
};

export const saveResume = async (base64File) => {
  console.log("Sending resume file to backend...");
  // TODO: Replace with:
  // return fetch('YOUR_BACKEND/api/resume', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ file: base64File })
  // }).then(res => res.json());
  return { success: true };
};

export const getResume = async () => {
  // TODO: Replace with: return fetch('YOUR_BACKEND/api/resume').then(res => res.json());
  return null;
};
