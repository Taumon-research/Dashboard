"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GripVertical, ArrowLeft, ArrowRight, X, Plus, ChevronLeft, ChevronRight, Image, FileText, Link2 } from "lucide-react"
import { useWorkflow } from "@/contexts/WorkflowContext"

interface TextShot {
  id: string
  content: string
  referencedAssets: string[]
}

export default function TextShots() {
  const { data, updateTextShots } = useWorkflow()
  const [isVisible, setIsVisible] = useState(false)
  const [textShots, setTextShots] = useState<TextShot[]>(
    data.textShots?.length > 0 ? data.textShots : [
      {
        id: "1",
        content: "Slow-motion, cinematic b-roll of nature. Think misty mountains, a tranquil lake at sunrise, or a serene forest. The focus is on the beauty and peace of the natural world.",
        referencedAssets: []
      },
      {
        id: "2",
        content: "A close-up, slow pan over the subtle textures of the jacket fabric. You can see the intricate weaving and quality stitching. The lighting is soft and natural.",
        referencedAssets: []
      },
      {
        id: "3",
        content: "A slow, sweeping shot of a model from behind, standing on a cliff overlooking a vast landscape. The wind gently blows the jacket. The feeling is one of contemplation and solitude.",
        referencedAssets: []
      },
      {
        id: "4",
        content: "A quick, jarring cut from the serene landscape to a pulsating, energetic scene. The sound of a runway show begins to fade in. The shot is a fast-paced, shaky-cam shot of a bustling backstage.",
        referencedAssets: []
      },
      {
        id: "5",
        content: "A quick close-up on a model's face as she gets the final touch-ups of her makeup, her eyes focused and intense.",
        referencedAssets: []
      },
      {
        id: "6",
        content: "The camera follows a different model as she walks onto the runway. The runway lights are bright and dramatic.",
        referencedAssets: []
      },
      {
        id: "7",
        content: "A series of fast-paced, high-energy runway shots. Models of different backgrounds and body types confidently walk the runway, showing off various jackets from the new line.",
        referencedAssets: []
      },
      {
        id: "8",
        content: "Close-ups of the jackets in motion. We see how the fabric drapes and moves, the intricate details, and the unique cuts. The lighting is sharp and highlights the jacket's silhouette.",
        referencedAssets: []
      },
      {
        id: "9",
        content: "A shot of the jackets styled in various ways—paired with elegant evening wear, casual street clothes, and work attire. This demonstrates the versatility of the jackets.",
        referencedAssets: []
      },
      {
        id: "10",
        content: "A final, powerful shot of a model walking towards the camera. She stops, looks directly into the lens, and smiles. The music starts to fade out.",
        referencedAssets: []
      },
      {
        id: "11",
        content: "The brand's logo appears on a black screen. A website or social media handle is included beneath it.",
        referencedAssets: []
      },
      {
        id: "12",
        content: "The screen slowly fades to black.",
        referencedAssets: []
      }
    ]
  )
  const [scrollPosition, setScrollPosition] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [query, setQuery] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

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

  const handleQueryGo = () => {
    if (!query.trim()) return
    
    setIsProcessing(true)
    
    setTimeout(() => {
      let tmp_update_content = [
        "A blazing, high-speed drone shot zips through a dense, urban jungle of skyscrapers. The city lights blur into streaks of color.",
        "A quick, aggressive close-up on the jacket fabric. The camera focuses intensely on the texture, highlighting a metallic sheen or a unique, rugged weave. The lighting is sharp, creating dramatic shadows.",
        "A model, silhouetted against a setting sun, stands on the edge of a rooftop. The city sprawls below. The wind whips her jacket and hair as she stares out, a sense of unyielding power and purpose radiating from her stance.",
        "A sudden, jarring cut from the rooftop to a pulsating, high-energy scene. The blare of a siren and the thump of a driving techno beat slam in. The shot is a fast-paced, shaky-cam shot of a thriving, neon-lit cityscape at night, full of movement and energy.",
        "A quick, intense close-up on a model's face. Her eyes are locked on something off-camera, full of determination and fierce confidence.",
        "The camera follows a different model as she strides with purpose onto a catwalk. The runway lights are blinding, rhythmic flashes that create a dramatic, electrifying effect. The crowd's cheers roar to life.",
        "A series of dynamic, high-impact runway shots. Models of different backgrounds and body types strut with unshakeable confidence and attitude. The camera cuts are rapid, highlighting the various jackets from the new line.",
        "Aggressive, close-up shots of the jackets in motion. We see how the fabric snaps and ripples with every step. The unique cuts and intricate details are highlighted by sharp, dramatic lighting.",
        "A fast-cut montage of the jackets styled in unexpected, bold ways—paired with gritty street clothes, edgy evening wear, and futuristic athleisure.",
        "A final, powerful and unwavering shot of a model walking towards the camera. She stops abruptly, looks directly into the lens, and gives a sultry, confident smirk. The music fades into a deep, echoing bassline.",
        "The brand's logo appears on a black screen, with the bassline finally cutting out. A website or social media handle is included beneath it.",
        "The screen snaps to black, leaving the viewer in a moment of silence to process the energy they just experienced."
      ]

      // Update all text shots with the query content
      const updatedShots = textShots.map((shot, idx) => ({
        ...shot,
        content: tmp_update_content[idx]
      }))
      setTextShots(updatedShots)
      updateTextShots(updatedShots)
      
      // Clear the query
      setQuery('')
      setIsProcessing(false)
    }, 2000)
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
            <ChevronLeft className="h-4 w-4"/>
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
            <ChevronRight className="h-4 w-4"/>
          </Button>
        </div>

        <div
            id="textshots-carousel"
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
            onScroll={handleScroll}
            style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
        >
          {textShots.map((textShot, index) => (
              <div key={textShot.id}
                   className={`min-w-[400px] border-2 border-blue-200 rounded-lg p-4 flex-shrink-0 bg-blue-50 shadow-sm transition-all duration-500 transform ${
                     isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                   }`}
                   style={{ transitionDelay: `${index * 150}ms` }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                        className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
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
                      <ArrowLeft className="h-4 w-4"/>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveTextShot(textShot.id, 'right')}
                        disabled={index === textShots.length - 1}
                    >
                      <ArrowRight className="h-4 w-4"/>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTextShot(textShot.id)}
                        disabled={textShots.length === 1}
                    >
                      <X className="h-4 w-4"/>
                    </Button>
                  </div>
                </div>

                <textarea
                    value={textShot.content}
                    onChange={(e) => updateTextShot(textShot.id, 'content', e.target.value)}
                    placeholder="Enter your text..."
                    className="w-full h-48 p-3 border border-blue-300 rounded bg-white resize-y mb-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
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
                        className="text-xs border border-blue-300 rounded px-2 py-1 bg-white max-w-32"
                        disabled={data.metaPrompt.objs.length === 0}
                    >
                      <option value="">{data.metaPrompt.objs.length === 0 ? 'No assets available' : 'Add asset...'}</option>
                      {data.metaPrompt.objs.map(obj => {
                        const displayName = obj.description || `Object ${obj.id}`
                        const truncatedName = displayName.length > 15 ? displayName.substring(0, 15) + '...' : displayName
                        return (
                          <option key={obj.id} value={obj.id}>
                            {truncatedName} ({obj.uploadedFiles.length})
                          </option>
                        )
                      })}
                    </select>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {textShot.referencedAssets.map(assetId => {
                      const asset = data.metaPrompt.objs.find(obj => obj.id === assetId)
                      return (
                          <div key={assetId}
                               className="flex items-center gap-1 bg-blue-100 border border-blue-200 rounded px-2 py-1 text-xs group hover:bg-blue-200 transition-colors">
                            <Image className="h-3 w-3 text-blue-600"/>
                            <div className="flex flex-col">
                              <span className="text-blue-800 font-medium">{asset?.description || `Asset ${assetId}`}</span>
                              {asset && asset.uploadedFiles.length > 0 && (
                                <span className="text-blue-600 text-[10px]">
                                  {asset.uploadedFiles.length} file{asset.uploadedFiles.length !== 1 ? 's' : ''}: {asset.uploadedFiles.map(f => f.file.name).join(', ')}
                                </span>
                              )}
                            </div>
                            <button
                                onClick={() => removeAssetReference(textShot.id, assetId)}
                                className="ml-1 text-red-500 hover:text-red-700 opacity-70 group-hover:opacity-100 transition-opacity"
                                title="Remove asset reference"
                            >
                              <X className="h-3 w-3"/>
                            </button>
                          </div>
                      )
                    })}
                    {textShot.referencedAssets.length === 0 && (
                        <div className="text-xs text-gray-500 py-2 italic">
                          {data.metaPrompt.objs.length === 0 
                            ? 'No assets uploaded in Meta Prompt step' 
                            : 'No assets referenced'}
                        </div>
                    )}
                  </div>
                </div>
              </div>
          ))}

          <div
              className="min-w-[200px] border-dashed border-2 border-gray-300 rounded-lg p-4 flex-shrink-0 flex items-center justify-center">
            <Button onClick={addTextShot} variant="ghost" className="h-20 w-full">
              <div className="text-center">
                <Plus className="h-8 w-8 mx-auto mb-2"/>
                <span>Add Block</span>
              </div>
            </Button>
          </div>

        </div>

        {isProcessing && (
          <div className="mb-6 flex items-center justify-center h-32 bg-white border rounded-lg">
            <img 
              src="/spinning-logo.gif" 
              alt="Processing..." 
              className="w-12 h-12"
            />
            <span className="ml-3 text-sm text-gray-600">Processing query...</span>
          </div>
        )}
        
        {!isProcessing && (
          <div className="mb-6 p-4 border rounded-lg bg-gray-50">
            <label className="block text-sm font-medium mb-2">Query</label>
            <div className="flex gap-2">
              <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter your query..."
                  className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Button 
                className="px-4" 
                onClick={handleQueryGo}
                disabled={!query.trim()}
              >
                Go
              </Button>
            </div>
          </div>
        )}
      </div>
  )
}