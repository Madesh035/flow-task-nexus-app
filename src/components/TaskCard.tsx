
import { Task } from "@/pages/Dashboard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TaskForm } from "./TaskForm";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, Trash2, Calendar, Users } from "lucide-react";
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'todo': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <Card className={`transition-all hover:shadow-md ${isOverdue ? 'border-red-200' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <Checkbox
              checked={task.status === 'completed'}
              onCheckedChange={handleStatusChange}
              className="mt-1"
            />
            <div className="flex-1">
              <h3 className={`font-semibold ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
              )}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
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
              
              <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant={getPriorityColor(task.priority) as any}>
              {task.priority}
            </Badge>
            <Badge className={getStatusColor(task.status)}>
              {task.status.replace('-', ' ')}
            </Badge>
            {isOverdue && (
              <Badge variant="destructive">Overdue</Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            {task.dueDate && (
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(task.dueDate).toLocaleDateString()}
              </div>
            )}
            {task.sharedWith && task.sharedWith.length > 0 && (
              <div className="flex items-center">
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
