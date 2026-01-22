import { useState } from 'react';
import { Clock, Calendar } from 'lucide-react';
import { useTimeRange, TimeRangeOption } from '../contexts/TimeRangeContext';
import CustomRangeModal from './CustomRangeModal';

export default function TimeRangeSelector() {
  const { timeRange, setTimeRange } = useTimeRange();
  const [showCustomModal, setShowCustomModal] = useState(false);

  const timeRangeOptions: { value: TimeRangeOption; label: string }[] = [
    { value: '5m', label: 'Last 5 minutes' },
    { value: '15m', label: 'Last 15 minutes' },
    { value: '30m', label: 'Last 30 minutes' },
    { value: '1h', label: 'Last 1 hour' },
    { value: '6h', label: 'Last 6 hours' },
    { value: '12h', label: 'Last 12 hours' },
    { value: '24h', label: 'Last 24 hours' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: 'custom', label: 'Custom Range' },
  ];

  const handleChange = (value: string) => {
    if (value === 'custom') {
      setShowCustomModal(true);
    } else {
      const option = timeRangeOptions.find(opt => opt.value === value);
      if (option) {
        setTimeRange({
          option: option.value,
          label: option.label,
        });
      }
    }
  };

  const handleCustomRangeApply = (start: Date, end: Date) => {
    setTimeRange({
      option: 'custom',
      label: `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`,
      customStart: start,
      customEnd: end,
    });
    setShowCustomModal(false);
  };

  return (
    <>
      <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 min-w-[200px]">
        <Clock className="w-4 h-4 text-gray-600" />
        <select
          value={timeRange.option}
          onChange={(e) => handleChange(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 cursor-pointer"
        >
          {timeRangeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.value === 'custom' && timeRange.option === 'custom' && timeRange.customStart
                ? timeRange.label
                : option.label}
            </option>
          ))}
        </select>
      </div>

      {showCustomModal && (
        <CustomRangeModal
          onClose={() => setShowCustomModal(false)}
          onApply={handleCustomRangeApply}
        />
      )}
    </>
  );
}
