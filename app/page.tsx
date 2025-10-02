import { getAllShifts, getActiveShift } from '@/lib/queries';
import ActiveShiftCard from '@/components/ActiveShiftCard';
import ShiftListItem from '@/components/ShiftListItem';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [activeShift, shifts] = await Promise.all([
    getActiveShift(),
    getAllShifts(),
  ]);

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">
          Отчеты покер-рума
        </h1>

        {/* Активная смена */}
        {activeShift && <ActiveShiftCard shift={activeShift} />}

        {/* Список смен */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Все смены</h2>
          {shifts.length > 0 ? (
            <div className="space-y-3">
              {shifts.map((shift) => (
                <ShiftListItem key={shift.id} shift={shift} />
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-lg shadow-md p-8 text-center text-muted-foreground">
              Нет смен
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
