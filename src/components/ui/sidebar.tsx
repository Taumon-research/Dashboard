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
        "relative flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 transition-all duration-500 ease-in-out shadow-2xl",
        isCollapsed ? "w-20" : "w-72",
        className
      )}
    >
      {/* Company Logo/Brand */}
      <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg hover-lift">
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
          className="text-slate-400 hover:text-white hover:bg-slate-700/50 p-2 rounded-lg hover-lift transition-all duration-200"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {sidebarItems.map((item, index) => (
          <Button
            key={item.label}
            variant={item.active ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start text-left font-medium group relative overflow-hidden transition-all duration-300 hover-lift",
              item.active 
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl border-0" 
                : "text-slate-300 hover:text-white hover:bg-slate-700/50 border-0",
              isCollapsed ? "px-3 py-3" : "px-4 py-3",
              "rounded-xl"
            )}
            style={{
              animationDelay: `${index * 50}ms`
            }}
          >
            {item.active && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-xl blur-xl" />
            )}
            <item.icon className={cn("w-5 h-5 relative z-10", !isCollapsed && "mr-4")} />
            {!isCollapsed && (
              <span className="relative z-10 font-semibold tracking-wide">{item.label}</span>
            )}
            {!isCollapsed && item.active && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-pulse" />
            )}
          </Button>
        ))}
      </nav>

      {/* User/Account Section */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="flex items-center space-x-3 hover-lift p-3 rounded-xl hover:bg-slate-700/30 transition-all duration-200 cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-sm font-bold text-white">JD</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">John Doe</p>
              <p className="text-xs text-slate-400 truncate font-medium">john@company.com</p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-xs text-emerald-400 font-medium">Online</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}