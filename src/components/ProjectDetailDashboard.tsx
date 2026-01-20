import { useState } from "react";
import {
  X,
  Calendar,
  User,
  Building2,
  Flag,
  TrendingUp,
  Clock,
  FileText,
  MessageSquare,
  Upload,
  Download,
  Edit,
  ChevronUp,
  ChevronDown,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { ProgressBar } from "./ProgressBar";
import { ProgressRing } from "./ProgressRing";

interface ProjectDetailDashboardProps {
  project: any;
  onClose: () => void;
}

export function ProjectDetailDashboard({
  project,
  onClose,
}: ProjectDetailDashboardProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Mock data for project details
  const projectDetail = {
    title: "서버 이전 프로젝트",
    status: "warning",
    lastUpdated: "Today 09:18",
    department: "개발팀",
    owner: "박지훈",
    dueDate: "2026-02-15",
    priority: "P1",
    progress: 45,
    notUpdated: 3,
    latestUpdate: {
      summary:
        "API 배포 이후 일부 사용자 접근 권한 오류 확인. 원인 분석 진행 중. 데이터베이스 마이그레이션은 성공적으로 완료되었으나, 권한 정책 설정에서 예상치 못한 문제가 발견되었습니다.",
      risks: ["권한 정책 누락", "서버 부하 증가", "일부 API 응답 지연"],
      nextActions: [
        "권한 정책 수정 배포",
        "로그 모니터링 강화",
        "부하 테스트 재실행",
      ],
      author: "김민수",
      time: "1 hour ago",
    },
    activities: [
      {
        type: "status",
        time: "1 hour ago",
        actor: "김민수",
        description: "Status changed to Warning",
        icon: AlertCircle,
        color: "text-orange-600",
      },
      {
        type: "progress",
        time: "3 hours ago",
        actor: "박지훈",
        description: "Progress updated: 40% → 45%",
        icon: TrendingUp,
        color: "text-blue-600",
      },
      {
        type: "comment",
        time: "5 hours ago",
        actor: "이서연",
        description: "Added comment on deployment strategy",
        icon: MessageSquare,
        color: "text-purple-600",
      },
      {
        type: "file",
        time: "1 day ago",
        actor: "최정민",
        description: "Uploaded migration-logs.zip",
        icon: Upload,
        color: "text-green-600",
      },
      {
        type: "status",
        time: "2 days ago",
        actor: "박지훈",
        description: "Status changed to Normal",
        icon: CheckCircle,
        color: "text-green-600",
      },
    ],
    participants: [
      { name: "박지훈", role: "Owner", avatar: "PJ" },
      { name: "김민수", role: "Support", avatar: "KM" },
      { name: "이서연", role: "Support", avatar: "LS" },
      { name: "최정민", role: "Reviewer", avatar: "CJ" },
    ],
    files: [
      {
        name: "migration-plan.pdf",
        size: "2.4 MB",
        uploadedBy: "박지훈",
        time: "2 days ago",
      },
      {
        name: "api-spec-v2.docx",
        size: "1.1 MB",
        uploadedBy: "김민수",
        time: "3 days ago",
      },
      {
        name: "meeting-notes-01-15.txt",
        size: "45 KB",
        uploadedBy: "이서연",
        time: "5 days ago",
      },
    ],
    history: [
      {
        date: "2026-01-20 14:30",
        status: "warning",
        progress: 45,
        summary: "API 배포 이후 권한 오류 확인, 원인 분석 중",
        author: "김민수",
        time: "1 hour ago",
      },
      {
        date: "2026-01-20 11:15",
        status: "normal",
        progress: 40,
        summary: "DB 마이그레이션 완료, 백업 검증 성공",
        author: "박지훈",
        time: "4 hours ago",
      },
      {
        date: "2026-01-19 16:45",
        status: "normal",
        progress: 35,
        summary: "스테이징 환경 테스트 완료, 프로덕션 배포 준비",
        author: "이서연",
        time: "1 day ago",
      },
      {
        date: "2026-01-18 10:20",
        status: "warning",
        progress: 30,
        summary: "네트워크 설정 이슈로 일정 지연, 조정 완료",
        author: "박지훈",
        time: "2 days ago",
      },
      {
        date: "2026-01-17 14:00",
        status: "normal",
        progress: 25,
        summary: "데이터 백업 및 마이그레이션 스크립트 작성 완료",
        author: "김민수",
        time: "3 days ago",
      },
    ],
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  const SortIcon = ({ column }: { column: string }) => {
    if (sortColumn !== column) return <div className="w-4 h-4" />;
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-[1280px] my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="text-2xl font-medium">{projectDetail.title}</h2>
            <StatusBadge status={projectDetail.status as any} />
            <span className="px-2.5 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-md">
              View-only
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              Last updated: {projectDetail.lastUpdated}
            </span>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-[#4f46e5] text-white text-sm rounded-lg hover:bg-[#4338ca] transition-colors">
                Open Status Update
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                <Edit className="w-4 h-4 inline mr-1" />
                Edit Project
              </button>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Project Summary Strip */}
        <div className="p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Department:</span>
              <span className="text-sm font-medium">
                {projectDetail.department}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Owner:</span>
              <span className="text-sm font-medium">{projectDetail.owner}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Due Date:</span>
              <span className="text-sm font-medium">
                {projectDetail.dueDate}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Flag className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Priority:</span>
              <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded-md">
                {projectDetail.priority}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Progress:</span>
              <div className="w-32">
                <ProgressBar percentage={projectDetail.progress} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Not updated:</span>
              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-medium rounded-md">
                {projectDetail.notUpdated} days
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="col-span-8 space-y-6">
              {/* Latest Update Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-medium text-gray-900">
                    Latest Update
                  </h3>
                </div>

                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  {projectDetail.latestUpdate.summary}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      Risks / Issues
                    </h4>
                    <ul className="space-y-1">
                      {projectDetail.latestUpdate.risks.map((risk, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-600 flex items-start gap-2"
                        >
                          <span className="text-red-500 mt-1">•</span>
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Next Actions
                    </h4>
                    <ul className="space-y-1">
                      {projectDetail.latestUpdate.nextActions.map(
                        (action, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-gray-600 flex items-start gap-2"
                          >
                            <span className="text-green-500 mt-1">•</span>
                            <span>{action}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-blue-200">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                    {projectDetail.latestUpdate.author.slice(0, 2)}
                  </div>
                  <span className="text-sm text-gray-700">
                    {projectDetail.latestUpdate.author} •{" "}
                    {projectDetail.latestUpdate.time}
                  </span>
                </div>
              </div>

              {/* Activity Timeline Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-4">Activity</h3>

                <div className="space-y-4">
                  {projectDetail.activities.map((activity, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.color} bg-opacity-10`}
                      >
                        <activity.icon
                          className={`w-4 h-4 ${activity.color}`}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.actor} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-4 space-y-6">
              {/* Project Snapshot Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-4">Project Snapshot</h3>

                <div className="flex justify-center mb-6">
                  <ProgressRing
                    percentage={projectDetail.progress}
                    size={120}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Status</span>
                    <StatusBadge status={projectDetail.status as any} />
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium">
                      {projectDetail.progress}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Due Date</span>
                    <span className="text-sm font-medium">
                      {projectDetail.dueDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Department</span>
                    <span className="text-sm font-medium">
                      {projectDetail.department}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600">Owner</span>
                    <span className="text-sm font-medium">
                      {projectDetail.owner}
                    </span>
                  </div>
                </div>
              </div>

              {/* Participants Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-4">Participants</h3>

                <div className="space-y-3">
                  {projectDetail.participants.map((participant, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {participant.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {participant.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {participant.role}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-0.5 text-xs rounded-md ${
                          participant.role === "Owner"
                            ? "bg-blue-100 text-blue-800"
                            : participant.role === "Support"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {participant.role}
                      </span>
                    </div>
                  ))}
                  <button className="w-full mt-2 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                    + Add member
                  </button>
                </div>
              </div>

              {/* Files Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-4">Files & Documents</h3>

                <div className="space-y-3">
                  {projectDetail.files.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {file.size} • {file.uploadedBy}
                        </p>
                        <p className="text-xs text-gray-400">{file.time}</p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Update History Table */}
          <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium">Update History</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-700">
                      <button
                        onClick={() => handleSort("date")}
                        className="flex items-center gap-1 hover:text-gray-900"
                      >
                        Date
                        <SortIcon column="date" />
                      </button>
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-700">
                      <button
                        onClick={() => handleSort("status")}
                        className="flex items-center gap-1 hover:text-gray-900"
                      >
                        Status
                        <SortIcon column="status" />
                      </button>
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-700">
                      <button
                        onClick={() => handleSort("progress")}
                        className="flex items-center gap-1 hover:text-gray-900"
                      >
                        Progress
                        <SortIcon column="progress" />
                      </button>
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-700">
                      Update Summary
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-700">
                      Author
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-700">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {projectDetail.history.map((record, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {record.date}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={record.status as any} />
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        {record.progress}%
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-md">
                        {record.summary}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {record.author}
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500">
                        {record.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
              <div className="text-sm text-gray-600">1-5 / 총 5개</div>
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

        {/* Annotation Footer */}
        <div className="border-t border-gray-200 bg-blue-50 px-6 py-3">
          <p className="text-xs text-gray-600">
            💡 <span className="font-medium">Interaction notes:</span> Opened
            from Department Dashboard → project row click • Close X returns to
            Department Dashboard • Status Update action opens Status Update Form
            overlay • Latest Update card shows the most recent entry • Admin
            controls shown only for Admin/Owner roles • Click history row → open
            Update Detail drawer
          </p>
        </div>
      </div>
    </div>
  );
}
