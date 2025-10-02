import { Player, Shift, TableSession } from './database';

// Расширенная информация о смене для списка
export interface ShiftListItem extends Shift {
  total_rake: number;
}

// Активная смена с информацией о столах
export interface ActiveShiftData extends Shift {
  tables: ActiveTableInfo[];
}

export interface ActiveTableInfo {
  id: string;
  label: string;
  game: string;
  limit_name: string;
  players_count: number;
  total_money: number; // сумма всех buy-ins минус cash-outs
}

// Детальная информация о смене
export interface ShiftDetailData extends Shift {
  total_rake: number;
  total_tips: number;
  unique_players_count: number;
  tables: TableDetailInfo[];
}

export interface TableDetailInfo {
  id: string;
  label: string;
  game: string;
  limit_name: string;
  opened_at: string;
  closed_at: string | null;
  duration_hours: number | null;
  rake_total: number;
  tips_dealer_total: number;
  players_count: number;
  players: PlayerDetailInfo[];
}

export interface PlayerDetailInfo {
  id: string;
  full_name: string;
  total_buy_ins: number;
  total_cash_outs: number;
  balance: number; // buy_ins - cash_outs
}

