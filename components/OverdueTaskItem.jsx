import { format } from "date-fns";
import { AlertCircle, Calendar, User } from "lucide-react";

export default function OverdueTaskItem({ task }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-rose-100 hover:border-rose-200 transition-colors duration-200">
    
      <div className="">
        <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center">
          <AlertCircle className="w-5 h-5 text-rose-500" />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-slate-800 truncate">
          {task.title}
        </h4>
        <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
     
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-rose-400" />
            <span>{format(new Date(task.dueDate), "MMM d, yyyy")}</span>
          </div>

          {task.assignedTo?.name && (
            <>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-600">{task.assignedTo.name}</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="">
        <span className="px-2.5 py-1 text-xs font-medium text-rose-600 bg-rose-50 rounded-full">
          Overdue
        </span>
      </div>
    </div>
  );
}