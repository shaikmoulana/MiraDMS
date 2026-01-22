import { TimeRangeOption } from '../contexts/TimeRangeContext';

export function getDataPointsForTimeRange(timeRange: TimeRangeOption): number {
  switch (timeRange) {
    case '5m':
      return 30; // 10 second intervals
    case '15m':
      return 30; // 30 second intervals
    case '30m':
      return 30; // 1 minute intervals
    case '1h':
      return 60; // 1 minute intervals
    case '6h':
      return 36; // 10 minute intervals
    case '12h':
      return 48; // 15 minute intervals
    case '24h':
      return 24; // 1 hour intervals
    case '7d':
      return 7; // 1 day intervals
    case '30d':
      return 30; // 1 day intervals
    default:
      return 24;
  }
}

export function getTimeLabels(timeRange: TimeRangeOption, dataPoints: number): string[] {
  const now = Date.now();
  const labels: string[] = [];

  switch (timeRange) {
    case '5m':
      for (let i = dataPoints - 1; i >= 0; i--) {
        const time = new Date(now - i * 10 * 1000);
        labels.push(time.toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }));
      }
      break;
    case '15m':
      for (let i = dataPoints - 1; i >= 0; i--) {
        const time = new Date(now - i * 30 * 1000);
        labels.push(time.toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }));
      }
      break;
    case '30m':
    case '1h':
      for (let i = dataPoints - 1; i >= 0; i--) {
        const time = new Date(now - i * 60 * 1000);
        labels.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
      break;
    case '6h':
    case '12h':
      for (let i = dataPoints - 1; i >= 0; i--) {
        const time = new Date(now - i * 15 * 60 * 1000);
        labels.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
      break;
    case '24h':
      for (let i = 0; i < dataPoints; i++) {
        labels.push(`${i}:00`);
      }
      break;
    case '7d':
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      for (let i = dataPoints - 1; i >= 0; i--) {
        const date = new Date(now - i * 24 * 60 * 60 * 1000);
        labels.push(days[date.getDay()]);
      }
      break;
    case '30d':
      for (let i = dataPoints - 1; i >= 0; i--) {
        const date = new Date(now - i * 24 * 60 * 60 * 1000);
        labels.push(`${date.getMonth() + 1}/${date.getDate()}`);
      }
      break;
    default:
      for (let i = 0; i < dataPoints; i++) {
        labels.push(`${i}`);
      }
  }

  return labels;
}

export function generateTemperatureData(timeRange: TimeRangeOption): number[] {
  const dataPoints = getDataPointsForTimeRange(timeRange);
  return Array.from({ length: dataPoints }, () => 20 + Math.random() * 5);
}

export function generateUptimeData(timeRange: TimeRangeOption): number[] {
  const dataPoints = getDataPointsForTimeRange(timeRange);
  return Array.from({ length: dataPoints }, () => 95 + Math.random() * 5);
}

export function generateAlertRateData(timeRange: TimeRangeOption): number[] {
  const dataPoints = getDataPointsForTimeRange(timeRange);
  return Array.from({ length: dataPoints }, () => Math.random() * 3);
}

export function generateMetricData(timeRange: TimeRangeOption, min: number, max: number): number[] {
  const dataPoints = getDataPointsForTimeRange(timeRange);
  return Array.from({ length: dataPoints }, () => min + Math.random() * (max - min));
}
