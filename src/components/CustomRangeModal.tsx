import { useState } from 'react';
import { X, Calendar } from 'lucide-react';

interface CustomRangeModalProps {
  onClose: () => void;
  onApply: (start: Date, end: Date) => void;
}

export default function CustomRangeModal({ onClose, onApply }: CustomRangeModalProps) {
  const now = new Date();
  const defaultStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const [startDate, setStartDate] = useState(defaultStart.toISOString().slice(0, 16));
  const [endDate, setEndDate] = useState(now.toISOString().slice(0, 16));

  const handleApply = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start >= end) {
      alert('Start date must be before end date');
      return;
    }
    
    onApply(start, end);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h3 className="text-gray-900">Select Custom Time Range</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Start Date & Time</label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">End Date & Time</label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
