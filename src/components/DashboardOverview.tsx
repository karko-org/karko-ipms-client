import { StatusBadge } from "./StatusBadge";
import { ProgressRing } from "./ProgressRing";

interface DashboardOverviewProps {
  onDepartmentClick: (dept: any) => void;
}

export function DashboardOverview({
  onDepartmentClick,
}: DashboardOverviewProps) {
  const departments = [
    {
      name: "기술개발부",
      total: 12,
      normal: 8,
      warning: 3,
      risk: 1,
      progress: 68,
    },
    {
      name: "마케팅부",
      total: 8,
      normal: 6,
      warning: 2,
      risk: 0,
      progress: 75,
    },
    {
      name: "생산관리부",
      total: 15,
      normal: 10,
      warning: 4,
      risk: 1,
      progress: 62,
    },
    {
      name: "품질보증부",
      total: 6,
      normal: 5,
      warning: 1,
      risk: 0,
      progress: 82,
    },
  ];

  return (
    <div>
      <h2 className="text-xl mb-4">부서별 현황</h2>

      <div className="grid grid-cols-12 gap-6">
        {departments.map((dept, idx) => (
          <div key={idx} className="col-span-3">
            <div
              onClick={() => onDepartmentClick(dept)}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 cursor-pointer hover:shadow-md hover:border-[#4f46e5] transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-medium mb-1">{dept.name}</h3>
                  <p className="text-sm text-gray-500">
                    총 {dept.total}개 프로젝트
                  </p>
                </div>
                <ProgressRing percentage={dept.progress} size={48} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">정상</span>
                  <div className="flex items-center gap-2">
                    <StatusBadge status="normal" />
                    <span className="font-medium">{dept.normal}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">주의</span>
                  <div className="flex items-center gap-2">
                    <StatusBadge status="warning" />
                    <span className="font-medium">{dept.warning}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">위험</span>
                  <div className="flex items-center gap-2">
                    <StatusBadge status="risk" />
                    <span className="font-medium">{dept.risk}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
