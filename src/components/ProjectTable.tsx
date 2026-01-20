import { useState } from "react";
import { ChevronUp, ChevronDown, Edit } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { ProgressBar } from "./ProgressBar";
import { ProjectDetailDashboard } from "./ProjectDetailDashboard";

interface ProjectTableProps {
  onUpdateClick: (project: any) => void;
}

export function ProjectTable({ onUpdateClick }: ProjectTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const projects = [
    {
      id: 1,
      name: "스마트 공장 자동화 시스템 구축",
      department: "기술개발부",
      manager: "김철수",
      status: "normal",
      progress: 75,
      startDate: "2024.01.15",
      endDate: "2024.06.30",
    },
    {
      id: 2,
      name: "신제품 브랜딩 캠페인",
      department: "마케팅부",
      manager: "이영희",
      status: "warning",
      progress: 45,
      startDate: "2024.02.01",
      endDate: "2024.05.31",
    },
    {
      id: 3,
      name: "생산 라인 효율화 프로젝트",
      department: "생산관리부",
      manager: "박민수",
      status: "risk",
      progress: 30,
      startDate: "2024.01.10",
      endDate: "2024.04.30",
    },
    {
      id: 4,
      name: "ISO 9001 인증 갱신",
      department: "품질보증부",
      manager: "최지은",
      status: "normal",
      progress: 90,
      startDate: "2024.03.01",
      endDate: "2024.06.15",
    },
    {
      id: 5,
      name: "AI 기반 품질 검사 시스템",
      department: "기술개발부",
      manager: "정대호",
      status: "normal",
      progress: 62,
      startDate: "2024.02.15",
      endDate: "2024.08.31",
    },
    {
      id: 6,
      name: "해외 시장 진출 전략",
      department: "마케팅부",
      manager: "강수진",
      status: "warning",
      progress: 55,
      startDate: "2024.01.20",
      endDate: "2024.07.31",
    },
    {
      id: 7,
      name: "원자재 재고 최적화",
      department: "생산관리부",
      manager: "윤성호",
      status: "normal",
      progress: 68,
      startDate: "2024.02.10",
      endDate: "2024.05.20",
    },
    {
      id: 8,
      name: "공급망 품질 관리 강화",
      department: "품질보증부",
      manager: "한미래",
      status: "normal",
      progress: 78,
      startDate: "2024.01.25",
      endDate: "2024.06.10",
    },
  ];

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const itemsPerPage = 5;
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProjects = projects.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const SortIcon = ({ column }: { column: string }) => {
    if (sortColumn !== column) return <div className="w-4 h-4" />;
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl">전체 프로젝트 목록</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-1 hover:text-gray-900"
                >
                  프로젝트명
                  <SortIcon column="name" />
                </button>
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                <button
                  onClick={() => handleSort("department")}
                  className="flex items-center gap-1 hover:text-gray-900"
                >
                  부서
                  <SortIcon column="department" />
                </button>
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                담당자
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                <button
                  onClick={() => handleSort("status")}
                  className="flex items-center gap-1 hover:text-gray-900"
                >
                  상태
                  <SortIcon column="status" />
                </button>
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                진행률
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                시작일
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                종료일
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayedProjects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td
                  onClick={() => setSelectedProject(project)}
                  className="px-6 py-4 text-sm cursor-pointer hover:text-[#4f46e5]"
                >
                  {project.name}
                </td>
                <td className="px-6 py-4">{project.department}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {project.manager}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={project.status as any} />
                </td>
                <td className="px-6 py-4">
                  <ProgressBar percentage={project.progress} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {project.startDate}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {project.endDate}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdateClick(project);
                    }}
                    className="text-[#4f46e5] hover:text-[#4338ca] flex items-center gap-1"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="text-sm">수정</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {startIndex + 1}-
          {Math.min(startIndex + itemsPerPage, projects.length)} / 총{" "}
          {projects.length}개
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            이전
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded text-sm ${
                currentPage === page
                  ? "bg-[#4f46e5] text-white border-[#4f46e5]"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            다음
          </button>
        </div>
      </div>

      {selectedProject && (
        <ProjectDetailDashboard
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
