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

export function Header({ className, title = "Refract AI", subtitle = "Comprehensive Advertisement Generator" }: HeaderProps) {

  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className={cn("bg-white border-b border-gray-200", className)}>
      <div className="flex items-center justify-between px-6 py-4">
        {/* Page Title */}
        <div>
          <h1 className="text-xl font-medium text-gray-900">{title}</h1>
          <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          {/*<div className="relative hidden md:block group">*/}
          {/*  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 transition-colors duration-200 group-focus-within:text-blue-600" />*/}
          {/*  <input*/}
          {/*    type="text"*/}
          {/*    placeholder="Search anything..."*/}
          {/*    className="pl-10 pr-4 py-2 w-56 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:w-64"*/}
          {/*  />*/}
          {/*</div>*/}

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
            <Settings className="w-4 h-4" />
          </Button>

          {/* User Menu */}
          <div className="relative group">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              {/*<div className="hidden md:block text-left">*/}
              {/*  <p className="text-sm font-medium text-gray-900">John Doe</p>*/}
              {/*  <p className="text-xs text-gray-500">Premium Plan</p>*/}
              {/*</div>*/}
              <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", showUserMenu && "rotate-180")} />
            </Button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">John Doe</p>
                      <p className="text-xs text-gray-600">john@company.com</p>
                      <span className="inline-block px-2 py-0.5 mt-1 text-xs bg-blue-50 text-blue-700 rounded font-medium">Premium</span>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200">
                    <User className="w-4 h-4 mr-2" />
                    Profile Settings
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200">
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </Button>
                </div>
                <div className="border-t border-gray-100 pt-1">
                  <Button variant="ghost" size="sm" className="w-full justify-start px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200">
                    <LogOut className="w-4 h-4 mr-2" />
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