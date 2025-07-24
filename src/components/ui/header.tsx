'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  Bell, 
  Search, 
  Settings, 
  User, 
  LogOut,
  ChevronDown
} from "lucide-react"
import { useState } from "react"

interface HeaderProps {
  className?: string
  title?: string
  subtitle?: string
}

export function Header({ className, title = "AI Content Generator", subtitle = "Create professional content with advanced AI tools" }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className={cn("glass-card border-b border-white/20 shadow-elegant backdrop-blur-xl", className)}>
      <div className="flex items-center justify-between px-8 py-6">
        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text">{title}</h1>
          <p className="text-base text-slate-600/80 mt-2 font-medium tracking-wide">{subtitle}</p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search anything..."
              className="pl-12 pr-6 py-3 w-72 glass-card border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/30 text-slate-700 placeholder-slate-500 font-medium backdrop-blur-sm transition-all duration-200"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative text-slate-600 hover:text-slate-900 hover-lift p-3 rounded-xl hover:bg-white/60 transition-all duration-200">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></span>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 hover-lift p-3 rounded-xl hover:bg-white/60 transition-all duration-200">
            <Settings className="w-5 h-5" />
          </Button>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 text-slate-700 hover:text-slate-900 hover-lift p-3 rounded-xl hover:bg-white/60 transition-all duration-200"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-slate-900">John Doe</p>
                <p className="text-xs text-slate-500">Premium Plan</p>
              </div>
              <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", showUserMenu && "rotate-180")} />
            </Button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-3 w-56 glass-card rounded-2xl shadow-elegant border border-white/20 py-2 z-50 backdrop-blur-xl">
                <div className="px-4 py-3 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">John Doe</p>
                      <p className="text-xs text-slate-600">john@company.com</p>
                      <span className="inline-block px-2 py-1 mt-1 text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full font-medium">Premium</span>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start px-4 py-3 text-sm hover-lift hover:bg-white/60 transition-all duration-200">
                    <User className="w-4 h-4 mr-3" />
                    Profile Settings
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start px-4 py-3 text-sm hover-lift hover:bg-white/60 transition-all duration-200">
                    <Settings className="w-4 h-4 mr-3" />
                    Account Settings
                  </Button>
                </div>
                <div className="border-t border-white/10 pt-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start px-4 py-3 text-sm text-red-600 hover:text-red-700 hover:bg-red-50/80 hover-lift transition-all duration-200">
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign Out
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}