import { createServerClient } from './supabase/server';
import type {
  ShiftListItem,
  ActiveShiftData,
  ShiftDetailData,
  ActiveTableInfo,
  TableDetailInfo,
  PlayerDetailInfo,
} from '@/types/api';
import type { PlayerTransaction } from '@/types/database';
import { calculateDurationHours } from './utils';

// Получить все смены с общим рейком (кроме активной)
export async function getAllShifts(): Promise<ShiftListItem[]> {
  const supabase = createServerClient();

  const { data: shifts, error } = await supabase
    .from('shifts')
    .select('*')
    .not('closed_at', 'is', null)
    .order('started_at', { ascending: false });

  if (error) throw error;

  // Получаем рейк для каждой смены
  const shiftsWithRake = await Promise.all(
    (shifts || []).map(async (shift) => {
      const { data: tables } = await supabase
        .from('table_sessions')
        .select('rake_total')
        .eq('shift_id', shift.id);

      const total_rake =
        tables?.reduce((sum, table) => sum + (table.rake_total || 0), 0) || 0;

      return {
        ...shift,
        total_rake,
      };
    })
  );

  return shiftsWithRake;
}

// Получить активную смену
export async function getActiveShift(): Promise<ActiveShiftData | null> {
  const supabase = createServerClient();

  const { data: shift, error } = await supabase
    .from('shifts')
    .select('*')
    .is('closed_at', null)
    .single();

  if (error || !shift) return null;

  // Получаем открытые столы
  const { data: tables } = await supabase
    .from('table_sessions')
    .select('*')
    .eq('shift_id', shift.id)
    .is('closed_at', null);

  const tablesWithInfo = await Promise.all(
    (tables || []).map(async (table): Promise<ActiveTableInfo> => {
      // Количество игроков за столом (не покинувших)
      const { count: playersCount } = await supabase
        .from('table_player_sessions')
        .select('*', { count: 'exact', head: true })
        .eq('table_session_id', table.id)
        .is('left_at', null);

      // Все транзакции за столом
      const { data: transactions } = await supabase
        .from('player_transactions')
        .select('type, amount')
        .eq('table_session_id', table.id);

      const totalMoney =
        transactions?.reduce((sum, tx) => {
          return tx.type === 'buy_in'
            ? sum + tx.amount
            : sum - tx.amount;
        }, 0) || 0;

      return {
        id: table.id,
        label: table.label,
        game: table.game,
        limit_name: table.limit_name,
        players_count: playersCount || 0,
        total_money: totalMoney,
      };
    })
  );

  return {
    ...shift,
    tables: tablesWithInfo,
  };
}

// Получить детальную информацию о смене
export async function getShiftDetail(
  shiftId: string
): Promise<ShiftDetailData | null> {
  const supabase = createServerClient();

  const { data: shift, error } = await supabase
    .from('shifts')
    .select('*')
    .eq('id', shiftId)
    .single();

  if (error || !shift) return null;

  // Получаем все столы смены
  const { data: tables } = await supabase
    .from('table_sessions')
    .select('*')
    .eq('shift_id', shift.id)
    .order('opened_at', { ascending: true });

  // Вычисляем метрики
  const totalRake =
    tables?.reduce((sum, table) => sum + (table.rake_total || 0), 0) || 0;
  const totalTips =
    tables?.reduce(
      (sum, table) => sum + (table.tips_dealer_total || 0),
      0
    ) || 0;

  // Уникальные игроки за смену
  const { data: playerSessions } = await supabase
    .from('table_player_sessions')
    .select('player_id')
    .in(
      'table_session_id',
      tables?.map((t) => t.id) || []
    );

  const uniquePlayersCount = new Set(
    playerSessions?.map((ps) => ps.player_id) || []
  ).size;

  // Детальная информация о каждом столе
  const tablesWithDetails = await Promise.all(
    (tables || []).map(async (table): Promise<TableDetailInfo> => {
      // Игроки за столом
      const { data: playerSessions } = await supabase
        .from('table_player_sessions')
        .select('player_id')
        .eq('table_session_id', table.id);

      const playerIds = playerSessions?.map((ps) => ps.player_id) || [];

      // Транзакции игроков
      const { data: transactions } = await supabase
        .from('player_transactions')
        .select('player_id, type, amount')
        .eq('table_session_id', table.id);

      // Информация об игроках
      const { data: players } = await supabase
        .from('players')
        .select('id, full_name')
        .in('id', playerIds);

      const playersWithStats = (players || []).map(
        (player): PlayerDetailInfo => {
          const playerTransactions =
            transactions?.filter((t) => t.player_id === player.id) || [];

          const totalBuyIns = playerTransactions
            .filter((t) => t.type === 'buy_in')
            .reduce((sum, t) => sum + t.amount, 0);

          const totalCashOuts = playerTransactions
            .filter((t) => t.type === 'cash_out')
            .reduce((sum, t) => sum + t.amount, 0);

          return {
            id: player.id,
            full_name: player.full_name,
            total_buy_ins: totalBuyIns,
            total_cash_outs: totalCashOuts,
            balance: totalBuyIns - totalCashOuts,
          };
        }
      );

      const durationHours = calculateDurationHours(
        table.opened_at,
        table.closed_at
      );

      return {
        id: table.id,
        label: table.label,
        game: table.game,
        limit_name: table.limit_name,
        opened_at: table.opened_at,
        closed_at: table.closed_at,
        duration_hours: durationHours,
        rake_total: table.rake_total || 0,
        tips_dealer_total: table.tips_dealer_total || 0,
        players_count: playerIds.length,
        players: playersWithStats,
      };
    })
  );

  return {
    ...shift,
    total_rake: totalRake,
    total_tips: totalTips,
    unique_players_count: uniquePlayersCount,
    tables: tablesWithDetails,
  };
}

