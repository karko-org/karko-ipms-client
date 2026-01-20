interface StatusBadgeProps {
  status: "normal" | "warning" | "risk";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    normal: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-orange-100 text-orange-800 border-orange-200",
    risk: "bg-red-100 text-red-800 border-red-200",
  };

  const labels = {
    normal: "정상",
    warning: "주의",
    risk: "위험",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
