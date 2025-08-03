"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X, Plus, Link2, ChevronLeft, ChevronRight, Clock, Camera, FileText, ArrowRight } from "lucide-react"

interface Shot {
  id: string
  description: string
  referencedContent: string
  transitionPrompt: string
  duration?: number
  intensity?: 'low' | 'medium' | 'high'
}

interface TimelineBlockProps {
  shot: Shot
  index: number
  isFirst: boolean
  isLast: boolean
  onUpdate: (id: string, field: keyof Shot, value: string | number) => void
  onRemove: (id: string) => void
  onMove: (id: string, direction: 'left' | 'right') => void
  disabled: boolean
}

function TimelineBlock({ shot, index, isFirst, isLast, onUpdate, onRemove, onMove, disabled }: TimelineBlockProps) {
  const getBlockWidth = () => {
    const baseWidth = 350
    const contentLength = shot.description.length + shot.transitionPrompt.length
    return Math.min(Math.max(baseWidth, contentLength * 2), 600)
  }

  const getIntensityColor = (intensity?: string) => {
    switch (intensity) {
      case 'high': return 'border-red-500 bg-red-50'
      case 'medium': return 'border-orange-500 bg-orange-50'
      case 'low': return 'border-green-500 bg-green-50'
      default: return 'border-indigo-500 bg-indigo-50'
    }
  }

  return (
    <div className="relative flex items-center">
      <Card 
        className={`border-l-4 ${getIntensityColor(shot.intensity)} transition-all duration-300 shadow-lg hover:shadow-xl flex-shrink-0`}
        style={{ width: `${getBlockWidth()}px` }}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center">
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                {index + 1}
              </div>
              <div className="flex flex-col">
                <span>Scene {index + 1}</span>
                {shot.duration && (
                  <span className="text-xs text-gray-500 flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    {shot.duration}s
                  </span>
                )}
              </div>
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMove(shot.id, 'left')}
                disabled={isFirst}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMove(shot.id, 'right')}
                disabled={isLast}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(shot.id)}
                className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                disabled={disabled}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center">
              <Camera className="h-4 w-4 mr-1" />
              Scene Description
            </label>
            <textarea
              value={shot.description}
              onChange={(e) => onUpdate(shot.id, 'description', e.target.value)}
              placeholder="Describe this scene in detail..."
              className="w-full h-24 p-3 border border-gray-300 rounded-md resize-y focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-2">Duration (s)</label>
              <Input
                type="number"
                value={shot.duration || ''}
                onChange={(e) => onUpdate(shot.id, 'duration', parseInt(e.target.value) || 0)}
                placeholder="5"
                className="w-full text-sm"
                min="1"
                max="300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Intensity</label>
              <select
                value={shot.intensity || ''}
                onChange={(e) => onUpdate(shot.id, 'intensity', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select...</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center">
              <Link2 className="h-4 w-4 mr-1" />
              Referenced Content
            </label>
            <Input
              value={shot.referencedContent}
              onChange={(e) => onUpdate(shot.id, 'referencedContent', e.target.value)}
              placeholder="Asset reference, OBJ link, or resource URL"
              className="w-full text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center">
              <FileText className="h-4 w-4 mr-1" />
              Transition Prompting
            </label>
            <textarea
              value={shot.transitionPrompt}
              onChange={(e) => onUpdate(shot.id, 'transitionPrompt', e.target.value)}
              placeholder="How should this scene transition to the next one?"
              className="w-full h-20 p-3 border border-gray-300 rounded-md resize-y focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
          </div>
        </CardContent>
      </Card>
      
      {!isLast && (
        <div className="flex items-center mx-4">
          <div className="h-0.5 w-8 bg-gradient-to-r from-indigo-400 to-indigo-600"></div>
          <ArrowRight className="h-5 w-5 text-indigo-600 mx-1" />
          <div className="h-0.5 w-8 bg-gradient-to-r from-indigo-600 to-indigo-400"></div>
        </div>
      )}
    </div>
  )
}

export default function Shots() {
  const [shots, setShots] = useState<Shot[]>([
    {
      id: "1",
      description: "",
      referencedContent: "",
      transitionPrompt: "",
      duration: 5,
      intensity: 'medium'
    }
  ])
  const [scrollPosition, setScrollPosition] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  const addShot = () => {
    const newShot: Shot = {
      id: Date.now().toString(),
      description: "",
      referencedContent: "",
      transitionPrompt: "",
      duration: 5,
      intensity: 'medium'
    }
    setShots(prev => [...prev, newShot])
    
    setTimeout(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollTo({
          left: carouselRef.current.scrollWidth,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  const updateShot = (id: string, field: keyof Shot, value: string | number) => {
    setShots(prev =>
      prev.map(shot => 
        shot.id === id ? { ...shot, [field]: value } : shot
      )
    )
  }

  const removeShot = (id: string) => {
    setShots(prev => prev.filter(shot => shot.id !== id))
  }

  const moveShot = (id: string, direction: 'left' | 'right') => {
    setShots(prev => {
      const index = prev.findIndex(shot => shot.id === id)
      if (
        (direction === 'left' && index === 0) ||
        (direction === 'right' && index === prev.length - 1)
      ) {
        return prev
      }

      const newShots = [...prev]
      const targetIndex = direction === 'left' ? index - 1 : index + 1
      
      newShots[index], newShots[targetIndex] = newShots[targetIndex], newShots[index]
      
      return newShots
    })
  }

  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    updateScrollButtons()
  }, [shots])

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 500
      const newScrollPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount
      
      carouselRef.current.scrollTo({ left: newScrollPosition, behavior: 'smooth' })
      setScrollPosition(newScrollPosition)
      
      setTimeout(updateScrollButtons, 300)
    }
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    setScrollPosition(container.scrollLeft)
    updateScrollButtons()
  }

  const getTotalDuration = () => {
    return shots.reduce((total, shot) => total + (shot.duration || 0), 0)
  }

  const getIntensityStats = () => {
    const stats = { low: 0, medium: 0, high: 0 }
    shots.forEach(shot => {
      if (shot.intensity) stats[shot.intensity]++
    })
    return stats
  }

  const intensityStats = getIntensityStats()

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <Camera className="h-7 w-7 mr-2 text-indigo-600" />
          Comprehensive Timeline
        </CardTitle>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            Total: {getTotalDuration()}s
          </span>
          <span>{shots.length} scenes</span>
          <div className="flex gap-2">
            {intensityStats.high > 0 && (
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                High: {intensityStats.high}
              </span>
            )}
            {intensityStats.medium > 0 && (
              <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                Medium: {intensityStats.medium}
              </span>
            )}
            {intensityStats.low > 0 && (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                Low: {intensityStats.low}
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="flex-shrink-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1 text-center">
              <div className="h-1 bg-gray-200 rounded-full">
                <div 
                  className="h-1 bg-indigo-600 rounded-full transition-all duration-300"
                  style={{ 
                    width: shots.length > 0 ? `${Math.max(10, (scrollPosition / (carouselRef.current?.scrollWidth || 1)) * 100)}%` : '10%' 
                  }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 mt-1 block">Timeline Navigation</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="flex-shrink-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div 
            ref={carouselRef}
            className="flex items-center overflow-x-auto scrollbar-hide pb-6"
            onScroll={handleScroll}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {shots.map((shot, index) => (
              <TimelineBlock
                key={shot.id}
                shot={shot}
                index={index}
                isFirst={index === 0}
                isLast={index === shots.length - 1}
                onUpdate={updateShot}
                onRemove={removeShot}
                onMove={moveShot}
                disabled={shots.length === 1}
              />
            ))}
            
            <Card className="min-w-[250px] flex-shrink-0 border-dashed border-2 border-gray-300 flex items-center justify-center ml-6 hover:border-indigo-400 transition-colors">
              <Button 
                onClick={addShot}
                variant="ghost"
                className="h-32 w-full text-gray-600 hover:text-indigo-600"
              >
                <div className="text-center">
                  <Plus className="h-8 w-8 mx-auto mb-2" />
                  <span className="font-medium">Add New Scene</span>
                  <p className="text-xs text-gray-500 mt-1">Expand your timeline</p>
                </div>
              </Button>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}