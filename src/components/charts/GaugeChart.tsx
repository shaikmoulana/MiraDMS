interface GaugeChartProps {
  value: number;
  size?: number;
  min?: number;
  max?: number;
}

export default function GaugeChart({ value, size = 100, min = 0, max = 100 }: GaugeChartProps) {
  const percentage = ((value - min) / (max - min)) * 100;
  const angle = (percentage / 100) * 180 - 90;
  
  const getColor = (percent: number) => {
    if (percent >= 80) return '#10b981';
    if (percent >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const color = getColor(percentage);
  const radius = size / 2 - 10;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <svg width={size} height={size * 0.7} viewBox={`0 0 ${size} ${size * 0.7}`}>
      {/* Background arc */}
      <path
        d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="8"
        strokeLinecap="round"
      />
      
      {/* Value arc */}
      <path
        d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={`${(percentage / 100) * Math.PI * radius} ${Math.PI * radius}`}
      />
      
      {/* Needle */}
      <line
        x1={cx}
        y1={cy}
        x2={cx + Math.cos((angle * Math.PI) / 180) * (radius - 5)}
        y2={cy + Math.sin((angle * Math.PI) / 180) * (radius - 5)}
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Center dot */}
      <circle cx={cx} cy={cy} r="4" fill={color} />
      
      {/* Value text */}
      <text
        x={cx}
        y={cy + 20}
        textAnchor="middle"
        fontSize="16"
        fontWeight="bold"
        fill="#374151"
      >
        {value.toFixed(0)}%
      </text>
    </svg>
  );
}
