
import { TaskFilter } from "@/pages/Dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";

interface TaskFiltersProps {
  filters: TaskFilter;
  onFiltersChange: (filters: TaskFilter) => void;
}

export const TaskFilters = ({ filters, onFiltersChange }: TaskFiltersProps) => {
  const updateFilter = (key: keyof TaskFilter, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value === 'all' ? 'all' : value,
    });
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          <Filter className="mr-2 h-5 w-5 text-blue-600" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="status-filter" className="text-sm font-medium text-gray-700">Status</Label>
          <Select value={filters.status || 'all'} onValueChange={(value) => updateFilter('status', value)}>
            <SelectTrigger className="bg-white border-gray-200 hover:border-blue-300 transition-colors duration-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white/95 backdrop-blur-sm border-gray-200 shadow-xl">
              <SelectItem value="all" className="hover:bg-blue-50">All Status</SelectItem>
              <SelectItem value="todo" className="hover:bg-gray-50">To Do</SelectItem>
              <SelectItem value="in-progress" className="hover:bg-blue-50">In Progress</SelectItem>
              <SelectItem value="completed" className="hover:bg-green-50">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority-filter" className="text-sm font-medium text-gray-700">Priority</Label>
          <Select value={filters.priority || 'all'} onValueChange={(value) => updateFilter('priority', value)}>
            <SelectTrigger className="bg-white border-gray-200 hover:border-blue-300 transition-colors duration-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white/95 backdrop-blur-sm border-gray-200 shadow-xl">
              <SelectItem value="all" className="hover:bg-blue-50">All Priorities</SelectItem>
              <SelectItem value="high" className="hover:bg-red-50">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  High
                </span>
              </SelectItem>
              <SelectItem value="medium" className="hover:bg-yellow-50">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  Medium
                </span>
              </SelectItem>
              <SelectItem value="low" className="hover:bg-green-50">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Low
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="due-filter" className="text-sm font-medium text-gray-700">Due Date</Label>
          <Select value={filters.dueFilter || 'all'} onValueChange={(value) => updateFilter('dueFilter', value)}>
            <SelectTrigger className="bg-white border-gray-200 hover:border-blue-300 transition-colors duration-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white/95 backdrop-blur-sm border-gray-200 shadow-xl">
              <SelectItem value="all" className="hover:bg-blue-50">All Tasks</SelectItem>
              <SelectItem value="today" className="hover:bg-blue-50">Due Today</SelectItem>
              <SelectItem value="overdue" className="hover:bg-red-50">Overdue</SelectItem>
              <SelectItem value="upcoming" className="hover:bg-green-50">Upcoming</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
