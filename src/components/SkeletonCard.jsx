export default function SkeletonCard() {

  return (
    <div className="animate-pulse bg-white dark:bg-slate-900 p-6 rounded-xl shadow">

      <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/2 mb-3"></div>

      <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-1/3"></div>

    </div>
  );
}