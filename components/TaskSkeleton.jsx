export default function TaskSkeleton() {
  return (
  <div className="space-y-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="rounded-xl border border-slate-100 p-5">
          <div className="animate-pulse flex gap-4">
            <div className="w-2 h-8 bg-slate-200 rounded-full" />
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-slate-100 rounded w-3/4" />
              <div className="h-3 bg-slate-50 rounded w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
