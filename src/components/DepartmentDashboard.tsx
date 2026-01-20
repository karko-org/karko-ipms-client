import { useState } from "react";
import {
  X,
  Search,
  Download,
  ChevronRight,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { ProgressBar } from "./ProgressBar";
import { ProjectDetailDashboard } from "./ProjectDetailDashboard";

interface DepartmentDashboardProps {
  department: {
    name: string;
    total: number;
  };
  onClose: () => void;
}

export function DepartmentDashboard({
  department,
  onClose,
}: DepartmentDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ownerFilter, setOwnerFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Mock KPI data
  const kpis = [
    {
      label: "Total Projects",
      value: "12",
      color: "bg-blue-100 text-blue-800",
    },
    { label: "Normal", value: "8", color: "bg-green-100 text-green-800" },
    { label: "Warning", value: "3", color: "bg-orange-100 text-orange-800" },
    { label: "Risk", value: "1", color: "bg-red-100 text-red-800" },
    {
      label: "Avg Progress",
      value: "64%",
      color: "bg-purple-100 text-purple-800",
    },
    {
      label: "Not updated 7+ days",
      value: "2",
      color: "bg-amber-100 text-amber-800",
    },
  ];

  // Mock project data
  const projects = [
    {
      id: 1,
      name: "서버 이전 프로젝트",
      status: "warning",
      progress: 45,
      dueDate: "2024.05.15",
      owner: "김민수",
      summary: "API 지연 이슈 대응 중, 네트워크 설정 조정 필요",
      lastUpdate: "2시간 전",
    },
    {
      id: 2,
      name: "품질 리포트 자동화",
      status: "normal",
      progress: 78,
      dueDate: "2024.06.20",
      owner: "이서연",
      summary: "테스트 케이스 보완 완료, 최종 검토 단계",
      lastUpdate: "1일 전",
    },
    {
      id: 3,
      name: "사내 IPMS 1차 배포",
      status: "risk",
      progress: 30,
      dueDate: "2024.04.30",
      owner: "박지훈",
      summary: "일정 지연, 리소스 추가 배정 필요",
      lastUpdate: "3시간 전",
    },
    {
      id: 4,
      name: "AI 기반 코드 리뷰 시스템",
      status: "normal",
      progress: 85,
      dueDate: "2024.05.30",
      owner: "최유진",
      summary: "베타 테스트 진행 중, 긍정적 피드백",
      lastUpdate: "5시간 전",
    },
    {
      id: 5,
      name: "모바일 앱 성능 최적화",
      status: "normal",
      progress: 62,
      dueDate: "2024.06.10",
      owner: "정현우",
      summary: "메모리 사용량 20% 개선 완료",
      lastUpdate: "1일 전",
    },
    {
      id: 6,
      name: "레거시 시스템 리팩토링",
      status: "warning",
      progress: 40,
      dueDate: "2024.07.15",
      owner: "김민수",
      summary: "기술 부채 분석 완료, 단계별 개선 중",
      lastUpdate: "8일 전",
    },
  ];

  // Mock quick insights data
  const riskProjects = projects
    .filter((p) => p.status === "risk" || p.status === "warning")
    .slice(0, 3);
  const upcomingDueDates = [...projects]
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 3);
  const recentUpdates = [...projects]
    .sort((a, b) => {
      const timeA = a.lastUpdate.includes("시간")
        ? parseInt(a.lastUpdate)
        : 100;
      const timeB = b.lastUpdate.includes("시간")
        ? parseInt(b.lastUpdate)
        : 100;
      return timeA - timeB;
    })
    .slice(0, 5);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-[1200px] max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-medium">{department.name} 대시보드</h2>
            <span className="px-2.5 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-md">
              View-only
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              Last updated: Today 10:42
            </span>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* KPI Summary Row */}
            <div className="grid grid-cols-6 gap-4 mb-6">
              {kpis.map((kpi, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  <div className="text-xs text-gray-600 mb-2">{kpi.label}</div>
                  <div
                    className={`text-2xl font-semibold ${kpi.color} inline-block px-3 py-1 rounded-lg`}
                  >
                    {kpi.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-12 gap-6">
              {/* Left side - Main Content */}
              <div className="col-span-8">
                {/* Filters / Controls Bar */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex-1 min-w-[200px]">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search project name..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
                    >
                      <option value="all">Status: All</option>
                      <option value="normal">Normal</option>
                      <option value="warning">Warning</option>
                      <option value="risk">Risk</option>
                    </select>

                    <select
                      value={ownerFilter}
                      onChange={(e) => setOwnerFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
                    >
                      <option value="all">Owner: All</option>
                      <option value="김민수">김민수</option>
                      <option value="이서연">이서연</option>
                      <option value="박지훈">박지훈</option>
                    </select>

                    <select
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
                    >
                      <option value="all">Due date: All</option>
                      <option value="week">This week</option>
                      <option value="month">This month</option>
                    </select>

                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                  </div>
                </div>

                {/* Project List Table */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="text-left px-4 py-3 text-xs font-medium text-gray-700">
                            Project Name
                          </th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-gray-700">
                            Status
                          </th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-gray-700">
                            Progress
                          </th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-gray-700">
                            Due Date
                          </th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-gray-700">
                            Owner
                          </th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-gray-700">
                            Summary
                          </th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-gray-700">
                            Last Update
                          </th>
                          <th className="w-8"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {projects.map((project) => (
                          <tr
                            key={project.id}
                            onClick={() => setSelectedProject(project)}
                            className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                              project.status === "risk" ? "bg-red-50/30" : ""
                            }`}
                          >
                            <td className="px-4 py-3 text-sm font-medium">
                              {project.name}
                            </td>
                            <td className="px-4 py-3">
                              <StatusBadge status={project.status as any} />
                            </td>
                            <td className="px-4 py-3">
                              <div className="w-32">
                                <ProgressBar percentage={project.progress} />
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {project.dueDate}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {project.owner}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                              {project.summary}
                            </td>
                            <td className="px-4 py-3 text-xs text-gray-500">
                              {project.lastUpdate}
                            </td>
                            <td className="px-4 py-3">
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between bg-gray-50">
                    <div className="text-sm text-gray-600">1-6 / 총 6개</div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">
                        Prev
                      </button>
                      <button className="px-3 py-1 bg-[#4f46e5] text-white border-[#4f46e5] rounded text-sm">
                        1
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Quick Insights Panel */}
              <div className="col-span-4 space-y-4">
                {/* Risk Projects */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <h3 className="text-sm font-medium">Risk Projects</h3>
                  </div>
                  <div className="space-y-2">
                    {riskProjects.map((project) => (
                      <div
                        key={project.id}
                        className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium truncate flex-1">
                            {project.name}
                          </span>
                          <StatusBadge status={project.status as any} />
                        </div>
                        <div className="text-xs text-gray-500">
                          {project.owner} • {project.lastUpdate}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Due Dates */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <h3 className="text-sm font-medium">Upcoming Due Dates</h3>
                  </div>
                  <div className="space-y-2">
                    {upcomingDueDates.map((project) => (
                      <div
                        key={project.id}
                        className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                      >
                        <div className="text-xs font-medium truncate mb-1">
                          {project.name}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {project.dueDate}
                          </span>
                          <span className="text-xs text-gray-500">
                            {project.progress}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Updates */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <h3 className="text-sm font-medium mb-3">Recent Updates</h3>
                  <div className="space-y-2">
                    {recentUpdates.map((project) => (
                      <div
                        key={project.id}
                        className="pb-2 border-b border-gray-100 last:border-0"
                      >
                        <div className="text-xs font-medium truncate mb-1">
                          {project.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {project.lastUpdate} • {project.owner}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Annotation Footer */}
        <div className="border-t border-gray-200 bg-blue-50 px-6 py-3">
          <p className="text-xs text-gray-600">
            💡 <span className="font-medium">Interaction notes:</span> Click any
            project row to open detailed view • Filters update table instantly •
            Risk projects highlighted with background tint
          </p>
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
