// Типы для базы данных PostgreSQL

export type GameType = 'nlh' | 'plo4' | 'plo5';
export type StaffRole = 'manager' | 'dealer' | 'waiter';
export type TransactionType = 'buy_in' | 'cash_out';

export interface Player {
  id: string;
  full_name: string;
  notes: string | null;
  photo_path: string | null;
  created_at: string;
}

export interface Shift {
  id: string;
  started_at: string;
  closed_at: string | null;
  manager_name: string;
  tips_waiter_total: number | null;
  notes: string | null;
}

export interface ShiftStaff {
  id: string;
  shift_id: string;
  role: StaffRole;
  name: string;
}

export interface TableSession {
  id: string;
  shift_id: string;
  label: string;
  opened_at: string;
  closed_at: string | null;
  game: GameType;
  limit_name: string;
  rake_total: number | null;
  tips_dealer_total: number | null;
}

export interface TableLimitChange {
  id: string;
  table_session_id: string;
  changed_at: string;
  game: GameType;
  limit_name: string;
}

export interface TablePlayerSession {
  id: string;
  table_session_id: string;
  player_id: string;
  joined_at: string;
  left_at: string | null;
}

export interface PlayerTransaction {
  id: string;
  table_session_id: string;
  player_id: string;
  type: TransactionType;
  amount: number;
  created_at: string;
}

export interface TablePlayerNote {
  id: string;
  table_session_id: string;
  player_id: string;
  note: string;
  created_at: string;
}

