import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* 없는 경로 처리 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
