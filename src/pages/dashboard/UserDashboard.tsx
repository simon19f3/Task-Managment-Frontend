import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { ListFilter, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import type { ColumnDef } from '@tanstack/react-table';

import { useTask } from '@/features/tasks/hooks/useTasks';
import type { Task, TaskStatus } from '@/features/tasks/types/task';
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Button } from '@/components/ui/button';

export default function UserDashboard() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<TaskStatus | undefined>(undefined);

  // FETCHING REAL DATA FROM API
  const { data: tasks = [], isLoading } = useTask({ search, status });

  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: "title",
      header: "My Task",
      cell: ({ row }) => (
        <div className="flex flex-col min-w-[150px]">
          {/* USER ROUTE: Points to /dashboard/task/:id */}
          <Link 
            to={`/dashboard/task/${row.original.id}`} 
            className="font-bold text-text-primary hover:text-accent-2 transition-colors"
          >
            {row.getValue("title")}
          </Link>
          <span className="text-[9px] text-text-muted uppercase">
            Updated: {new Date(row.original.updatedAt).toLocaleDateString()}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="max-w-[250px] truncate text-xs text-text-secondary italic">
          {row.getValue("description")}
        </div>
      ),
    },
    {
      accessorKey: "assignees",
      header: () => <div className="text-center">Team</div>,
      cell: ({ row }) => {
        const all = row.original.assignees || [];
        return (
          <div className="flex justify-center items-center">
            {/* Displaying every user in the team with Tooltip */}
            <AnimatedTooltip items={all.slice(0, 3)} />
            {all.length > 3 && (
              <div className="ml-1 text-[9px] font-bold text-text-muted bg-card-border/50 h-8 w-8 rounded-full flex items-center justify-center border border-card-border">
                +{all.length - 3}
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Progress",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <div className="flex items-center gap-2">
            <div className={cn(
                "h-1.5 w-1.5 rounded-full",
                status === 'done' ? 'bg-green-500' : 'bg-accent-2'
            )} />
            <span className="capitalize text-[10px] font-bold text-text-secondary">
              {status.replace('_', ' ')}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "dueDate",
      header: () => <div className="text-right">Due Date</div>,
      cell: ({ row }) => (
        <div className="text-right text-[10px] font-mono font-bold text-text-primary">
          {row.getValue("dueDate")}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4 space-y-6">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Personal Dashboard</h1>
          <p className="text-text-secondary text-sm">Track your progress and collaborate</p>
        </div>
        
        {/* Users typically don't have the create button here */}
        <div className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-bold mb-1">
          Active Tasks: {tasks.length}
        </div>
      </div>

      {/* FILTERS SECTION */}
      <div className="flex items-center gap-2 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-muted" />
          <Input
            placeholder="Search your tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-input-bg border-input-border text-text-primary focus:ring-1 focus:ring-accent-2"
          />
        </div>
        
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-input-bg border-input-border text-text-primary h-10 px-3">
                  <ListFilter className="size-4 mr-2"/>
                  <span className="hidden sm:inline text-xs">Filter</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card-bg border-card-border text-text-primary">
                <DropdownMenuItem onClick={() => setStatus(undefined)}>All Status</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-card-border" />
                <DropdownMenuItem onClick={() => setStatus('todo')}>Todo</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatus('in_progress')}>In Progress</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatus('done')}>Done</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* TABLE SECTION */}
      <div className="overflow-hidden rounded-xl border border-card-border bg-card-bg/50 backdrop-blur-sm shadow-2xl">
        <Table>
          <TableHeader className="bg-input-bg/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-card-border hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-text-muted font-bold text-[9px] uppercase tracking-widest py-4">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
               <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-text-muted animate-pulse font-medium">
                  Syncing with workspace...
                </TableCell>
              </TableRow>
            ) : tasks.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow 
                  key={row.id} 
                  className="border-card-border hover:bg-input-bg/20 transition-all duration-200"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-text-muted italic">
                  No tasks assigned to you.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Utility function for merging classes (ensure this is in your utils/cn.ts)
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}