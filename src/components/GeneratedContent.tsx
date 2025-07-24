"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Play, 
  Pause, 
  Volume2, 
  Settings, 
  Wand2, 
  Palette, 
  Music, 
  Film,
  Download,
  Share2
} from "lucide-react"

interface VideoBlock {
  id: string
  textInput: string
  parameters: {
    quality: string
    duration: string
    style: string
    mood: string
  }
  selectedTools: string[]
}

const AVAILABLE_TOOLS = [
  { id: 'enhance', name: 'Enhance', icon: Wand2 },
  { id: 'style', name: 'Style', icon: Palette },
  { id: 'audio', name: 'Audio', icon: Music },
  { id: 'effects', name: 'Effects', icon: Film },
  { id: 'export', name: 'Export', icon: Download },
  { id: 'share', name: 'Share', icon: Share2 }
]

export default function GeneratedContent() {
  const [videoBlocks, setVideoBlocks] = useState<VideoBlock[]>([
    {
      id: "1",
      textInput: "",
      parameters: {
        quality: "HD",
        duration: "30s",
        style: "cinematic",
        mood: "neutral"
      },
      selectedTools: []
    },
    {
      id: "2", 
      textInput: "",
      parameters: {
        quality: "4K",
        duration: "60s", 
        style: "documentary",
        mood: "upbeat"
      },
      selectedTools: []
    }
  ])

  const updateVideoBlock = (id: string, field: string, value: any) => {
    setVideoBlocks(prev =>
      prev.map(block =>
        block.id === id 
          ? { ...block, [field]: value }
          : block
      )
    )
  }

  const updateParameter = (id: string, parameter: string, value: string) => {
    setVideoBlocks(prev =>
      prev.map(block =>
        block.id === id
          ? { 
              ...block, 
              parameters: { ...block.parameters, [parameter]: value }
            }
          : block
      )
    )
  }

  const toggleTool = (blockId: string, toolId: string) => {
    setVideoBlocks(prev =>
      prev.map(block =>
        block.id === blockId
          ? {
              ...block,
              selectedTools: block.selectedTools.includes(toolId)
                ? block.selectedTools.filter(t => t !== toolId)
                : [...block.selectedTools, toolId]
            }
          : block
      )
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Generated Content</CardTitle>
        <p className="text-gray-600">Video blocks with parameters and toolset</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {videoBlocks.map((block, index) => (
          <Card key={block.id} className="border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="text-lg">Video Block {index + 1}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Video Preview */}
              <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
                <div className="text-white text-center">
                  <Film className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Generated Video</p>
                  <p className="text-sm opacity-75">Preview will appear here</p>
                </div>
                
                {/* Video Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4">
                  <Button size="sm" variant="secondary" className="bg-black/50 hover:bg-black/70">
                    <Play className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 bg-white/20 rounded-full h-1">
                    <div className="bg-white rounded-full h-1 w-1/3"></div>
                  </div>
                  <Button size="sm" variant="secondary" className="bg-black/50 hover:bg-black/70">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Text Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Text Input</label>
                <Input
                  value={block.textInput}
                  onChange={(e) => updateVideoBlock(block.id, 'textInput', e.target.value)}
                  placeholder="Enter text for video generation..."
                  className="w-full"
                />
              </div>

              {/* Parameters */}
              <div>
                <label className="block text-sm font-medium mb-3">Parameters</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1">Quality</label>
                    <select
                      value={block.parameters.quality}
                      onChange={(e) => updateParameter(block.id, 'quality', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="SD">SD</option>
                      <option value="HD">HD</option>
                      <option value="4K">4K</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium mb-1">Duration</label>
                    <select
                      value={block.parameters.duration}
                      onChange={(e) => updateParameter(block.id, 'duration', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="15s">15s</option>
                      <option value="30s">30s</option>
                      <option value="60s">60s</option>
                      <option value="120s">120s</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium mb-1">Style</label>
                    <select
                      value={block.parameters.style}
                      onChange={(e) => updateParameter(block.id, 'style', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="cinematic">Cinematic</option>
                      <option value="documentary">Documentary</option>
                      <option value="animated">Animated</option>
                      <option value="realistic">Realistic</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium mb-1">Mood</label>
                    <select
                      value={block.parameters.mood}
                      onChange={(e) => updateParameter(block.id, 'mood', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="neutral">Neutral</option>
                      <option value="upbeat">Upbeat</option>
                      <option value="dramatic">Dramatic</option>
                      <option value="calm">Calm</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Toolset */}
              <div>
                <label className="block text-sm font-medium mb-3">Toolset</label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_TOOLS.map((tool) => {
                    const Icon = tool.icon
                    const isSelected = block.selectedTools.includes(tool.id)
                    
                    return (
                      <Button
                        key={tool.id}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleTool(block.id, tool.id)}
                        className={`flex items-center gap-2 ${
                          isSelected 
                            ? "bg-indigo-600 hover:bg-indigo-700" 
                            : "hover:border-indigo-400 hover:text-indigo-600"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {tool.name}
                      </Button>
                    )
                  })}
                  <Button variant="outline" size="sm" className="border-dashed">
                    <Settings className="h-4 w-4 mr-2" />
                    More...
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}