
import { Task } from "@/pages/Dashboard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TaskForm } from "./TaskForm";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, Trash2, Calendar, Users, MoreVertical } from "lucide-react";
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
        return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
      case 'medium': 
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      case 'low': 
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      default: 
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'completed': 
        return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200';
      case 'in-progress': 
        return 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border border-blue-200';
      case 'todo': 
        return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200';
      default: 
        return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200';
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <Card className={`transition-all duration-300 hover:shadow-xl hover:-translate-y-1 transform ${
      isOverdue ? 'border-red-300 shadow-red-100' : 'border-gray-200'
    } bg-white/80 backdrop-blur-sm animate-fade-in`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <Checkbox
              checked={task.status === 'completed'}
              onCheckedChange={handleStatusChange}
              className="mt-1 transition-all duration-200 hover:scale-110"
            />
            <div className="flex-1">
              <h3 className={`font-semibold text-lg transition-all duration-300 ${
                task.status === 'completed' 
                  ? 'line-through text-gray-500' 
                  : 'text-gray-800 hover:text-blue-600'
              }`}>
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{task.description}</p>
              )}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hover:bg-gray-100 transition-colors duration-200">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border-gray-200 shadow-xl">
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="hover:bg-blue-50 transition-colors duration-200">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Task
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                  </DialogHeader>
                  <TaskForm 
                    initialData={task} 
                    onSubmit={handleEdit} 
                  />
                </DialogContent>
              </Dialog>
              
              <DropdownMenuItem onClick={handleDelete} className="text-red-600 hover:bg-red-50 transition-colors duration-200">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center space-x-2 flex-wrap">
            <Badge className={`${getPriorityStyles(task.priority)} px-3 py-1 rounded-full font-medium transition-all duration-200 hover:scale-105`}>
              {task.priority}
            </Badge>
            <Badge className={`${getStatusStyles(task.status)} px-3 py-1 rounded-full font-medium transition-all duration-200 hover:scale-105`}>
              {task.status.replace('-', ' ')}
            </Badge>
            {isOverdue && (
              <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full font-medium animate-pulse">
                Overdue
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-3 text-sm text-gray-500">
            {task.dueDate && (
              <div className="flex items-center bg-gray-50 px-2 py-1 rounded-lg">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(task.dueDate).toLocaleDateString()}
              </div>
            )}
            {task.sharedWith && task.sharedWith.length > 0 && (
              <div className="flex items-center bg-blue-50 px-2 py-1 rounded-lg">
                <Users className="h-3 w-3 mr-1" />
                {task.sharedWith.length}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
