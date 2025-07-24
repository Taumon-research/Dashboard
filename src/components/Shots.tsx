"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { GripVertical, ArrowUp, ArrowDown, X, Plus, Link2 } from "lucide-react"

interface Shot {
  id: string
  description: string
  referencedContent: string
  transitionPrompt: string
}

export default function Shots() {
  const [shots, setShots] = useState<Shot[]>([
    {
      id: "1",
      description: "",
      referencedContent: "",
      transitionPrompt: ""
    }
  ])

  const addShot = () => {
    const newShot: Shot = {
      id: Date.now().toString(),
      description: "",
      referencedContent: "",
      transitionPrompt: ""
    }
    setShots(prev => [...prev, newShot])
  }

  const updateShot = (id: string, field: keyof Shot, value: string) => {
    setShots(prev =>
      prev.map(shot => 
        shot.id === id ? { ...shot, [field]: value } : shot
      )
    )
  }

  const removeShot = (id: string) => {
    setShots(prev => prev.filter(shot => shot.id !== id))
  }

  const moveShot = (id: string, direction: 'up' | 'down') => {
    setShots(prev => {
      const index = prev.findIndex(shot => shot.id === id)
      if (
        (direction === 'up' && index === 0) ||
        (direction === 'down' && index === prev.length - 1)
      ) {
        return prev
      }

      const newShots = [...prev]
      const targetIndex = direction === 'up' ? index - 1 : index + 1
      
      newShots[index], newShots[targetIndex] = newShots[targetIndex], newShots[index]
      
      return newShots
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Shots</CardTitle>
        <p className="text-gray-600">Chain of blocks containing text and linked content</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {shots.map((shot, index) => (
          <Card key={shot.id} className="border-l-4 border-l-indigo-500">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <GripVertical className="h-5 w-5 mr-2 text-gray-400 cursor-move" />
                  Block {index + 1}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveShot(shot.id, 'up')}
                    disabled={index === 0}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveShot(shot.id, 'down')}
                    disabled={index === shots.length - 1}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeShot(shot.id)}
                    className="text-red-500 hover:text-red-700"
                    disabled={shots.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Scene Description</label>
                <textarea
                  value={shot.description}
                  onChange={(e) => updateShot(shot.id, 'description', e.target.value)}
                  placeholder="Describe this scene..."
                  className="w-full h-24 p-3 border border-gray-300 rounded-md resize-y focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center">
                  <Link2 className="h-4 w-4 mr-1" />
                  Referenced Content
                </label>
                <Input
                  value={shot.referencedContent}
                  onChange={(e) => updateShot(shot.id, 'referencedContent', e.target.value)}
                  placeholder="OBJ Link/Reference"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Transition Prompting</label>
                <textarea
                  value={shot.transitionPrompt}
                  onChange={(e) => updateShot(shot.id, 'transitionPrompt', e.target.value)}
                  placeholder="Describe the transition to the next scene..."
                  className="w-full h-20 p-3 border border-gray-300 rounded-md resize-y focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Button 
          onClick={addShot}
          variant="outline"
          className="w-full border-dashed border-2 hover:border-indigo-400 hover:text-indigo-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Block
        </Button>
      </CardContent>
    </Card>
  )
}