import { formatCurrency, formatDuration, translateGameType } from '@/lib/utils';
import type { TableDetailInfo } from '@/types/api';
import PlayerRow from './PlayerRow';

interface TableCardProps {
  table: TableDetailInfo;
}

export default function TableCard({ table }: TableCardProps) {
  return (
    <div className="bg-card rounded-lg shadow-md border border-border overflow-hidden mb-4">
      {/* Заголовок стола */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold">{table.label}</h3>
            <p className="opacity-90 text-sm mt-1">
              {translateGameType(table.game)} • {table.limit_name}
            </p>
          </div>
          <div className="text-right">
            <p className="opacity-90 text-sm">Длительность</p>
            <p className="font-semibold">
              {formatDuration(table.duration_hours)}
            </p>
          </div>
        </div>
      </div>

      {/* Метрики стола */}
      <div className="grid grid-cols-3 gap-4 p-4 bg-muted border-b border-border">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Игроков</p>
          <p className="text-lg font-bold text-foreground">
            {table.players_count}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Рейк</p>
          <p className="text-lg font-bold text-green-600">
            {formatCurrency(table.rake_total)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Чаевые</p>
          <p className="text-lg font-bold text-primary">
            {formatCurrency(table.tips_dealer_total)}
          </p>
        </div>
      </div>

      {/* Список игроков */}
      {table.players.length > 0 ? (
        <div className="divide-y divide-border">
          {table.players.map((player) => (
            <PlayerRow key={player.id} player={player} />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          Нет данных об игроках
        </div>
      )}
    </div>
  );
}

