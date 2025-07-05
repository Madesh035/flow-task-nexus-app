
import { Task, TaskFilter } from "@/pages/Dashboard";
import { TaskCard } from "./TaskCard";
import { useMemo } from "react";
import { Search } from "lucide-react";

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
      <div className="text-center py-16">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-12 max-w-md mx-auto">
          <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-xl font-medium mb-2">No tasks found</p>
          <p className="text-gray-500 text-sm">
            {tasks.length === 0 ? "Create your first task to get started!" : "Try adjusting your filters"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Tasks ({filteredTasks.length})
        </h2>
      </div>
      
      <div className="grid gap-6">
        {filteredTasks.map((task, index) => (
          <div
            key={task.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <TaskCard
              task={task}
              onUpdate={onTaskUpdate}
              onDelete={onTaskDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
