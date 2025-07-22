"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Upload, Zap, Sparkles, FileText } from "lucide-react"

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null)
  const router = useRouter()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = () => {
    if (file) {
      router.push("/generate")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <Sparkles className="h-8 w-8 text-indigo-600 mr-2" />
            <h1 className="text-4xl font-bold text-gray-900">Taumon AI Dashboard</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your content with the power of generative AI. Upload your files and let our AI create amazing content for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="border-2 border-indigo-100 hover:border-indigo-200 transition-colors">
            <CardHeader className="text-center">
              <Zap className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <CardTitle className="text-lg">Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">Generate high-quality content in seconds with our advanced AI models</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100 hover:border-purple-200 transition-colors">
            <CardHeader className="text-center">
              <FileText className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-lg">Multiple Formats</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">Support for documents, images, audio, and more file types</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-emerald-100 hover:border-emerald-200 transition-colors">
            <CardHeader className="text-center">
              <Sparkles className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <CardTitle className="text-lg">AI-Powered</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">Cutting-edge generative AI technology for superior results</p>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-2xl mx-auto border-2 border-gray-100 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900 flex items-center justify-center">
              <Upload className="h-6 w-6 mr-2" />
              Upload Your Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <div className="space-y-2">
                <Input
                  type="file"
                  onChange={handleFileChange}
                  className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.mp3,.mp4,.wav"
                />
                {file && (
                  <p className="text-sm text-gray-600 mt-2">
                    Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>
            </div>
            
            <Button 
              onClick={handleUpload}
              disabled={!file}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {file ? "Process with AI" : "Select a file to continue"}
            </Button>

            <div className="text-xs text-gray-500 text-center">
              Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG, MP3, MP4, WAV
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}