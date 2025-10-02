import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Страница не найдена
        </h2>
        <p className="text-muted-foreground mb-8">
          Запрошенная смена не существует или была удалена
        </p>
        <Link
          href="/"
          className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}

