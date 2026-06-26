export default function Loading() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-8">
      <div className="h-10 w-32 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-900" />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="aspect-square animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-900" />
        <div className="min-h-96 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-900" />
      </div>
    </main>
  );
}
