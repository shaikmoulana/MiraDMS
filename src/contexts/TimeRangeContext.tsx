import { createContext, useContext, useState, ReactNode } from 'react';

export type TimeRangeOption = '5m' | '15m' | '30m' | '1h' | '6h' | '12h' | '24h' | '7d' | '30d' | 'custom';

interface TimeRange {
  option: TimeRangeOption;
  label: string;
  customStart?: Date;
  customEnd?: Date;
}

interface TimeRangeContextType {
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
}

const TimeRangeContext = createContext<TimeRangeContextType | undefined>(undefined);

export function TimeRangeProvider({ children }: { children: ReactNode }) {
  const [timeRange, setTimeRange] = useState<TimeRange>({
    option: '24h',
    label: 'Last 24 hours',
  });

  return (
    <TimeRangeContext.Provider value={{ timeRange, setTimeRange }}>
      {children}
    </TimeRangeContext.Provider>
  );
}

export function useTimeRange() {
  const context = useContext(TimeRangeContext);
  if (context === undefined) {
    throw new Error('useTimeRange must be used within a TimeRangeProvider');
  }
  return context;
}
