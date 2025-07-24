"use client"

import { Sparkles } from "lucide-react"
import MetaPrompt from "@/components/MetaPrompt"
import Shots from "@/components/Shots"
import GeneratedContent from "@/components/GeneratedContent"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <Sparkles className="h-8 w-8 text-indigo-600 mr-2" />
            <h1 className="text-4xl font-bold text-gray-900">Taumon Dashboard</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create compelling video content with AI-powered prompting, scene management, and generation tools.
          </p>
        </div>

        <div className="space-y-8">
          <MetaPrompt />
          <Shots />
          <GeneratedContent />
        </div>
      </div>
    </div>
  )
}