
import { Task, TaskFilter } from "@/pages/Dashboard";
import { TaskCard } from "./TaskCard";
import { useMemo } from "react";
import { Search, Sparkles, Target, Zap } from "lucide-react";

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
      <div className="text-center py-20 animate-fade-in">
        <div className="glass-morphism rounded-3xl p-16 max-w-lg mx-auto relative overflow-hidden">
          {/* Floating decorative elements */}
          <div className="absolute top-4 left-4 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30 animate-float"></div>
          <div className="absolute top-8 right-6 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-40 animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-6 left-8 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-35 animate-bounce-slow"></div>
          
          <div className="relative z-10">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center animate-glow">
              <Search className="h-12 w-12 text-white animate-bounce-slow" />
            </div>
            <h3 className="text-gradient text-2xl font-bold mb-4">No Tasks Found</h3>
            <p className="text-gray-600 text-lg font-medium mb-2">
              {tasks.length === 0 ? "Ready to create your first magical task?" : "Try adjusting your smart filters"}
            </p>
            <div className="flex justify-center space-x-2 mt-6">
              <Sparkles className="h-5 w-5 text-purple-500 animate-bounce-slow" />
              <Target className="h-5 w-5 text-pink-500 animate-bounce-slow" style={{animationDelay: '0.5s'}} />
              <Zap className="h-5 w-5 text-blue-500 animate-bounce-slow" style={{animationDelay: '1s'}} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-3xl font-bold text-gradient animate-shimmer">
            Your Tasks
          </h2>
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white px-4 py-2 rounded-full font-bold text-sm animate-bounce-slow shadow-lg">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
          </div>
        </div>
      </div>
      
      <div className="grid gap-8">
        {filteredTasks.map((task, index) => (
          <div
            key={task.id}
            className="animate-fade-in hover-lift"
            style={{ animationDelay: `${index * 150}ms` }}
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
