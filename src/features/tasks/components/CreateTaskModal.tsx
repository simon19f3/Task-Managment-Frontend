import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  Plus, 
  Check, 
  ChevronsUpDown, 
  Loader2,
  Users as UsersIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

// Hooks & Types
import { useCreateTask } from '@/features/tasks/hooks/useCreateTask';
import { useUsers } from '@/features/user/hooks/useUsers'; // Real API Hook
import type { TaskStatus, CreateTaskPayload } from '@/features/tasks/types/create';

export const CreateTaskModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // 1. Fetch Real Users from API
  const { data: users = [], isLoading: isLoadingUsers } = useUsers();
  
  // 2. Task Mutation Hook
  const { mutate, isPending: isCreating } = useCreateTask();

  // Form State
  const [formData, setFormData] = useState<CreateTaskPayload>({
    title: "",
    description: "",
    status: "todo" as TaskStatus,
    assigneeIds: [],
    assigneeId: "", 
    dueDate: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct payload ensuring consistency with your API type
    const payload: CreateTaskPayload = {
      ...formData,
      assigneeId: formData.assigneeIds[0] || "" 
    };

    mutate(payload, {
      onSuccess: () => {
        setIsOpen(false);
        setFormData({ 
          title: "", 
          description: "", 
          status: "todo", 
          assigneeIds: [], 
          assigneeId: "", 
          dueDate: "" 
        });
      },
    });
  };

  const toggleAssignee = (userId: string) => {
    setFormData(prev => ({
      ...prev,
      assigneeIds: prev.assigneeIds.includes(userId)
        ? prev.assigneeIds.filter(id => id !== userId)
        : [...prev.assigneeIds, userId]
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[rgb(var(--accent-2))] hover:opacity-90 text-white font-bold shadow-lg transition-all border-none">
          <Plus className="mr-2 h-4 w-4" /> New Task
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-[rgb(var(--card-bg))] border-[rgba(var(--card-border))] text-[rgb(var(--text-primary))] sm:max-w-[450px] backdrop-blur-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight">Create New Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-4">
          {/* TITLE & DESCRIPTION FIELDS REMAIN THE SAME */}
          <div className="space-y-2">
            <Label className="text-text-secondary text-xs font-bold uppercase tracking-wider">Title</Label>
            <Input
              required
              placeholder="e.g., Q3 Security Audit"
              className="bg-[rgb(var(--input-bg))] border-[rgba(var(--input-border))]"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-text-secondary text-xs font-bold uppercase tracking-wider">Description</Label>
            <textarea
              className="w-full rounded-md p-3 text-sm bg-[rgb(var(--input-bg))] border border-[rgba(var(--input-border))] min-h-[80px] text-[rgb(var(--text-primary))] outline-none focus:ring-1 focus:ring-[rgb(var(--accent-2))]"
              placeholder="Detailed task breakdown..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-text-secondary text-xs font-bold uppercase tracking-wider">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(v: TaskStatus) => setFormData({ ...formData, status: v })}
              >
                <SelectTrigger className="bg-[rgb(var(--input-bg))] border-[rgba(var(--input-border))]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[rgb(var(--card-bg))] border-[rgba(var(--card-border))] text-[rgb(var(--text-primary))]">
                  <SelectItem value="todo">Todo</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-text-secondary text-xs font-bold uppercase tracking-wider">Due Date</Label>
              <Input
                type="date"
                required
                className="bg-[rgb(var(--input-bg))] border-[rgba(var(--input-border))]"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>
          </div>

          {/* REAL USERS MULTI-SELECT */}
          <div className="space-y-2">
            <Label className="text-text-secondary text-xs font-bold uppercase tracking-wider">Assignees</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  disabled={isLoadingUsers}
                  className="w-full justify-between bg-[rgb(var(--input-bg))] border-[rgba(var(--input-border))] text-[rgb(var(--text-primary))]"
                >
                  <span className="truncate">
                    {isLoadingUsers ? "Fetching team..." : 
                     formData.assigneeIds.length > 0 
                      ? `${formData.assigneeIds.length} members selected` 
                      : "Choose team members"}
                  </span>
                  {isLoadingUsers ? <Loader2 className="h-3 w-3 animate-spin opacity-50" /> : <ChevronsUpDown className="h-4 w-4 opacity-50" />}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-[rgb(var(--card-bg))] border-[rgba(var(--card-border))] shadow-2xl z-[100]">
                <div className="max-h-[200px] overflow-y-auto p-2 space-y-1 custom-scrollbar">
                  {users.length === 0 && !isLoadingUsers && (
                    <div className="p-4 text-center text-xs text-text-muted italic">No users found.</div>
                  )}
                  {users.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => toggleAssignee(user.id)}
                      className={cn(
                        "flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors",
                        formData.assigneeIds.includes(user.id) 
                          ? "bg-[rgb(var(--accent-2))]/20 text-[rgb(var(--accent-2))]" 
                          : "hover:bg-[rgba(var(--input-border))]/30 text-text-secondary"
                      )}
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">{user.name}</span>
                        <span className="text-[10px] opacity-60 lowercase">{user.role}</span>
                      </div>
                      {formData.assigneeIds.includes(user.id) && <Check className="h-4 w-4" />}
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Button 
            type="submit" 
            disabled={isCreating}
            className="w-full bg-[rgb(var(--accent-2))] text-white border-none mt-4 font-bold h-11 shadow-lg disabled:opacity-50"
          >
            {isCreating ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Finalizing...
              </span>
            ) : "Create Task"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};