import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Resume from "./pages/resume";
import Interview from "./pages/interview";
import History from "./pages/history";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/resume"
  element={
    <ProtectedRoute>
      <Resume />
    </ProtectedRoute>
  }
/>

<Route
  path="/interview"
  element={
    <ProtectedRoute>
      <Interview />
    </ProtectedRoute>
  }
/>

<Route
  path="/history"
  element={
    <ProtectedRoute>
      <History />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;