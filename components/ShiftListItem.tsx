import Link from 'next/link';
import { formatDate, formatCurrency } from '@/lib/utils';
import type { ShiftListItem as ShiftListItemType } from '@/types/api';

interface ShiftListItemProps {
  shift: ShiftListItemType;
}

export default function ShiftListItem({ shift }: ShiftListItemProps) {
  const isActive = !shift.closed_at;

  return (
    <Link href={`/shift/${shift.id}`}>
      <div className="bg-card rounded-lg shadow-md border border-border p-4 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-foreground">
              {formatDate(shift.started_at)}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Менеджер: {shift.manager_name}
            </p>
            {isActive && (
              <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">
                Активна
              </span>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Общий рейк</p>
            <p className="text-xl font-bold text-green-600">
              {formatCurrency(shift.total_rake)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

