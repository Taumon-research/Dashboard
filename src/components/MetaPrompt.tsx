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

export default function MetaPrompt() {
  const [prompt, setPrompt] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [objDescription, setObjDescription] = useState("")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map(file => ({
        file,
        description: ""
      }))
      setUploadedFiles(prev => [...prev, ...newFiles])
    }
  }

  const updateFileDescription = (index: number, description: string) => {
    setUploadedFiles(prev => 
      prev.map((item, i) => i === index ? { ...item, description } : item)
    )
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">1) MetaPrompt</CardTitle>
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

        <Card className="border-dashed border-2 border-gray-300">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Add OBJ
            </CardTitle>
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
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.mp3,.mp4,.wav"
                  />
                </Button>
                <span className="text-sm text-gray-500">
                  {uploadedFiles.length} file(s) uploaded
                </span>
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-3">
                <label className="block text-sm font-medium">File Descriptions</label>
                {uploadedFiles.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        {item.file.name}
                      </div>
                      <Input
                        placeholder={`Describe ${item.file.name}...`}
                        value={item.description}
                        onChange={(e) => updateFileDescription(index, e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
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
                Overall OBJ Description (Optional)
              </label>
              <textarea
                value={objDescription}
                onChange={(e) => setObjDescription(e.target.value)}
                placeholder="Describe the entire OBJ and its purpose..."
                className="w-full h-24 p-3 border border-gray-300 rounded-md resize-y focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}