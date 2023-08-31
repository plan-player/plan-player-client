interface StatisticsCalanderTimeProps {
  totalTime: string;
}

export const formatTime = (ms: number) => {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 360000) / 60000);
  const hoursString = hours.toString().padStart(2, '0');
  const minutesString = minutes.toString().padStart(2, '0');
  return `${hoursString}:${minutesString}`;
};

const StatisticsCalanderTime = ({ totalTime }: StatisticsCalanderTimeProps) => {
  return <>{totalTime ? totalTime : '00:00'}</>;
};

export default StatisticsCalanderTime;
