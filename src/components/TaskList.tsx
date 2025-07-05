
import { Task, TaskFilter } from "@/pages/Dashboard";
import { TaskCard } from "./TaskCard";
import { useMemo } from "react";

interface TaskListProps {
  tasks: Task[];
  filters: TaskFilter;
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
  onTaskDelete: (taskId: string) => void;
}

export const TaskList = ({ tasks, filters, onTaskUpdate, onTaskDelete }: TaskListProps) => {
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Status filter
      if (filters.status && filters.status !== 'all' && task.status !== filters.status) {
        return false;
      }

      // Priority filter
      if (filters.priority && filters.priority !== 'all' && task.priority !== filters.priority) {
        return false;
      }

      // Due date filter
      if (filters.dueFilter && filters.dueFilter !== 'all' && task.dueDate) {
        const today = new Date();
        const taskDue = new Date(task.dueDate);
        
        switch (filters.dueFilter) {
          case 'today':
            if (taskDue.toDateString() !== today.toDateString()) return false;
            break;
          case 'overdue':
            if (taskDue >= today) return false;
            break;
          case 'upcoming':
            if (taskDue <= today) return false;
            break;
        }
      }

      return true;
    });
  }, [tasks, filters]);

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No tasks found</p>
        <p className="text-muted-foreground text-sm mt-2">
          {tasks.length === 0 ? "Create your first task to get started!" : "Try adjusting your filters"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          Tasks ({filteredTasks.length})
        </h2>
      </div>
      
      <div className="grid gap-4">
        {filteredTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdate={onTaskUpdate}
            onDelete={onTaskDelete}
          />
        ))}
      </div>
    </div>
  );
};
