import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Edit3, ArrowLeft, Check, ChevronsUpDown, Trash2, Loader2, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// API Hooks
import { useTaskById } from '@/features/tasks/hooks/useTaskById';
import { useDeleteTask } from '@/features/tasks/hooks/useDeleteTask';
import { useUpdateTask } from '@/features/tasks/hooks/useUpdateTask'; // Real Update Hook
import { useUsers } from '@/features/user/hooks/useUsers';        // Real Users Hook

import type { TaskStatus } from '@/features/tasks/types/task';
import type { UpdateTaskPayload } from '@/features/tasks/types/update';

export default function AdminTaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // 1. DATA FETCHING
  const { data: task, isLoading: isTaskLoading, isError } = useTaskById(id);
  const { data: users = [], isLoading: isUsersLoading } = useUsers();

  // 2. MUTATIONS
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();

  // 3. FORM STATE
  const [formData, setFormData] = useState<UpdateTaskPayload>({
    title: "",
    description: "",
    status: "todo" as TaskStatus,
    dueDate: "",
    assigneeIds: []
  });

  // Sync form with server data when modal opens or data changes
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate,
        assigneeIds: task.assignees.map(u => u.id)
      });
    }
  }, [task, isEditOpen]);

  if (isTaskLoading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-[rgb(var(--accent-2))]" />
    </div>
  );

  if (isError || !task) return (
    <div className="text-[rgb(var(--text-primary))] p-10 text-center bg-destructive/10 rounded-xl border border-destructive/20 max-w-md mx-auto mt-10">
      <AlertTriangle className="mx-auto h-10 w-10 mb-4 text-destructive" />
      <h2 className="text-xl font-bold">Task Not Found</h2>
      <Button onClick={() => navigate('/admin')} className="mt-6">Back to Dashboard</Button>
    </div>
  );

  // --- HANDLERS ---

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    updateTask(
      { id, payload: formData },
      {
        onSuccess: () => {
          setIsEditOpen(false);
        }
      }
    );
  };

  const handleDeleteConfirm = () => {
    deleteTask(task.id, {
      onSuccess: () => {
        setIsDeleteOpen(false);
        navigate('/admin');
      }
    });
  };

  const toggleAssignee = (userId: string) => {
    setFormData(prev => ({
      ...prev,
      assigneeIds: prev.assigneeIds?.includes(userId)
        ? prev.assigneeIds.filter(i => i !== userId)
        : [...(prev.assigneeIds || []), userId]
    }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={() => navigate(-1)} className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>

        <div className="flex gap-2">
            {/* DELETE DIALOG */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="border-destructive/30 text-destructive hover:bg-destructive hover:text-white transition-all">
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-[rgb(var(--card-bg))] border-[rgba(var(--card-border))] text-[rgb(var(--text-primary))]">
                    <DialogHeader><DialogTitle className="text-destructive">Confirm Deletion</DialogTitle></DialogHeader>
                    <div className="py-4 text-[rgb(var(--text-secondary))]">
                        Delete <span className="text-[rgb(var(--text-primary))] font-bold">"{task.title}"</span>? This cannot be undone.
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
                        <Button variant="destructive" disabled={isDeleting} onClick={handleDeleteConfirm}>
                            {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete Task"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* EDIT DIALOG */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-[rgb(var(--accent-2))] hover:opacity-90 text-white border-none shadow-lg">
                        <Edit3 className="mr-2 h-4 w-4" /> Edit Task
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-[rgb(var(--card-bg))] border-[rgba(var(--card-border))] text-[rgb(var(--text-primary))] max-w-lg">
                    <DialogHeader><DialogTitle className="text-xl font-bold tracking-tight">Update Task</DialogTitle></DialogHeader>
                    <form onSubmit={handleUpdateSubmit} className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label className="text-[rgb(var(--text-secondary))] text-xs font-bold uppercase">Task Title</Label>
                            <Input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="bg-[rgb(var(--input-bg))] border-[rgba(var(--input-border))]" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[rgb(var(--text-secondary))] text-xs font-bold uppercase">Description</Label>
                            <textarea className="w-full rounded-md p-2 text-sm bg-[rgb(var(--input-bg))] border border-[rgba(var(--input-border))] min-h-[80px] text-[rgb(var(--text-primary))] outline-none focus:ring-1 focus:ring-[rgb(var(--accent-2))]" 
                                value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-[rgb(var(--text-secondary))] text-xs font-bold uppercase">Status</Label>
                                <Select value={formData.status} onValueChange={(val: any) => setFormData({...formData, status: val})}>
                                    <SelectTrigger className="bg-[rgb(var(--input-bg))] border-[rgba(var(--input-border))]"><SelectValue /></SelectTrigger>
                                    <SelectContent className="bg-[rgb(var(--card-bg))] border-[rgba(var(--card-border))] text-[rgb(var(--text-primary))]">
                                        <SelectItem value="todo">Todo</SelectItem>
                                        <SelectItem value="in_progress">In Progress</SelectItem>
                                        <SelectItem value="done">Done</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[rgb(var(--text-secondary))] text-xs font-bold uppercase">Due Date</Label>
                                <Input type="date" value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} className="bg-[rgb(var(--input-bg))] border-[rgba(var(--input-border))]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[rgb(var(--text-secondary))] text-xs font-bold uppercase">Assignees</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" disabled={isUsersLoading} className="w-full justify-between bg-[rgb(var(--input-bg))] border-[rgba(var(--input-border))] text-[rgb(var(--text-primary))]">
                                        {isUsersLoading ? "Loading users..." : `${formData.assigneeIds?.length || 0} selected`}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-[rgb(var(--card-bg))] border-[rgba(var(--card-border))] z-[100]">
                                    <div className="max-h-[200px] overflow-y-auto p-2">
                                        {users.map((user) => (
                                            <div key={user.id} onClick={() => toggleAssignee(user.id)} className={cn("flex items-center justify-between p-2 rounded-sm cursor-pointer hover:bg-[rgb(var(--accent-2))]/20 transition-colors", formData.assigneeIds?.includes(user.id) ? "text-[rgb(var(--accent-2))] font-bold" : "text-[rgb(var(--text-secondary)) ]")}>
                                                <div className="flex flex-col"><span className="text-sm">{user.name}</span><span className="text-[10px] opacity-60">{user.role}</span></div>
                                                {formData.assigneeIds?.includes(user.id) && <Check className="h-4 w-4" />}
                                            </div>
                                        ))}
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <Button type="submit" disabled={isUpdating} className="w-full bg-[rgb(var(--accent-2))] text-white border-none mt-4 font-bold h-11">
                            {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save All Changes"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
      </div>

      <div className="card-glass p-8 space-y-6">
        <div>
            <div className="flex items-center gap-3 mb-2">
               <h1 className="text-3xl font-bold text-[rgb(var(--text-primary))]">{task.title}</h1>
               <span className="px-2 py-0.5 rounded bg-[rgb(var(--accent-2))]/10 text-[rgb(var(--accent-2))] border border-[rgb(var(--accent-2))]/20 text-[10px] font-bold uppercase tracking-widest">
                  {task.status.replace('_', ' ')}
               </span>
            </div>
            <p className="text-[rgb(var(--text-secondary))] text-sm leading-relaxed">{task.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 border-y border-[rgba(var(--card-border))]">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-[rgb(var(--text-muted))] uppercase tracking-widest">Active Team</span>
              <AnimatedTooltip items={task.assignees} />
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div><span className="text-[rgb(var(--text-muted))]">Created</span><p className="font-medium">{new Date(task.createdAt).toLocaleDateString()}</p></div>
              <div><span className="text-[rgb(var(--text-muted))]">Updated</span><p className="font-medium">{new Date(task.updatedAt).toLocaleDateString()}</p></div>
            </div>
            <div className="pt-2">
               <span className="text-[rgb(var(--text-muted))] text-xs">Deadline</span>
               <p className="text-[rgb(var(--accent-1))] font-bold text-lg">{task.dueDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}