"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Upload, X, Plus } from "lucide-react"
import { useWorkflow } from "@/contexts/WorkflowContext"

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
  const { data, updateMetaPrompt } = useWorkflow()
  const [prompt, setPrompt] = useState(data.metaPrompt.generalPrompt)
  const [objs, setObjs] = useState<OBJ[]>(data.metaPrompt.objs)
  const [dragOver, setDragOver] = useState<string | null>(null)

  // Update workflow context whenever prompt or objs change
  useEffect(() => {
    updateMetaPrompt(prompt, objs)
  }, [prompt, objs, updateMetaPrompt])

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

  const handleDragOver = (e: React.DragEvent, objId: string) => {
    e.preventDefault()
    setDragOver(objId)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(null)
  }

  const handleDrop = (e: React.DragEvent, objId: string) => {
    e.preventDefault()
    setDragOver(null)
    
    const files = Array.from(e.dataTransfer.files)
    const allowedTypes = ['.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png', '.mp3', '.mp4', '.wav']
    
    const validFiles = files.filter(file => {
      const extension = '.' + file.name.split('.').pop()?.toLowerCase()
      return allowedTypes.includes(extension)
    })

    if (validFiles.length > 0) {
      const newFiles = validFiles.map(file => ({
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Meta</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          {/*<label className="block text-sm font-medium mb-2">General Purpose Prompt</label>*/}
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your general purpose prompt here..."
            className="w-full h-32 p-3 border border-gray-300 rounded-md resize-y focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-left">
            <Button onClick={addOBJ} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add OBJ
            </Button>
          </div>
          
          {objs.map((obj, objIndex) => (
            <Card key={obj.id} className="border-dashed border-2 border-gray-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <Plus className="h-5 w-5 mr-2" />
                    <span>Object {objIndex + 1}</span>
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
                  <div 
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      dragOver === obj.id 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragOver={(e) => handleDragOver(e, obj.id)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, obj.id)}
                  >
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600 mb-2">
                      Drag and drop your files here, or click to browse
                    </p>
                    <Button variant="outline" className="relative">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Files
                      <input
                        type="file"
                        multiple
                        onChange={(e) => handleFileUpload(obj.id, e)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.mp3,.mp4,.wav,.webp"
                      />
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">
                      Supports: PDF, DOC, DOCX, TXT, JPG, JPEG, PNG, MP3, MP4, WAV
                    </p>
                    <span className="text-sm text-gray-500 block mt-2">
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
          
        </div>
      </CardContent>
    </Card>
  )
}