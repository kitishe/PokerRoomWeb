import Link from 'next/link';
import {
  formatDateTime,
  formatCurrency,
  translateGameType,
} from '@/lib/utils';
import type { ActiveShiftData } from '@/types/api';

interface ActiveShiftCardProps {
  shift: ActiveShiftData;
}

export default function ActiveShiftCard({ shift }: ActiveShiftCardProps) {
  return (
    <div className="bg-primary rounded-lg shadow-lg p-6 mb-6">
      <Link href={`/shift/${shift.id}`} className="block hover:opacity-95 transition-opacity">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold text-primary-foreground">Активная смена</h2>
              <span className="px-2 py-1 bg-primary-foreground text-primary text-xs font-semibold rounded animate-pulse">
                LIVE
              </span>
            </div>
            <p className="text-primary-foreground opacity-90">
              Начало: {formatDateTime(shift.started_at)}
            </p>
            <p className="text-primary-foreground opacity-90">Менеджер: {shift.manager_name}</p>
          </div>
        </div>

        {/* Столы */}
        {shift.tables.length > 0 ? (
          <div className="space-y-3">
            <h3 className="text-primary-foreground font-semibold mb-2">
              Открытые столы ({shift.tables.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {shift.tables.map((table) => (
                <div
                  key={table.id}
                  className="bg-card rounded-lg p-4 shadow-md"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-foreground text-lg">
                      {table.label}
                    </h4>
                    <span className="text-muted-foreground text-sm">
                      {table.players_count} игроков
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">
                    {translateGameType(table.game)} • {table.limit_name}
                  </p>
                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    <span className="text-muted-foreground text-xs">За столом:</span>
                    <span className="text-green-600 font-bold">
                      {formatCurrency(table.total_money)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-primary-foreground opacity-90 text-center py-4">
            Нет открытых столов
          </p>
        )}
      </Link>
    </div>
  );
}

