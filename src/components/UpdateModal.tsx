import { useState } from "react";
import { X } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

interface UpdateModalProps {
  project: any;
  onClose: () => void;
}

export function UpdateModal({ project, onClose }: UpdateModalProps) {
  const [progress, setProgress] = useState(project.progress);
  const [status, setStatus] = useState(project.status);
  const [notes, setNotes] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 z-50 p-4">
      <div className="mx-auto w-full max-w-2xl h-[calc(100vh-2rem)] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col">
        {/* Header (항상 보이게) */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 shrink-0">
          <h2 className="text-xl font-medium">프로젝트 진행 상황 업데이트</h2>
          <button
            onClick={onClose}
            className="shrink-0 rounded-md p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body (여기만 스크롤) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              프로젝트명
            </label>
            <div className="text-gray-900">{project.name}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                부서
              </label>
              <div className="text-gray-600">{project.department}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                담당자
              </label>
              <div className="text-gray-600">{project.manager}</div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              현재 상태
            </label>
            <div className="flex gap-3">
              {(["normal", "warning", "risk"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    status === s
                      ? "border-[#4f46e5] bg-[#4f46e5]/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <StatusBadge status={s} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              진행률: {progress}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4f46e5]"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              진행 상황 메모
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
              rows={4}
              placeholder="프로젝트 진행 상황, 이슈사항, 다음 단계 등을 입력하세요..."
            />
          </div>
        </div>

        {/* Footer (항상 보이게) */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#4f46e5] text-white rounded-lg hover:bg-[#4338ca] transition-colors"
          >
            업데이트 저장
          </button>
        </div>
      </div>
    </div>
  );
}
