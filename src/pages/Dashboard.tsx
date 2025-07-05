
import { useState } from "react";
import { TaskList } from "@/components/TaskList";
import { TaskForm } from "@/components/TaskForm";
import { TaskFilters } from "@/components/TaskFilters";
import { UserProfile } from "@/components/UserProfile";
import { Button } from "@/components/ui/button";
import { Plus, CheckCircle, Clock, AlertCircle, Sparkles, Target, Zap } from "lucide-react";
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
      userId: 'current-user',
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

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const todo = tasks.filter(t => t.status === 'todo').length;
    return { total, completed, inProgress, todo };
  };

  const stats = getTaskStats();

  return (
    <div className="min-h-screen gradient-mesh">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 right-1/3 w-18 h-18 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-bounce-slow"></div>
      </div>

      <header className="border-b glass-morphism backdrop-blur-xl shadow-2xl relative z-10">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl flex items-center justify-center animate-glow">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gradient animate-shimmer">
              TaskFlow Pro
            </h1>
          </div>
          <UserProfile />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="group hover-lift glass-morphism p-8 rounded-3xl text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 opacity-90"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium uppercase tracking-wide">Total Tasks</p>
                <p className="text-4xl font-bold mt-2 animate-bounce-slow">{stats.total}</p>
                <p className="text-xs text-blue-200 mt-1">All your tasks</p>
              </div>
              <div className="bg-white/20 p-4 rounded-2xl animate-float">
                <Target className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          </div>

          <div className="group hover-lift glass-morphism p-8 rounded-3xl text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-600 to-teal-500 opacity-90"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium uppercase tracking-wide">Completed</p>
                <p className="text-4xl font-bold mt-2 animate-bounce-slow">{stats.completed}</p>
                <p className="text-xs text-green-200 mt-1">Great progress!</p>
              </div>
              <div className="bg-white/20 p-4 rounded-2xl animate-float" style={{animationDelay: '0.5s'}}>
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          </div>

          <div className="group hover-lift glass-morphism p-8 rounded-3xl text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 via-orange-600 to-red-500 opacity-90"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium uppercase tracking-wide">In Progress</p>
                <p className="text-4xl font-bold mt-2 animate-bounce-slow">{stats.inProgress}</p>
                <p className="text-xs text-yellow-200 mt-1">Keep going!</p>
              </div>
              <div className="bg-white/20 p-4 rounded-2xl animate-float" style={{animationDelay: '1s'}}>
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          </div>

          <div className="group hover-lift glass-morphism p-8 rounded-3xl text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-600 to-rose-500 opacity-90"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium uppercase tracking-wide">To Do</p>
                <p className="text-4xl font-bold mt-2 animate-bounce-slow">{stats.todo}</p>
                <p className="text-xs text-purple-200 mt-1">Let's do this!</p>
              </div>
              <div className="bg-white/20 p-4 rounded-2xl animate-float" style={{animationDelay: '1.5s'}}>
                <AlertCircle className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80">
            <div className="space-y-8">
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full btn-creative text-lg py-6 rounded-2xl hover-lift animate-shimmer font-bold tracking-wide" size="lg">
                    <Plus className="mr-3 h-6 w-6" />
                    Create Magic Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md glass-morphism border-white/20">
                  <DialogHeader>
                    <DialogTitle className="text-gradient text-xl">Create New Task</DialogTitle>
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
