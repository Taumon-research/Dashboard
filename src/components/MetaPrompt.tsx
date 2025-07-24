"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Upload, X, Plus } from "lucide-react"

interface UploadedFile {
  file: File
  description: string
}

interface OBJ {
  id: string
  uploadedFiles: UploadedFile[]
  description: string
}

export default function MetaPrompt() {
  const [prompt, setPrompt] = useState("")
  const [objs, setObjs] = useState<OBJ[]>([])

  const addOBJ = () => {
    setObjs(prev => [...prev, {
      id: crypto.randomUUID(),
      uploadedFiles: [],
      description: ""
    }])
  }

  const removeOBJ = (objId: string) => {
    setObjs(prev => prev.filter(obj => obj.id !== objId))
  }

  const handleFileUpload = (objId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map(file => ({
        file,
        description: ""
      }))
      setObjs(prev => prev.map(obj => 
        obj.id === objId 
          ? { ...obj, uploadedFiles: [...obj.uploadedFiles, ...newFiles] }
          : obj
      ))
    }
  }

  const updateFileDescription = (objId: string, fileIndex: number, description: string) => {
    setObjs(prev => prev.map(obj =>
      obj.id === objId
        ? {
            ...obj,
            uploadedFiles: obj.uploadedFiles.map((item, i) => 
              i === fileIndex ? { ...item, description } : item
            )
          }
        : obj
    ))
  }

  const removeFile = (objId: string, fileIndex: number) => {
    setObjs(prev => prev.map(obj =>
      obj.id === objId
        ? { ...obj, uploadedFiles: obj.uploadedFiles.filter((_, i) => i !== fileIndex) }
        : obj
    ))
  }

  const updateOBJDescription = (objId: string, description: string) => {
    setObjs(prev => prev.map(obj =>
      obj.id === objId ? { ...obj, description } : obj
    ))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">MetaPrompt</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">General Purpose Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your general purpose prompt here..."
            className="w-full h-32 p-3 border border-gray-300 rounded-md resize-y focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-4">
          {objs.map((obj, objIndex) => (
            <Card key={obj.id} className="border-dashed border-2 border-gray-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <Plus className="h-5 w-5 mr-2" />
                    <span>OBJ {objIndex + 1}</span>
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeOBJ(obj.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Upload Content</label>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" className="relative">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Files
                      <input
                        type="file"
                        multiple
                        onChange={(e) => handleFileUpload(obj.id, e)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.mp3,.mp4,.wav"
                      />
                    </Button>
                    <span className="text-sm text-gray-500">
                      {obj.uploadedFiles.length} file(s) uploaded
                    </span>
                  </div>
                </div>

                {obj.uploadedFiles.length > 0 && (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium">File Descriptions</label>
                    {obj.uploadedFiles.map((item, fileIndex) => (
                      <div key={fileIndex} className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 mb-1">
                            {item.file.name}
                          </div>
                          <Input
                            placeholder={`Describe ${item.file.name}...`}
                            value={item.description}
                            onChange={(e) => updateFileDescription(obj.id, fileIndex, e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(obj.id, fileIndex)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    OBJ Description (Optional)
                  </label>
                  <textarea
                    value={obj.description}
                    onChange={(e) => updateOBJDescription(obj.id, e.target.value)}
                    placeholder="Describe this OBJ and its purpose..."
                    className="w-full h-24 p-3 border border-gray-300 rounded-md resize-y focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Button 
            onClick={addOBJ}
            variant="outline"
            className="w-full border-dashed border-2 border-gray-300 h-12 text-gray-600 hover:text-gray-900 hover:border-gray-400"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add OBJ
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}