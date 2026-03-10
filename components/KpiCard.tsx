import Card from "./ui/Card";

interface KpiCardProps {
  title: string;
  value: string | number;
  unit: string;
  trend?: "up" | "down" | "neutral";
}

export default function KpiCard({
  title,
  value,
  unit,
  trend,
}: KpiCardProps): React.JSX.Element {
  return (
    <Card className="border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <p className="text-3xl ">{title}</p>
      <p className="text-2xl font-bold">
        {value} <span className="text-sm font-normal">{unit}</span>
      </p>
      {trend && <p>{trend}</p>}
    </Card>
  );
}
