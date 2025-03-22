type LoadingBarProps = {
  percentage: number;
};

export const LoadingBar = ({ percentage }: LoadingBarProps) => {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 1) * 100;

  return (
    <div
      className={`w-full h-2 bg-gray-200 overflow-hidden rounded-lg relative transition-all duration-300 ease-in-out ${
        percentage < 1 ? "animate-pulse" : ""
      }`}
    >
      <div
        className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
        style={{ width: `${clampedPercentage}%` }}
      />
    </div>
  );
};
