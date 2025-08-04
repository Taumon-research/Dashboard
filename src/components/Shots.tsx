"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Plus, Link2, Camera, ArrowRight, Settings, CheckCircle, Search, ChevronLeft, ChevronRight } from "lucide-react"

interface Shot {
  id: string
  coverImage: string
  references: string[]
  selected?: boolean
}

interface TimelineBlockProps {
  shot: Shot
  index: number
  isLast: boolean
  onUpdate: (id: string, field: keyof Shot, value: string | boolean | string[]) => void
  onRemove: (id: string) => void
  onSelect: (id: string) => void
  onToolset: (id: string) => void
  disabled: boolean
}

function TimelineBlock({ shot, index, isLast, onUpdate, onRemove, onSelect, onToolset, disabled }: TimelineBlockProps) {
  const getBlockWidth = () => {
    const baseWidth = 280
    const contentLength = shot.references.length * 15
    return Math.min(Math.max(baseWidth, baseWidth + contentLength), 400)
  }

  const getSelectionStyle = (selected?: boolean) => {
    return selected 
      ? 'border-l-green-500 bg-green-50 ring-2 ring-green-200' 
      : 'border-l-indigo-500 bg-indigo-50 hover:bg-indigo-100'
  }

  return (
    <div className="relative flex items-center">
      <Card 
        className={`border-l-4 ${getSelectionStyle(shot.selected)} transition-all duration-300 shadow-lg hover:shadow-xl flex-shrink-0`}
        style={{ width: `${getBlockWidth()}px` }}
      >
        <CardHeader className="pb-3">
          <div className="space-y-2">
            <CardTitle className="text-lg flex items-center">
              <div className={`w-8 h-8 ${shot.selected ? 'bg-green-600' : 'bg-indigo-600'} text-white rounded-full flex items-center justify-center text-sm font-bold mr-3`}>
                {shot.selected ? <CheckCircle className="h-4 w-4" /> : index + 1}
              </div>
              <div className="flex flex-col">
                <span>Scene {index + 1}</span>
                <span className="text-xs text-gray-500">
                  {shot.references.length} reference{shot.references.length !== 1 ? 's' : ''}
                </span>
              </div>
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button
                variant={shot.selected ? "default" : "ghost"}
                size="sm"
                onClick={() => onSelect(shot.id)}
                className="h-7 px-3 text-xs"
              >
                {shot.selected ? 'Selected' : 'Select'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToolset(shot.id)}
                className="h-7 w-7 p-0"
                title="Toolset"
              >
                <Settings className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(shot.id)}
                className="text-red-500 hover:text-red-700 h-7 w-7 p-0"
                disabled={disabled}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <div className="relative group">
              <div className="w-full h-28 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                {shot.coverImage ? (
                  <img 
                    src={shot.coverImage} 
                    alt={`Scene ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      const nextEl = e.currentTarget.nextElementSibling as HTMLElement
                      if (nextEl) nextEl.style.display = 'flex'
                    }}
                  />
                ) : (
                  <div className="text-center">
                    <Camera className="h-6 w-6 mx-auto mb-1 text-gray-400" />
                    <span className="text-xs text-gray-500">Add image</span>
                  </div>
                )}
                {shot.coverImage && (
                  <div className="hidden absolute inset-0 items-center justify-center bg-gray-200 rounded-lg">
                    <Camera className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
              <input 
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const url = URL.createObjectURL(file)
                    onUpdate(shot.id, 'coverImage', url)
                  }
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center justify-between">
              <span className="flex items-center">
                <Link2 className="h-4 w-4 mr-1" />
                References
              </span>
              <button
                onClick={() => {
                  const newRef = `ref-${Date.now()}`
                  onUpdate(shot.id, 'references' as keyof Shot, [...shot.references, newRef] as string[])
                }}
                className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add
              </button>
            </label>
            <div className="flex flex-wrap gap-2">
              {shot.references.map((ref, refIndex) => (
                <div key={refIndex} className="flex items-center bg-indigo-100 border border-indigo-200 rounded-full px-3 py-1 text-xs">
                  <span className="text-indigo-800 max-w-20 truncate">{ref}</span>
                  <button
                    onClick={() => {
                      const newRefs = shot.references.filter((_, i) => i !== refIndex)
                      onUpdate(shot.id, 'references' as keyof Shot, newRefs as string[])
                    }}
                    className="ml-2 text-indigo-600 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {shot.references.length === 0 && (
                <div className="text-xs text-gray-500 py-1">No references</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {!isLast && (
        <div className="flex items-center mx-1">
          <div className="h-0.5 w-3 bg-gradient-to-r from-indigo-400 to-indigo-600"></div>
          <ArrowRight className="h-3 w-3 text-indigo-600 mx-0.5" />
          <div className="h-0.5 w-3 bg-gradient-to-r from-indigo-600 to-indigo-400"></div>
        </div>
      )}
    </div>
  )
}

export default function Shots() {
  const [isVisible, setIsVisible] = useState(false)
  // Available cover images from public directory
  const availableCoverImages = [
    "/image1.jpg",
    "/image2.jpg", 
    "/image3.jpg",
    "/image4.jpg"
  ]

  const [shots, setShots] = useState<Shot[]>([
    {
      id: "1",
      coverImage: availableCoverImages[0],
      references: [],
      selected: false
    },
    {
      id: "2",
      coverImage: availableCoverImages[1],
      references: [],
      selected: false
    },
    {
      id: "3",
      coverImage: availableCoverImages[2],
      references: [],
      selected: false
    },
    {
      id: "4",
      coverImage: availableCoverImages[3],
      references: [],
      selected: false
    }
  ])
  const [scrollPosition, setScrollPosition] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  const addShot = () => {
    const newShot: Shot = {
      id: Date.now().toString(),
      // Cycle through available images based on shot count
      coverImage: availableCoverImages[shots.length % availableCoverImages.length],
      references: [],
      selected: false
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

  const updateShot = (id: string, field: keyof Shot, value: string | boolean | string[]) => {
    setShots(prev =>
      prev.map(shot => 
        shot.id === id ? { ...shot, [field]: value } : shot
      )
    )
  }

  const selectShot = (id: string) => {
    setShots(prev =>
      prev.map(shot => 
        shot.id === id ? { ...shot, selected: !shot.selected } : shot
      )
    )
  }

  const handleToolset = (id: string) => {
    console.log('Toolset clicked for shot:', id)
    // TODO: Implement toolset functionality
  }

  const removeShot = (id: string) => {
    setShots(prev => prev.filter(shot => shot.id !== id))
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

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

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

  const getSelectedCount = () => {
    return shots.filter(shot => shot.selected).length
  }

  const getTotalReferences = () => {
    return shots.reduce((total, shot) => total + shot.references.length, 0)
  }

  const handleQueryGo = () => {
    if (!query.trim()) return
    
    setIsProcessing(true)
    
    setTimeout(() => {
      // Update selected shots or all shots if none selected
      const selectedShots = shots.filter(shot => shot.selected)
      const shouldUpdateAll = selectedShots.length === 0
      
      const updatedShots = shots.map(shot => {
        if (shouldUpdateAll || shot.selected) {
          return { ...shot, description: query }
        }
        return shot
      })
      
      setShots(updatedShots)
      
      // Clear the query
      setQuery('')
      setIsProcessing(false)
    }, 2000)
  }

  const selectedCount = getSelectedCount()
  const totalRefs = getTotalReferences()
  const [query, setQuery] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <Camera className="h-7 w-7 mr-2 text-indigo-600" />
          Comprehensive Timeline
        </CardTitle>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <span>{shots.length} scenes</span>
          <span className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
            {selectedCount} selected
          </span>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs flex items-center">
              <Link2 className="h-3 w-3 mr-1" />
              {totalRefs} refs
            </span>
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
            className="flex items-center overflow-x-auto scrollbar-hide pb-4 gap-1"
            onScroll={handleScroll}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {shots.map((shot, index) => (
              <div
                key={shot.id}
                className={`transition-all duration-500 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <TimelineBlock
                  shot={shot}
                  index={index}
                  isLast={index === shots.length - 1}
                  onUpdate={updateShot}
                  onRemove={removeShot}
                  onSelect={selectShot}
                  onToolset={handleToolset}
                  disabled={shots.length === 1}
                />
              </div>
            ))}
            
            <Card className="min-w-[200px] flex-shrink-0 border-dashed border-2 border-gray-300 flex items-center justify-center hover:border-indigo-400 transition-colors">
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
        
        {/* Processing State */}
        {isProcessing && (
          <div className="mt-8 flex items-center justify-center h-32 bg-white border-2 border-dashed border-gray-300 rounded-lg">
            <img 
              src="/spinning-logo.gif" 
              alt="Processing..." 
              className="w-12 h-12"
            />
            <span className="ml-3 text-sm text-gray-600">Processing query...</span>
          </div>
        )}

        {/* Query/Prompt Component */}
        {!isProcessing && (
          <div className="mt-8 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <div className="flex items-center gap-3 mb-4">
            <Search className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Query & Prompt</h3>
            {selectedCount > 0 && (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                {selectedCount} scene{selectedCount !== 1 ? 's' : ''} selected
              </span>
            )}
          </div>
          <div className="space-y-3">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your query or prompt here. This will be applied to the selected scenes or the entire timeline..."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-y focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500">
                {query.length} characters • {selectedCount > 0 ? `Will apply to ${selectedCount} selected scene${selectedCount !== 1 ? 's' : ''}` : 'Will apply to entire timeline'}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setQuery('')}>
                  Clear
                </Button>
                <Button size="sm" disabled={!query.trim()} onClick={handleQueryGo}>
                  Apply Query
                </Button>
              </div>
            </div>
          </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}