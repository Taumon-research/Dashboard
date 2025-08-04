"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Plus, Link2, Camera, ArrowRight, Settings, CheckCircle, Search, ChevronLeft, ChevronRight, Play, Pause, SkipBack, SkipForward, Volume2, Maximize2, Scissors, Move, ZoomIn, ZoomOut } from "lucide-react"

interface Shot {
  id: string
  coverImage: string
  videoUrl?: string
  references: string[]
  selected?: boolean
  duration: number
  startTime: number
  endTime: number
  trimStart: number
  trimEnd: number
  title: string
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
  shots: Shot[]
  currentVideoIndex: number
  isPlaying: boolean
}

function TimelineBlock({ shot, index, isLast, onUpdate, onRemove, onSelect, onToolset, disabled, shots, currentVideoIndex, isPlaying }: TimelineBlockProps) {
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
        className={`border-l-4 ${getSelectionStyle(shot.selected)} transition-all duration-300 shadow-lg hover:shadow-xl flex-shrink-0 ${
          shots[currentVideoIndex]?.id === shot.id ? 'ring-2 ring-blue-400 border-blue-500' : ''
        }`}
        style={{ width: `${getBlockWidth()}px` }}
      >
        <CardHeader className="pb-3">
          <div className="space-y-2">
            <CardTitle className="text-lg flex items-center">
              <div className={`w-8 h-8 ${
                shots[currentVideoIndex]?.id === shot.id ? 'bg-blue-600' :
                shot.selected ? 'bg-green-600' : 'bg-indigo-600'
              } text-white rounded-full flex items-center justify-center text-sm font-bold mr-3`}>
                {shots[currentVideoIndex]?.id === shot.id && isPlaying ? <Play className="h-4 w-4" /> :
                 shot.selected ? <CheckCircle className="h-4 w-4" /> : index + 1}
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
              <div 
                className="w-full h-28 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => onSelect(shot.id)}
              >
                {shot.videoUrl ? (
                  <video 
                    src={shot.videoUrl} 
                    className="w-full h-full object-cover rounded-lg"
                    muted
                    loop
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                  />
                ) : (
                  <div className="text-center">
                    <Camera className="h-6 w-6 mx-auto mb-1 text-gray-400" />
                    <span className="text-xs text-gray-500">Add video</span>
                  </div>
                )}
              </div>
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
      videoUrl: "/video1a.mp4",
      references: [],
      selected: false,
      duration: 15,
      startTime: 0,
      endTime: 15,
      trimStart: 0,
      trimEnd: 15,
      title: "Opening Scene"
    },
    {
      id: "2", 
      coverImage: availableCoverImages[1],
      videoUrl: "/video2.mp4",
      references: [],
      selected: false,
      duration: 12,
      startTime: 15,
      endTime: 27,
      trimStart: 0,
      trimEnd: 12,
      title: "Main Action"
    },
    {
      id: "3",
      coverImage: availableCoverImages[2],
      videoUrl: "/video3.mp4",
      references: [],
      selected: false,
      duration: 8,
      startTime: 27,
      endTime: 35,
      trimStart: 0,
      trimEnd: 8,
      title: "Transition"
    },
    {
      id: "4",
      coverImage: availableCoverImages[3],
      videoUrl: "/video4.mp4",
      references: [],
      selected: false,
      duration: 10,
      startTime: 35,
      endTime: 45,
      trimStart: 0,
      trimEnd: 10,
      title: "Finale"
    }
  ])
  const [selectedShotId, setSelectedShotId] = useState<string>("1")
  const [scrollPosition, setScrollPosition] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  
  // Timeline player state
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [totalDuration, setTotalDuration] = useState(45)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const mainVideoRef = useRef<HTMLVideoElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  
  // Advanced timeline state
  const [timelineZoom, setTimelineZoom] = useState(1)
  const [timelineScroll, setTimelineScroll] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [draggedClip, setDraggedClip] = useState<string | null>(null)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragStartTime, setDragStartTime] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [volume, setVolume] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [snapToGrid, setSnapToGrid] = useState(true)
  const [showWaveforms, setShowWaveforms] = useState(true)
  
  // Timeline dimensions
  const TIMELINE_HEIGHT = 120
  const PIXELS_PER_SECOND = 50 * timelineZoom
  const GRID_INTERVAL = 1 // seconds

  const addShot = () => {
    const videoUrls = [
      "/video1a.mp4",
      "/video1b.mp4", 
      "/video2.mp4",
      "/video3.mp4",
      "/video4.mp4"
    ]
    
    const newShot: Shot = {
      id: Date.now().toString(),
      coverImage: availableCoverImages[shots.length % availableCoverImages.length],
      videoUrl: videoUrls[shots.length % videoUrls.length],
      references: [],
      selected: false,
      duration: 8,
      startTime: totalDuration,
      endTime: totalDuration + 8,
      trimStart: 0,
      trimEnd: 8,
      title: `Scene ${shots.length + 1}`
    }
    setShots(prev => {
      const updatedShots = [...prev, newShot]
      return updatedShots
    })
    
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
    const shotIndex = shots.findIndex(shot => shot.id === id)
    if (shotIndex !== -1) {
      setSelectedShotId(id)
      setCurrentVideoIndex(shotIndex)
      // Jump to the start of this video segment
      const segmentStartTime = shotIndex * SEGMENT_DURATION
      jumpToTime(segmentStartTime)
    }
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
    // Recalculate total duration from actual shot durations
    const newTotalDuration = shots.reduce((total, shot) => Math.max(total, shot.endTime), 0)
    setTotalDuration(newTotalDuration)
  }, [shots])

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Timeline utility functions
  const timeToPixels = (time: number) => time * PIXELS_PER_SECOND
  const pixelsToTime = (pixels: number) => pixels / PIXELS_PER_SECOND
  const snapToGridTime = (time: number) => snapToGrid ? Math.round(time / GRID_INTERVAL) * GRID_INTERVAL : time
  
  const getClipAtTime = (time: number) => {
    return shots.find(shot => time >= shot.startTime && time < shot.endTime)
  }
  
  const recalculateTimeline = useCallback(() => {
    // Sort shots by start time and recalculate positions
    const sortedShots = [...shots].sort((a, b) => a.startTime - b.startTime)
    
    // Ensure no gaps or overlaps
    let currentPos = 0
    const updatedShots = sortedShots.map(shot => {
      const newShot = {
        ...shot,
        startTime: currentPos,
        endTime: currentPos + shot.duration
      }
      currentPos += shot.duration
      return newShot
    })
    
    setShots(updatedShots)
    const newTotalDuration = updatedShots[updatedShots.length - 1]?.endTime || 0
    setTotalDuration(newTotalDuration)
  }, [shots])

  // Timeline control functions
  const togglePlayPause = () => {
    if (mainVideoRef.current) {
      if (isPlaying) {
        mainVideoRef.current.pause()
      } else {
        mainVideoRef.current.play()
        mainVideoRef.current.playbackRate = playbackRate
      }
      setIsPlaying(!isPlaying)
    }
  }
  
  const skipBackward = () => {
    const newTime = Math.max(0, currentTime - 10)
    jumpToTime(newTime)
  }
  
  const skipForward = () => {
    const newTime = Math.min(totalDuration, currentTime + 10)
    jumpToTime(newTime)
  }

  const jumpToTime = (time: number) => {
    setCurrentTime(time)
    const currentClip = getClipAtTime(time)
    
    if (currentClip) {
      const clipIndex = shots.findIndex(shot => shot.id === currentClip.id)
      if (clipIndex !== currentVideoIndex) {
        setCurrentVideoIndex(clipIndex)
        setSelectedShotId(currentClip.id)
      }
      
      // Calculate time within the clip
      const clipTime = time - currentClip.startTime + currentClip.trimStart
      
      if (mainVideoRef.current) {
        mainVideoRef.current.currentTime = clipTime
      }
    }
  }
  
  // Drag and drop functions
  const handleClipDragStart = (e: React.MouseEvent, clipId: string) => {
    e.preventDefault()
    setIsDragging(true)
    setDraggedClip(clipId)
    setDragStartX(e.clientX)
    
    const clip = shots.find(shot => shot.id === clipId)
    if (clip) {
      setDragStartTime(clip.startTime)
    }
  }
  
  const handleClipDrag = useCallback((e: MouseEvent) => {
    if (!isDragging || !draggedClip || !timelineRef.current) return
    
    const rect = timelineRef.current.getBoundingClientRect()
    const deltaX = e.clientX - dragStartX
    const deltaTime = pixelsToTime(deltaX)
    const newStartTime = snapToGridTime(Math.max(0, dragStartTime + deltaTime))
    
    const draggedClipData = shots.find(shot => shot.id === draggedClip)
    if (!draggedClipData) return
    
    const newEndTime = newStartTime + draggedClipData.duration
    
    // Check for overlaps with other clips
    const otherClips = shots.filter(shot => shot.id !== draggedClip)
    const hasOverlap = otherClips.some(clip => 
      (newStartTime < clip.endTime && newEndTime > clip.startTime)
    )
    
    // Only update if no overlap and within bounds
    if (!hasOverlap && newStartTime >= 0 && newEndTime <= totalDuration + 60) {
      setShots(prev => prev.map(shot => 
        shot.id === draggedClip 
          ? { ...shot, startTime: newStartTime, endTime: newEndTime }
          : shot
      ))
    }
  }, [isDragging, draggedClip, dragStartX, dragStartTime, shots, snapToGrid, pixelsToTime, snapToGridTime, totalDuration])
  
  const handleClipDragEnd = useCallback(() => {
    setIsDragging(false)
    setDraggedClip(null)
    recalculateTimeline()
  }, [])
  
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleClipDrag)
      document.addEventListener('mouseup', handleClipDragEnd)
      return () => {
        document.removeEventListener('mousemove', handleClipDrag)
        document.removeEventListener('mouseup', handleClipDragEnd)
      }
    }
  }, [isDragging, handleClipDrag, handleClipDragEnd])

  const handleTimeUpdate = () => {
    if (mainVideoRef.current) {
      const videoCurrentTime = mainVideoRef.current.currentTime
      const currentShot = shots[currentVideoIndex]
      
      if (currentShot) {
        const globalTime = currentShot.startTime + videoCurrentTime
        setCurrentTime(Math.min(globalTime, currentShot.endTime))
        
        // Auto-advance to next video if current clip is complete
        if (videoCurrentTime >= (currentShot.trimEnd - currentShot.trimStart) && currentVideoIndex < shots.length - 1) {
          const nextIndex = currentVideoIndex + 1
          setCurrentVideoIndex(nextIndex)
          setSelectedShotId(shots[nextIndex].id)
          if (mainVideoRef.current) {
            mainVideoRef.current.currentTime = shots[nextIndex].trimStart
          }
        }
      }
    }
  }

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
          // Replace video1a with video1b when processing query
          const newVideoUrl = shot.videoUrl === "/video1a.mp4" ? "/video1b.mp4" : shot.videoUrl
          return { ...shot, videoUrl: newVideoUrl }
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
        {/* Timeline Video Player */}
        <div className="mb-8">
          <div className="relative w-full h-96 bg-black rounded-lg overflow-hidden border-2 border-gray-300">
            {shots[currentVideoIndex]?.videoUrl ? (
              <video 
                ref={mainVideoRef}
                key={`${currentVideoIndex}-${shots[currentVideoIndex]?.videoUrl}`}
                src={shots[currentVideoIndex].videoUrl}
                className="w-full h-full object-contain"
                muted
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={() => {
                  if (mainVideoRef.current && shots[currentVideoIndex]) {
                    const currentShot = shots[currentVideoIndex]
                    const relativeTime = currentTime - currentShot.startTime
                    mainVideoRef.current.currentTime = Math.max(0, relativeTime + currentShot.trimStart)
                  }
                }}
                onEnded={() => {
                  if (currentVideoIndex < shots.length - 1) {
                    setCurrentVideoIndex(currentVideoIndex + 1)
                    setSelectedShotId(shots[currentVideoIndex + 1].id)
                  } else {
                    setIsPlaying(false)
                  }
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                  <Camera className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg">No video available</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Advanced Timeline Controls */}
          <div className="mt-4 space-y-6">
            {/* Transport Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={skipBackward}>
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={togglePlayPause}>
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="sm" onClick={skipForward}>
                  <SkipForward className="h-4 w-4" />
                </Button>
                
                <div className="mx-4 text-sm font-mono">
                  {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}:{String(Math.floor((currentTime % 1) * 100)).padStart(2, '0')}
                </div>
                
                <select 
                  value={playbackRate} 
                  onChange={(e) => setPlaybackRate(Number(e.target.value))}
                  className="text-xs border rounded px-2 py-1"
                >
                  <option value={0.25}>0.25x</option>
                  <option value={0.5}>0.5x</option>
                  <option value={1}>1x</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2x</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setTimelineZoom(Math.max(0.25, timelineZoom - 0.25))}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-xs px-2">{Math.round(timelineZoom * 100)}%</span>
                <Button variant="outline" size="sm" onClick={() => setTimelineZoom(Math.min(4, timelineZoom + 0.25))}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                
                <Button variant="outline" size="sm" onClick={() => setSnapToGrid(!snapToGrid)} 
                        className={snapToGrid ? 'bg-blue-100' : ''}>
                  Grid
                </Button>
                
                <Button variant="outline" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Professional Timeline */}
            <div className="bg-gray-900 rounded-lg p-4">
              {/* Timeline Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-white text-sm font-semibold">Timeline</div>
                <div className="text-gray-400 text-xs">
                  Duration: {Math.floor(totalDuration / 60)}:{String(Math.floor(totalDuration % 60)).padStart(2, '0')}
                </div>
              </div>
              
              {/* Scrollable Timeline Container */}
              <div className="overflow-x-auto overflow-y-hidden" style={{ maxWidth: '100%' }}>
                <div className="relative" style={{ width: `${Math.max(800, timeToPixels(totalDuration + 10))}px` }}>
                  {/* Time Ruler */}
                  <div className="relative mb-2 h-8 bg-gray-800">
                    {Array.from({ length: Math.ceil((totalDuration + 10) / GRID_INTERVAL) + 1 }, (_, i) => (
                      <div
                        key={i}
                        className="absolute top-0 h-full border-l border-gray-600"
                        style={{ left: `${timeToPixels(i * GRID_INTERVAL)}px` }}
                      >
                        {i % 5 === 0 && (
                          <div className="text-xs text-gray-400 mt-1 ml-1">
                            {i * GRID_INTERVAL}s
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Playhead */}
                    <div 
                      className="absolute top-0 w-0.5 bg-red-500 z-30 pointer-events-none"
                      style={{ 
                        left: `${timeToPixels(currentTime)}px`,
                        height: `${TIMELINE_HEIGHT + 32}px`
                      }}
                    >
                      <div className="absolute -top-1 -left-1.5 w-3 h-3 bg-red-500 transform rotate-45"></div>
                    </div>
                  </div>
                  
                  {/* Video Track */}
                  <div 
                    ref={timelineRef}
                    className="relative bg-gray-800 rounded cursor-pointer"
                    style={{ height: `${TIMELINE_HEIGHT}px` }}
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      const clickX = e.clientX - rect.left
                      const newTime = pixelsToTime(clickX)
                      jumpToTime(newTime)
                    }}
                  >
                    {/* Video Clips */}
                    {shots.map((shot, index) => (
                      <div
                        key={shot.id}
                        className={`absolute top-2 rounded-md border-2 cursor-move transition-all select-none ${
                          draggedClip === shot.id 
                            ? 'border-blue-400 shadow-lg z-20 opacity-80' 
                            : 'border-gray-600 hover:border-gray-400'
                        } ${
                          shots[currentVideoIndex]?.id === shot.id 
                            ? 'bg-blue-600' 
                            : 'bg-gradient-to-r from-purple-600 to-indigo-600'
                        }`}
                        style={{
                          left: `${timeToPixels(shot.startTime)}px`,
                          width: `${Math.max(timeToPixels(shot.duration), 60)}px`,
                          height: `${TIMELINE_HEIGHT - 16}px`
                        }}
                        onMouseDown={(e) => handleClipDragStart(e, shot.id)}
                        title={`${shot.title} - ${shot.duration}s`}
                      >
                        {/* Clip Content */}
                        <div className="h-full p-2 flex flex-col justify-between text-white text-xs pointer-events-none">
                          <div className="font-semibold truncate">{shot.title}</div>
                          <div className="flex items-center gap-1">
                            <Move className="h-3 w-3" />
                            <span>{shot.duration}s</span>
                          </div>
                        </div>
                        
                        {/* Clip Handles for Trimming */}
                        <div className="absolute left-0 top-0 w-2 h-full bg-yellow-400 opacity-0 hover:opacity-70 cursor-ew-resize" 
                             title="Trim start" />
                        <div className="absolute right-0 top-0 w-2 h-full bg-yellow-400 opacity-0 hover:opacity-70 cursor-ew-resize" 
                             title="Trim end" />
                      </div>
                    ))}
                    
                    {/* Grid Lines */}
                    <div className="absolute inset-0 pointer-events-none">
                      {Array.from({ length: Math.ceil((totalDuration + 10) / GRID_INTERVAL) }, (_, i) => (
                        <div
                          key={i}
                          className="absolute top-0 h-full border-l border-gray-700 opacity-20"
                          style={{ left: `${timeToPixels(i * GRID_INTERVAL)}px` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Timeline Info */}
              <div className="mt-4 flex justify-between text-xs text-gray-400">
                <div>Track 1: Video</div>
                <div className="flex items-center gap-4">
                  <span>Clips: {shots.length}</span>
                  <span>Zoom: {Math.round(timelineZoom * 100)}%</span>
                  <span className={snapToGrid ? 'text-blue-400' : ''}>
                    Snap: {snapToGrid ? 'ON' : 'OFF'}
                  </span>
                  <span>Duration: {totalDuration}s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
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
                  shots={shots}
                  currentVideoIndex={currentVideoIndex}
                  isPlaying={isPlaying}
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