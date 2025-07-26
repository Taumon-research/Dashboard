'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  Home, 
  Settings, 
  BarChart3, 
  Users, 
  FileText, 
  Cone,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  className?: string
}

const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Cone, label: "Refract AI", href: "/", active: true },
  { icon: BarChart3, label: "Tools", href: "/analytics" },
  { icon: FileText, label: "Content Library", href: "/library" },
  { icon: Users, label: "Team", href: "/team" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "relative flex flex-col bg-white border-r border-gray-200 text-gray-900 transition-all duration-300 ease-in-out overflow-hidden",
        isCollapsed ? "w-16" : "w-60",
        className
      )}
    >
      {/* Company Logo/Brand */}
      <div className="relative flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center space-x-3 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Cone className="w-4 h-4 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <span className="text-lg font-medium text-gray-900">Taumon</span>
              <p className="text-xs text-gray-500">AI Platform</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded transition-colors duration-200"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="relative flex-1 px-2 py-4 space-y-1">
        {sidebarItems.map((item, index) => (
          <Button
            key={item.label}
            variant={item.active ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start text-left font-normal group relative transition-colors duration-200",
              item.active 
                ? "bg-blue-50 text-blue-600 border-0" 
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-0",
              isCollapsed ? "px-2 py-2" : "px-3 py-2",
              "rounded-md"
            )}
          >
            {/* Active item indicator */}
            {item.active && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r" />
            )}
            
            
            <item.icon className={cn(
              "w-4 h-4 relative z-10",
              !isCollapsed && "mr-3"
            )} />
            
            {!isCollapsed && (
              <span className="relative z-10 font-normal">
                {item.label}
              </span>
            )}
            
            
            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                {item.label}
              </div>
            )}
          </Button>
        ))}
      </nav>

      {/* User/Account Section */}
      <div className="relative p-3 border-t border-gray-200">
        <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 transition-colors duration-200 cursor-pointer group">
          <div className="relative w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-white">JD</span>
            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-400 border border-white rounded-full"></div>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
              <p className="text-xs text-gray-500 truncate">john@company.com</p>
              <div className="flex items-center mt-0.5">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
                <span className="text-xs text-gray-500">Online</span>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  )
}