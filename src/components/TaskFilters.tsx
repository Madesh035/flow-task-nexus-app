
import { TaskFilter } from "@/pages/Dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Filter, Sparkles } from "lucide-react";

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
    <Card className="glass-morphism border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover-lift backdrop-blur-xl relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-400/20 to-transparent rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-pink-400/20 to-transparent rounded-tr-full"></div>
      
      <CardHeader className="pb-4 relative z-10">
        <CardTitle className="text-xl flex items-center text-gradient font-bold">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 animate-float">
            <Filter className="h-4 w-4 text-white" />
          </div>
          Smart Filters
          <Sparkles className="ml-2 h-5 w-5 text-purple-500 animate-bounce-slow" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 relative z-10">
        <div className="space-y-3 group">
          <Label htmlFor="status-filter" className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2 animate-pulse"></div>
            Status
          </Label>
          <Select value={filters.status || 'all'} onValueChange={(value) => updateFilter('status', value)}>
            <SelectTrigger className="glass-morphism border-white/20 hover:border-purple-300 transition-all duration-300 hover:shadow-lg backdrop-blur-sm text-gray-700 font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-morphism border-white/20 shadow-2xl backdrop-blur-xl">
              <SelectItem value="all" className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200 cursor-pointer">
                🌟 All Status
              </SelectItem>
              <SelectItem value="todo" className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 transition-all duration-200 cursor-pointer">
                📋 To Do
              </SelectItem>
              <SelectItem value="in-progress" className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all duration-200 cursor-pointer">
                ⚡ In Progress
              </SelectItem>
              <SelectItem value="completed" className="hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 cursor-pointer">
                ✅ Completed
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3 group">
          <Label htmlFor="priority-filter" className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center">
            <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mr-2 animate-pulse" style={{animationDelay: '0.5s'}}></div>
            Priority
          </Label>
          <Select value={filters.priority || 'all'} onValueChange={(value) => updateFilter('priority', value)}>
            <SelectTrigger className="glass-morphism border-white/20 hover:border-purple-300 transition-all duration-300 hover:shadow-lg backdrop-blur-sm text-gray-700 font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-morphism border-white/20 shadow-2xl backdrop-blur-xl">
              <SelectItem value="all" className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200 cursor-pointer">
                🎯 All Priorities
              </SelectItem>
              <SelectItem value="high" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-200 cursor-pointer">
                <span className="flex items-center font-semibold text-red-600">
                  🔥 <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mr-2 ml-1 animate-glow"></div>
                  High
                </span>
              </SelectItem>
              <SelectItem value="medium" className="hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 transition-all duration-200 cursor-pointer">
                <span className="flex items-center font-semibold text-orange-600">
                  ⚡ <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mr-2 ml-1"></div>
                  Medium
                </span>
              </SelectItem>
              <SelectItem value="low" className="hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 cursor-pointer">
                <span className="flex items-center font-semibold text-green-600">
                  🌟 <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-2 ml-1"></div>
                  Low
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3 group">
          <Label htmlFor="due-filter" className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center">
            <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-2 animate-pulse" style={{animationDelay: '1s'}}></div>
            Due Date
          </Label>
          <Select value={filters.dueFilter || 'all'} onValueChange={(value) => updateFilter('dueFilter', value)}>
            <SelectTrigger className="glass-morphism border-white/20 hover:border-purple-300 transition-all duration-300 hover:shadow-lg backdrop-blur-sm text-gray-700 font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-morphism border-white/20 shadow-2xl backdrop-blur-xl">
              <SelectItem value="all" className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200 cursor-pointer">
                📅 All Tasks
              </SelectItem>
              <SelectItem value="today" className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all duration-200 cursor-pointer">
                🎯 Due Today
              </SelectItem>
              <SelectItem value="overdue" className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-200 cursor-pointer">
                ⚠️ Overdue
              </SelectItem>
              <SelectItem value="upcoming" className="hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 cursor-pointer">
                🚀 Upcoming
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
