"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GripVertical, ArrowLeft, ArrowRight, X, Plus, Type, ChevronLeft, ChevronRight, Image, FileText, Link2 } from "lucide-react"
import { useWorkflow } from "@/contexts/WorkflowContext"

interface TextShot {
  id: string
  content: string
  referencedAssets: string[]
}

export default function TextShots() {
  const { data, updateTextShots } = useWorkflow()
  const [textShots, setTextShots] = useState<TextShot[]>(
    data.textShots?.length > 0 ? data.textShots : [
      {
        id: "1",
        content: "",
        referencedAssets: []
      }
    ]
  )
  const [scrollPosition, setScrollPosition] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const addTextShot = () => {
    const newTextShot: TextShot = {
      id: Date.now().toString(),
      content: "",
      referencedAssets: []
    }
    const updatedShots = [...textShots, newTextShot]
    setTextShots(updatedShots)
    updateTextShots(updatedShots)
  }

  const updateTextShot = (id: string, field: keyof TextShot, value: string | string[]) => {
    const updatedShots = textShots.map(shot => 
      shot.id === id ? { ...shot, [field]: value } : shot
    )
    setTextShots(updatedShots)
    updateTextShots(updatedShots)
  }

  const addAssetReference = (shotId: string, assetId: string) => {
    const updatedShots = textShots.map(shot => 
      shot.id === shotId 
        ? { ...shot, referencedAssets: [...shot.referencedAssets, assetId] }
        : shot
    )
    setTextShots(updatedShots)
    updateTextShots(updatedShots)
  }

  const removeAssetReference = (shotId: string, assetId: string) => {
    const updatedShots = textShots.map(shot => 
      shot.id === shotId 
        ? { ...shot, referencedAssets: shot.referencedAssets.filter(id => id !== assetId) }
        : shot
    )
    setTextShots(updatedShots)
    updateTextShots(updatedShots)
  }

  const removeTextShot = (id: string) => {
    if (textShots.length === 1) return
    const updatedShots = textShots.filter(shot => shot.id !== id)
    setTextShots(updatedShots)
    updateTextShots(updatedShots)
  }

  const moveTextShot = (id: string, direction: 'left' | 'right') => {
    const index = textShots.findIndex(shot => shot.id === id)
    if (
      (direction === 'left' && index === 0) ||
      (direction === 'right' && index === textShots.length - 1)
    ) {
      return
    }

    const newShots = [...textShots]
    const targetIndex = direction === 'left' ? index - 1 : index + 1
    
    newShots[index], newShots[targetIndex] = newShots[targetIndex], newShots[index]
    
    setTextShots(newShots)
    updateTextShots(newShots)
  }

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('textshots-carousel')
    if (container) {
      const scrollAmount = 500
      const newScrollPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount
      
      container.scrollTo({ left: newScrollPosition, behavior: 'smooth' })
      setScrollPosition(newScrollPosition)
      
      setTimeout(() => {
        setCanScrollLeft(newScrollPosition > 0)
        setCanScrollRight(newScrollPosition < container.scrollWidth - container.clientWidth)
      }, 100)
    }
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    const newScrollPosition = container.scrollLeft
    setScrollPosition(newScrollPosition)
    setCanScrollLeft(newScrollPosition > 0)
    setCanScrollRight(newScrollPosition < container.scrollWidth - container.clientWidth)
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Text Blocks</h2>
      
      <div className="flex items-center gap-4 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1 text-center">
          <span className="text-sm text-gray-500">{textShots.length} blocks</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div 
        id="textshots-carousel"
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
        onScroll={handleScroll}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {textShots.map((textShot, index) => (
          <div key={textShot.id} className="min-w-[400px] border-2 border-blue-200 rounded-lg p-4 flex-shrink-0 bg-blue-50 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <span className="font-medium text-blue-800">Block {index + 1}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveTextShot(textShot.id, 'left')}
                  disabled={index === 0}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveTextShot(textShot.id, 'right')}
                  disabled={index === textShots.length - 1}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTextShot(textShot.id)}
                  disabled={textShots.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <textarea
              value={textShot.content}
              onChange={(e) => updateTextShot(textShot.id, 'content', e.target.value)}
              placeholder="Enter your text..."
              className="w-full h-32 p-3 border border-blue-300 rounded bg-white resize-y mb-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-blue-700">Referenced Assets</label>
                <select 
                  onChange={(e) => {
                    if (e.target.value && !textShot.referencedAssets.includes(e.target.value)) {
                      addAssetReference(textShot.id, e.target.value)
                    }
                    e.target.value = ""
                  }}
                  className="text-xs border border-blue-300 rounded px-2 py-1 bg-white"
                >
                  <option value="">Add asset...</option>
                  {data.metaPrompt.objs.map(obj => (
                    <option key={obj.id} value={obj.id}>
                      {obj.description || `Object ${obj.id}`}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {textShot.referencedAssets.map(assetId => {
                  const asset = data.metaPrompt.objs.find(obj => obj.id === assetId)
                  return (
                    <div key={assetId} className="flex items-center gap-1 bg-blue-100 border border-blue-200 rounded px-2 py-1 text-xs">
                      <Image className="h-3 w-3 text-blue-600" />
                      <span className="text-blue-800">{asset?.description || `Asset ${assetId}`}</span>
                      <button
                        onClick={() => removeAssetReference(textShot.id, assetId)}
                        className="ml-1 text-red-500 hover:text-red-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )
                })}
                {textShot.referencedAssets.length === 0 && (
                  <div className="text-xs text-gray-500 py-2">No assets referenced</div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        <div className="min-w-[200px] border-dashed border-2 border-gray-300 rounded-lg p-4 flex-shrink-0 flex items-center justify-center">
          <Button onClick={addTextShot} variant="ghost" className="h-20 w-full">
            <div className="text-center">
              <Plus className="h-8 w-8 mx-auto mb-2" />
              <span>Add Block</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}