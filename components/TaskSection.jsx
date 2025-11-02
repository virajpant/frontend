import { ClipboardIcon } from "lucide-react";
import TaskItem from "./TaskItem";
import TaskSkeleton from "./TaskSkeleton";

export default function TaskSection({ title, tasks, loading }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] backdrop-blur-sm overflow-hidden">
      <div className="px-8 py-6 border-b border-slate-100">
        <h2 className="text-xl font-medium text-slate-800">{title}</h2>
      </div>
      <div className="p-6">
        {loading ? (
          <TaskSkeleton />
        ) : tasks.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-50 flex items-center justify-center">
        <ClipboardIcon className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-slate-600 font-medium mb-1">No tasks yet</h3>
      <p className="text-slate-400 text-sm">
        Tasks you create will appear here
      </p>
    </div>
  );
}
