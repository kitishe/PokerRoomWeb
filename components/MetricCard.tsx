interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: string;
  className?: string;
}

export default function MetricCard({
  title,
  value,
  icon,
  className = '',
}: MetricCardProps) {
  return (
    <div
      className={`bg-card rounded-lg shadow-md p-6 border border-border ${className}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-card-foreground">{value}</p>
        </div>
        {icon && <div className="text-3xl">{icon}</div>}
      </div>
    </div>
  );
}

