"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Play, 
  Pause, 
  Volume2, 
  Download,
  FileVideo,
  FileAudio,
  FileImage,
  Smartphone,
  Monitor,
  Tv,
  Film,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  Linkedin,
  MessageCircle
} from "lucide-react"

interface ExportOption {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  formats: string[]
}

const EXPORT_OPTIONS: ExportOption[] = [
  {
    id: 'video',
    name: 'Video',
    icon: FileVideo,
    description: 'Export as video file',
    formats: ['MP4', 'MOV', 'AVI', 'WebM']
  },
  {
    id: 'audio',
    name: 'Audio',
    icon: FileAudio,
    description: 'Export audio track only',
    formats: ['MP3', 'WAV', 'AAC', 'FLAC']
  },
  {
    id: 'frames',
    name: 'Frame Sequence',
    icon: FileImage,
    description: 'Export as image sequence',
    formats: ['PNG', 'JPG', 'TIFF', 'EXR']
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    description: 'Optimized for Instagram formats',
    formats: ['Reel (9:16)', 'Post (1:1)', 'Story (9:16)', 'IGTV (9:16)']
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: Youtube,
    description: 'YouTube video formats',
    formats: ['Short (9:16)', 'Standard (16:9)', 'Thumbnail (16:9)']
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: MessageCircle,
    description: 'TikTok vertical videos',
    formats: ['Portrait (9:16)', 'Square (1:1)']
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    icon: Twitter,
    description: 'Twitter video formats',
    formats: ['Tweet Video (16:9)', 'Square (1:1)', 'Portrait (9:16)']
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    description: 'Facebook video formats',
    formats: ['Feed (16:9)', 'Story (9:16)', 'Square (1:1)']
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Linkedin,
    description: 'Professional LinkedIn videos',
    formats: ['Feed (16:9)', 'Square (1:1)', 'Portrait (9:16)']
  },
  {
    id: 'mobile',
    name: 'Mobile Optimized',
    icon: Smartphone,
    description: 'Optimized for mobile devices',
    formats: ['MP4 (Mobile)', 'WebM (Mobile)']
  },
  {
    id: 'web',
    name: 'Web Optimized',
    icon: Monitor,
    description: 'Optimized for web streaming',
    formats: ['MP4 (Web)', 'WebM (Web)', 'HLS']
  },
  {
    id: 'broadcast',
    name: 'Broadcast Quality',
    icon: Tv,
    description: 'Professional broadcast standards',
    formats: ['ProRes', 'DNxHD', 'MXF']
  }
]

export default function ExportContent() {
  const [selectedExportOptions, setSelectedExportOptions] = useState<string[]>([])
  const [selectedFormat, setSelectedFormat] = useState<string>('')
  const [isPlaying, setIsPlaying] = useState(false)

  const toggleExportOption = (optionId: string) => {
    setSelectedExportOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    )
    // Reset format selection when changing export options
    setSelectedFormat('')
  }

  const getAvailableFormats = () => {
    if (selectedExportOptions.length === 0) return []
    
    // Get formats from all selected export options
    const allFormats = selectedExportOptions.flatMap(optionId => {
      const option = EXPORT_OPTIONS.find(opt => opt.id === optionId)
      return option ? option.formats : []
    })
    
    // Remove duplicates
    return [...new Set(allFormats)]
  }

  const handleExport = () => {
    if (selectedExportOptions.length === 0 || !selectedFormat) {
      alert('Please select export options and format')
      return
    }
    
    // TODO: Implement actual export functionality
    console.log('Exporting with options:', selectedExportOptions, 'format:', selectedFormat)
    alert(`Exporting as ${selectedFormat}...`)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Export Content</CardTitle>
        <p className="text-gray-600">Preview your generated video and select export options</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Video Preview */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="text-lg">Generated Video Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
              <div className="text-white text-center">
                <Film className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Final Generated Video</p>
                <p className="text-sm opacity-75">Your complete timeline preview</p>
              </div>
              
              {/* Video Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4">
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="bg-black/50 hover:bg-black/70"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <div className="flex-1 bg-white/20 rounded-full h-1">
                  <div className="bg-white rounded-full h-1 w-1/3"></div>
                </div>
                <Button size="sm" variant="secondary" className="bg-black/50 hover:bg-black/70">
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Export Options */}
        <div>
          <label className="block text-sm font-medium mb-3">Export Options</label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXPORT_OPTIONS.map((option) => {
              const Icon = option.icon
              const isSelected = selectedExportOptions.includes(option.id)
              
              return (
                <Card 
                  key={option.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'border-green-500 bg-green-50 shadow-md' 
                      : 'border-gray-200 hover:border-green-300 hover:shadow-sm'
                  }`}
                  onClick={() => toggleExportOption(option.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${
                        isSelected ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <Icon className={`h-5 w-5 ${
                          isSelected ? 'text-green-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{option.name}</h3>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {option.formats.slice(0, 3).map((format) => (
                        <span 
                          key={format}
                          className={`px-2 py-1 text-xs rounded ${
                            isSelected 
                              ? 'bg-green-200 text-green-800' 
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {format}
                        </span>
                      ))}
                      {option.formats.length > 3 && (
                        <span className="px-2 py-1 text-xs rounded bg-gray-200 text-gray-600">
                          +{option.formats.length - 3}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Format Selection */}
        {selectedExportOptions.length > 0 && (
          <div>
            <label className="block text-sm font-medium mb-3">Export Format</label>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {getAvailableFormats().map((format) => (
                <Button
                  key={format}
                  variant={selectedFormat === format ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFormat(format)}
                  className={`${
                    selectedFormat === format
                      ? "bg-green-600 hover:bg-green-700"
                      : "hover:border-green-400 hover:text-green-600"
                  }`}
                >
                  {format}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Export Button */}
        {selectedExportOptions.length > 0 && selectedFormat && (
          <div className="flex justify-end pt-4 border-t">
            <Button
              onClick={handleExport}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold"
            >
              <Download className="h-5 w-5 mr-2" />
              Export as {selectedFormat}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}