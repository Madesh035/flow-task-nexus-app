
import { useState } from "react";
import { TaskList } from "@/components/TaskList";
import { TaskForm } from "@/components/TaskForm";
import { TaskFilters } from "@/components/TaskFilters";
import { UserProfile } from "@/components/UserProfile";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  sharedWith?: string[];
}

export interface TaskFilter {
  status?: 'todo' | 'in-progress' | 'completed' | 'all';
  priority?: 'low' | 'medium' | 'high' | 'all';
  dueFilter?: 'today' | 'overdue' | 'upcoming' | 'all';
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<TaskFilter>({ status: 'all', priority: 'all', dueFilter: 'all' });
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleTaskCreate = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'current-user', // This will be replaced with actual user ID from auth
    };
    setTasks(prev => [newTask, ...prev]);
    setIsCreateDialogOpen(false);
  };

  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    ));
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <UserProfile />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-80">
            <div className="space-y-4">
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full" size="lg">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                  </DialogHeader>
                  <TaskForm onSubmit={handleTaskCreate} />
                </DialogContent>
              </Dialog>

              <TaskFilters filters={filters} onFiltersChange={setFilters} />
            </div>
          </aside>

          <div className="flex-1">
            <TaskList 
              tasks={tasks} 
              filters={filters}
              onTaskUpdate={handleTaskUpdate}
              onTaskDelete={handleTaskDelete}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
