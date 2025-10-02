import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Форматирование даты и времени
export function formatDateTime(date: string): string {
  return new Date(date).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Форматирование только даты
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

// Форматирование только времени
export function formatTime(date: string): string {
  return new Date(date).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Форматирование валюты
export function formatCurrency(amount: number | null): string {
  if (amount === null) return '—';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

// Вычисление длительности в часах
export function calculateDurationHours(
  startDate: string,
  endDate: string | null
): number | null {
  if (!endDate) return null;
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  return (end - start) / (1000 * 60 * 60);
}

// Форматирование длительности
export function formatDuration(hours: number | null): string {
  if (hours === null) return 'Активен';
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}ч ${m}м`;
}

// Перевод типа игры
export function translateGameType(game: string): string {
  const translations: Record<string, string> = {
    nlh: "No-Limit Hold'em",
    plo4: 'PLO 4',
    plo5: 'PLO 5',
  };
  return translations[game] || game;
}

