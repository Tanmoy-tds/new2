type Props = {
  score: number; // 0-100
  label?: string;
  size?: "sm" | "md" | "lg";
};

function getColor(score: number) {
  if (score >= 70) return "bg-green-500";
  if (score >= 40) return "bg-amber-500";
  return "bg-red-500";
}

function getHeight(size: Props["size"]) {
  switch (size) {
    case "sm":
      return "h-2";
    case "lg":
      return "h-4";
    default:
      return "h-3";
  }
}

export default function SafetyScoreMeter({ score, label = "Safety score", size = "md" }: Props) {
  const safeScore = Math.max(0, Math.min(100, Math.round(score)));
  const trackH = getHeight(size);
  const barColor = getColor(safeScore);

  return (
    <div className="w-full">
      <div className="mb-1 flex items-end justify-between">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-xs text-gray-500">{safeScore}/100</span>
      </div>
      <div className={`w-full ${trackH} rounded-full bg-gray-200 overflow-hidden`}>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={safeScore}
          style={{ width: `${safeScore}%` }}
          className={`h-full ${barColor} rounded-full transition-all duration-700 ease-out shadow-sm`}
        />
      </div>
    </div>
  );
}
