'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  Home, 
  Settings, 
  BarChart3, 
  Users, 
  FileText, 
  Zap,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  className?: string
}

const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Zap, label: "AI Generator", href: "/", active: true },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: FileText, label: "Content Library", href: "/library" },
  { icon: Users, label: "Team", href: "/team" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "relative flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 transition-all duration-300 ease-in-out shadow-2xl fade-in overflow-hidden",
        isCollapsed ? "w-20" : "w-72",
        className
      )}
    >
      {/* Company Logo/Brand */}
      <div className="relative flex items-center justify-between p-6 border-b border-slate-700/50">
        <div className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <span className="text-2xl font-bold text-white tracking-tight">Taumon</span>
              <p className="text-xs text-slate-400 font-medium">AI Platform</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-slate-400 hover:text-white hover:bg-slate-700/50 p-2 rounded-lg transition-colors duration-200"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="relative flex-1 px-4 py-6 space-y-2">
        {sidebarItems.map((item, index) => (
          <Button
            key={item.label}
            variant={item.active ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start text-left font-medium group relative overflow-hidden transition-colors duration-200",
              item.active 
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg border-0" 
                : "text-slate-300 hover:text-white hover:bg-slate-700/50 border-0",
              isCollapsed ? "px-3 py-3" : "px-4 py-3",
              "rounded-xl"
            )}
          >
            {/* Active item indicator */}
            {item.active && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-400 rounded-r-full" />
            )}
            
            
            <item.icon className={cn(
              "w-5 h-5 relative z-10",
              !isCollapsed && "mr-4",
              item.active && "drop-shadow-lg"
            )} />
            
            {!isCollapsed && (
              <span className="relative z-10 font-semibold tracking-wide">
                {item.label}
              </span>
            )}
            
            {!isCollapsed && item.active && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
            )}
            
            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                {item.label}
              </div>
            )}
          </Button>
        ))}
      </nav>

      {/* User/Account Section */}
      <div className="relative p-4 border-t border-slate-700/50">
        <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-700/30 transition-colors duration-200 cursor-pointer group">
          <div className="relative w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-sm font-bold text-white">JD</span>
            {/* Online indicator */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-slate-800 rounded-full">
              <div className="w-full h-full bg-emerald-400 rounded-full"></div>
            </div>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">John Doe</p>
              <p className="text-xs text-slate-400 truncate font-medium">john@company.com</p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                <span className="text-xs text-emerald-400 font-medium">Online</span>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  )
}