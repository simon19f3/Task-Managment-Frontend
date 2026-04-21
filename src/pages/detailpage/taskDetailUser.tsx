import { useParams } from 'react-router-dom';
import { useTaskById } from '@/features/tasks/hooks/useTaskById';
import { useUpdateTaskStatus } from '@/features/tasks/hooks/useUpdateStatus';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, ListTodo, Loader2, AlertCircle } from "lucide-react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import type { TaskStatus } from '@/features/tasks/types/task';

export default function UserTaskDetail() {
  const { id } = useParams();

  // 1. FETCH REAL DATA
  const { data: task, isLoading, isError } = useTaskById(id);

  // 2. STATUS MUTATION
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateTaskStatus();

  if (isLoading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-[rgb(var(--accent-2))]" />
    </div>
  );

  if (isError || !task) return (
    <div className="p-10 text-center space-y-4">
      <AlertCircle className="mx-auto h-12 w-12 text-destructive opacity-50" />
      <p className="text-[rgb(var(--text-secondary))]">Task not found or access denied.</p>
    </div>
  );

  const handleStatusChange = (newStatus: string) => {
    if (!id) return;
    updateStatus({
      id,
      payload: { status: newStatus as TaskStatus }
    });
  };

  const getStatusIcon = (status: string) => {
    if (status === 'done') return <CheckCircle2 className="text-green-500 h-5 w-5" />;
    if (status === 'in_progress') return <Clock className="text-[rgb(var(--accent-2))] h-5 w-5" />;
    return <ListTodo className="text-[rgb(var(--text-muted))] h-5 w-5" />;
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="card-glass p-8 space-y-8 relative overflow-hidden">
        
        {/* Loading overlay for status updates */}
        {isUpdating && (
          <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px] z-10 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-[rgb(var(--accent-2))]" />
          </div>
        )}

        <div>
          <div className="flex justify-between items-start mb-4">
            <Badge className="bg-[rgb(var(--accent-2))]/10 text-[rgb(var(--accent-2))] border-[rgb(var(--accent-2))]/20 font-mono text-[10px]">
              {task.id.slice(0, 8)}...
            </Badge>
            <div className="text-[10px] text-[rgb(var(--text-muted))] uppercase tracking-tighter">
              Due: {task.dueDate}
            </div>
          </div>
          <h1 className="text-2xl font-bold text-[rgb(var(--text-primary))]">{task.title}</h1>
          <p className="text-[rgb(var(--text-secondary))] mt-3 leading-relaxed text-sm">
            {task.description}
          </p>
        </div>

        {/* TEAM SECTION (Established Feature) */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-widest text-[rgb(var(--text-muted))]">Project Team</label>
          <div className="flex items-center gap-2">
            <AnimatedTooltip items={task.assignees} />
          </div>
        </div>

        {/* STATUS UPDATE BOX */}
        <div className="space-y-4 p-5 rounded-xl bg-[rgb(var(--input-bg))]/30 border border-[rgba(var(--input-border))]">
          <label className="text-[10px] font-bold uppercase tracking-widest text-[rgb(var(--text-muted))]">My Progress</label>
          <div className="flex items-center gap-4">
            {getStatusIcon(task.status)}
            <Select 
              defaultValue={task.status} 
              onValueChange={handleStatusChange}
              disabled={isUpdating}
            >
              <SelectTrigger className="w-full bg-[rgb(var(--input-bg))] border-[rgba(var(--input-border))] text-[rgb(var(--text-primary))]">
                <SelectValue placeholder="Update Status" />
              </SelectTrigger>
              <SelectContent className="bg-[rgb(var(--card-bg))] border-[rgba(var(--card-border))] text-[rgb(var(--text-primary))]">
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="pt-4 border-t border-[rgba(var(--card-border))] flex justify-between items-center text-[10px] text-[rgb(var(--text-muted))] uppercase tracking-widest">
          <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
          <span>Last Activity: {new Date(task.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
}