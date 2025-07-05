
import { Task } from "@/pages/Dashboard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TaskForm } from "./TaskForm";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, Trash2, Calendar, Users, MoreVertical, Star, Flame, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface TaskCardProps {
  task: Task;
  onUpdate: (taskId: string, updates: Partial<Task>) => void;
  onDelete: (taskId: string) => void;
}

export const TaskCard = ({ task, onUpdate, onDelete }: TaskCardProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleStatusChange = (completed: boolean) => {
    const newStatus = completed ? 'completed' : 'todo';
    onUpdate(task.id, { status: newStatus });
    toast.success(`Task marked as ${newStatus}`);
  };

  const handleEdit = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    onUpdate(task.id, taskData);
    setIsEditDialogOpen(false);
    toast.success("Task updated successfully");
  };

  const handleDelete = () => {
    onDelete(task.id);
    toast.success("Task deleted successfully");
  };

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'high': 
        return 'bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 text-white shadow-lg shadow-red-500/30 animate-glow';
      case 'medium': 
        return 'bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-500 text-white shadow-lg shadow-yellow-500/30';
      case 'low': 
        return 'bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white shadow-lg shadow-green-500/30';
      default: 
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'completed': 
        return 'bg-gradient-to-r from-green-100 via-emerald-100 to-green-50 text-green-800 border border-green-200 shadow-md';
      case 'in-progress': 
        return 'bg-gradient-to-r from-blue-100 via-cyan-100 to-blue-50 text-blue-800 border border-blue-200 shadow-md animate-pulse';
      case 'todo': 
        return 'bg-gradient-to-r from-gray-100 via-slate-100 to-gray-50 text-gray-800 border border-gray-200 shadow-md';
      default: 
        return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <Flame className="h-3 w-3" />;
      case 'medium': return <Zap className="h-3 w-3" />;
      case 'low': return <Star className="h-3 w-3" />;
      default: return null;
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <Card className={`group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 transform ${
      isOverdue ? 'border-red-400 shadow-red-200 animate-pulse' : 'border-white/20'
    } glass-morphism backdrop-blur-xl animate-fade-in hover-tilt relative overflow-hidden`}>
      
      {/* Decorative gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
      
      {/* Floating particles effect */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-purple-400 rounded-full opacity-60 animate-float"></div>
      <div className="absolute top-4 right-6 w-1 h-1 bg-pink-400 rounded-full opacity-40 animate-float" style={{animationDelay: '1s'}}></div>
      
      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <Checkbox
              checked={task.status === 'completed'}
              onCheckedChange={handleStatusChange}
              className="mt-1 transition-all duration-300 hover:scale-125 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-500 data-[state=checked]:to-emerald-500"
            />
            <div className="flex-1">
              <h3 className={`font-bold text-lg transition-all duration-300 ${
                task.status === 'completed' 
                  ? 'line-through text-gray-500' 
                  : 'text-gray-800 group-hover:text-gradient text-shadow-glow'
              }`}>
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-gray-600 mt-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {task.description}
                </p>
              )}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hover:bg-white/20 transition-all duration-200 hover:scale-110 rounded-full">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-morphism border-white/20 shadow-2xl backdrop-blur-xl">
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="hover:bg-blue-50/50 transition-colors duration-200 cursor-pointer">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Task
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="max-w-md glass-morphism border-white/20">
                  <DialogHeader>
                    <DialogTitle className="text-gradient">Edit Task</DialogTitle>
                  </DialogHeader>
                  <TaskForm 
                    initialData={task} 
                    onSubmit={handleEdit} 
                  />
                </DialogContent>
              </Dialog>
              
              <DropdownMenuItem onClick={handleDelete} className="text-red-600 hover:bg-red-50/50 transition-colors duration-200 cursor-pointer">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 relative z-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-3 flex-wrap">
            <Badge className={`${getPriorityStyles(task.priority)} px-4 py-2 rounded-full font-bold transition-all duration-300 hover:scale-110 flex items-center gap-1`}>
              {getPriorityIcon(task.priority)}
              {task.priority}
            </Badge>
            <Badge className={`${getStatusStyles(task.status)} px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-110`}>
              {task.status.replace('-', ' ')}
            </Badge>
            {isOverdue && (
              <Badge className="bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 text-white px-4 py-2 rounded-full font-bold animate-bounce-slow shadow-lg shadow-red-500/30">
                ⚠️ Overdue
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            {task.dueDate && (
              <div className="flex items-center bg-gradient-to-r from-indigo-50 to-purple-50 px-3 py-2 rounded-xl border border-indigo-200 hover:shadow-md transition-all duration-200">
                <Calendar className="h-4 w-4 mr-2 text-indigo-600" />
                <span className="font-medium text-indigo-700">
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
            )}
            {task.sharedWith && task.sharedWith.length > 0 && (
              <div className="flex items-center bg-gradient-to-r from-blue-50 to-cyan-50 px-3 py-2 rounded-xl border border-blue-200 hover:shadow-md transition-all duration-200">
                <Users className="h-4 w-4 mr-2 text-blue-600" />
                <span className="font-medium text-blue-700">
                  {task.sharedWith.length}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
