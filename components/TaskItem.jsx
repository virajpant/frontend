import { format } from "date-fns";
import { Calendar, User } from "lucide-react";

export default function TaskItem({ task }) {
  const statusStyles = {
    completed: "bg-gradient-to-r from-emerald-500 to-teal-500",
    overdue: "bg-gradient-to-r from-rose-500 to-pink-500",
    pending: "bg-gradient-to-r from-amber-400 to-orange-400"
  };

  return (
    <div className="group relative rounded-xl border border-slate-100 hover:border-slate-200 bg-white p-5 transition-all duration-200 hover:shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`w-2 h-8 rounded-full ${statusStyles[task.status]}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-slate-700 truncate">{task.title}</h4>
            <span className="text-sm text-slate-400">
              {task.priority && (
                <span className="px-3 py-1 rounded-full bg-slate-50 text-slate-600 text-xs">
                  {task.priority}
                </span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(task.dueDate), "MMM d, yyyy")}</span>
            </div>
            {task.assignedTo && (
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>{task.assignedTo.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}