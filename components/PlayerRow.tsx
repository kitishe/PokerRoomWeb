import { formatCurrency } from '@/lib/utils';
import type { PlayerDetailInfo } from '@/types/api';

interface PlayerRowProps {
  player: PlayerDetailInfo;
}

export default function PlayerRow({ player }: PlayerRowProps) {
  const isWinner = player.balance > 0;
  const isLoser = player.balance < 0;
  
  const rowBgColor = isWinner
    ? 'bg-green-50'
    : isLoser
    ? 'bg-red-50'
    : 'bg-transparent';
  
  const balanceColor = isWinner
    ? 'text-green-600'
    : isLoser
    ? 'text-red-600'
    : 'text-muted-foreground';

  return (
    <div className={`flex items-center justify-between py-3 px-4 border-b border-border last:border-b-0 ${rowBgColor}`}>
      <div className="flex-1">
        <p className="font-medium text-foreground">{player.full_name}</p>
      </div>
      <div className="flex gap-6 text-sm">
        <div className="text-right">
          <p className="text-muted-foreground">Buy-in</p>
          <p className={`font-medium ${isLoser ? 'text-red-600 font-bold' : 'text-foreground'}`}>
            {formatCurrency(player.total_buy_ins)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground">Cash-out</p>
          <p className={`font-medium ${isWinner ? 'text-green-600 font-bold' : 'text-foreground'}`}>
            {formatCurrency(player.total_cash_outs)}
          </p>
        </div>
        <div className="text-right min-w-[100px]">
          <p className="text-muted-foreground">Баланс</p>
          <p className={`font-bold ${balanceColor}`}>
            {formatCurrency(player.balance)}
          </p>
        </div>
      </div>
    </div>
  );
}

