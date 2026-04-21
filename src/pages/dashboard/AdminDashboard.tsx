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
import { CreateTaskModal } from '@/features/tasks/components/CreateTaskModal'; // Adjust path
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<TaskStatus | undefined>(undefined);

  // FETCHING REAL DATA
  const { data: tasks = [], isLoading, refetch } = useTask({ search, status });

  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: "title",
      header: "Task",
      cell: ({ row }) => (
        <div className="flex flex-col min-w-[150px]">
          <Link to={`/admin/task/${row.original.id}`} className="font-bold text-text-primary hover:text-accent-2 transition-colors">
            {row.getValue("title")}
          </Link>
          <span className="text-[9px] text-text-muted uppercase">
            Created: {new Date(row.original.createdAt).toLocaleDateString()}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate text-xs text-text-secondary italic">
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
            <AnimatedTooltip items={all.slice(0, 3)} />
            {all.length > 3 && (
              <div className="ml-1 text-[9px] font-bold text-text-muted">+{all.length - 3}</div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className="capitalize px-2 py-1 rounded-md bg-input-bg border border-input-border text-[9px] font-black text-text-secondary">
          {(row.getValue("status") as string).replace('_', ' ')}
        </span>
      ),
    },
    {
      accessorKey: "dueDate",
      header: () => <div className="text-right">Timeline</div>,
      cell: ({ row }) => (
        <div className="text-right">
            <div className="text-[10px] font-bold text-text-primary">{row.getValue("dueDate")}</div>
            <div className="text-[9px] text-text-muted">Updated {new Date(row.original.updatedAt).toLocaleDateString()}</div>
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
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Admin Control</h1>
          <p className="text-text-secondary text-sm">Real-time Task Management</p>
        </div>
        
        {/* COMPONENTIZED MODAL */}
        <CreateTaskModal/>
      </div>

      {/* API FILTERS */}
      <div className="flex items-center gap-2 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-muted" />
          <Input
            placeholder="Search API..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-input-bg border-input-border"
          />
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-input-bg border-input-border">
                  <ListFilter className="size-4"/>
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

      <div className="overflow-hidden rounded-xl border border-card-border bg-card-bg/50 backdrop-blur-sm">
        <Table>
          <TableHeader className="bg-input-bg/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-card-border">
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
                <TableCell colSpan={columns.length} className="h-24 text-center text-text-muted animate-pulse">
                  Loading tasks from API...
                </TableCell>
              </TableRow>
            ) : tasks.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-card-border hover:bg-input-bg/20 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-text-muted">
                  No tasks found in the database.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}