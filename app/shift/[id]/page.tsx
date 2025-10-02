import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getShiftDetail } from '@/lib/queries';
import { formatDateTime, formatCurrency } from '@/lib/utils';
import MetricCard from '@/components/MetricCard';
import TableCard from '@/components/TableCard';

export const dynamic = 'force-dynamic';

interface ShiftPageProps {
  params: Promise<{ id: string }>;
}

export default async function ShiftPage({ params }: ShiftPageProps) {
  const { id } = await params;
  const shift = await getShiftDetail(id);

  if (!shift) {
    notFound();
  }

  const isActive = !shift.closed_at;

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Кнопка назад */}
        <Link
          href="/"
          className="inline-flex items-center text-primary hover:opacity-80 mb-6"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Назад к списку смен
        </Link>

        {/* Заголовок */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold text-foreground">
              Смена от {formatDateTime(shift.started_at)}
            </h1>
            {isActive && (
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                Активна
              </span>
            )}
          </div>
          <p className="text-lg text-muted-foreground">
            Менеджер: {shift.manager_name}
          </p>
          {shift.closed_at && (
            <p className="text-muted-foreground">
              Закрыта: {formatDateTime(shift.closed_at)}
            </p>
          )}
        </div>

        {/* Метрики смены */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Общий рейк"
            value={formatCurrency(shift.total_rake)}
            icon="💰"
          />
          <MetricCard
            title="Общие чаевые"
            value={formatCurrency(shift.total_tips)}
            icon="🎁"
          />
          <MetricCard
            title="Уникальных игроков"
            value={shift.unique_players_count}
            icon="👥"
          />
        </div>

        {/* Список столов */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Столы ({shift.tables.length})
          </h2>
          {shift.tables.length > 0 ? (
            <div className="space-y-4">
              {shift.tables.map((table) => (
                <TableCard key={table.id} table={table} />
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-lg shadow-md p-8 text-center text-muted-foreground">
              Нет столов в этой смене
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

