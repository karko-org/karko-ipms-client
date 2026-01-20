import { useState } from "react";
import { Header } from "./components/Header";
import { DashboardOverview } from "./components/DashboardOverview";
import { ProjectTable } from "./components/ProjectTable";
import { UpdateModal } from "./components/UpdateModal";
import { DepartmentDashboard } from "./components/DepartmentDashboard";
import Login from "./Login";

export default function App() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(false);

  if (showLogin) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-[1440px] mx-auto px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">운영 계획 관리 대시보드</h1>
          <p className="text-gray-600">
            부서별 프로젝트 현황 및 진행 상태를 모니터링합니다
          </p>
        </div>

        <DashboardOverview onDepartmentClick={setSelectedDepartment} />

        <div className="mt-8">
          <ProjectTable onUpdateClick={setSelectedProject} />
        </div>
      </main>

      {selectedProject && (
        <UpdateModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {selectedDepartment && (
        <DepartmentDashboard
          department={selectedDepartment}
          onClose={() => setSelectedDepartment(null)}
        />
      )}
    </div>
  );
}
