export default function StatCard({ title, count, trend, isNegative }) {
  const variants = {
    primary: "bg-blue-50 border-blue-100 text-blue-700",
    secondary: "bg-purple-50 border-purple-100 text-purple-700",
    danger: "bg-rose-50 border-rose-100 text-rose-700"
  };

  return (
 <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] backdrop-blur-sm">
      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-600 font-medium">{title}</h3>
          <span className={`text-sm ${isNegative ? 'text-rose-500' : 'text-emerald-500'}`}>
            {trend}
          </span>
        </div>
        <p className="text-4xl font-light text-slate-800">{count}</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-slate-200/40 via-slate-200 to-slate-200/40" />
    </div>
  );
}