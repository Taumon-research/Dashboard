"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Bot, Loader2, Sparkles } from "lucide-react"

export default function GeneratePage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const router = useRouter()

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsGenerating(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mr-4 hover:bg-indigo-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center">
            <Bot className="h-6 w-6 text-indigo-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">AI Content Generation</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="border-2 border-indigo-100">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Sparkles className="h-5 w-5 text-indigo-600 mr-2" />
                Content Generation Workspace
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                {!isGenerating ? (
                  <div className="space-y-4">
                    <Bot className="h-16 w-16 text-gray-400 mx-auto" />
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-700">Ready to Generate</h3>
                      <p className="text-gray-600">
                        Your content is uploaded and ready for AI processing. Click below to start generating amazing content.
                      </p>
                    </div>
                    <Button
                      onClick={handleGenerate}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Content
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Loader2 className="h-16 w-16 text-indigo-600 mx-auto animate-spin" />
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-700">AI is Working...</h3>
                      <p className="text-gray-600">
                        Our advanced AI models are processing your content. This may take a few moments.
                      </p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg">Generation Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Content Type</span>
                    <span className="text-sm text-gray-600">Auto-detect</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Quality</span>
                    <span className="text-sm text-gray-600">High</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Model</span>
                    <span className="text-sm text-gray-600">GPT-4</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg">Processing Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm">File uploaded successfully</span>
                  </div>
                  <div className={`flex items-center p-3 rounded-lg ${isGenerating ? 'bg-blue-50' : 'bg-gray-50'}`}>
                    <div className={`h-2 w-2 rounded-full mr-3 ${isGenerating ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                    <span className="text-sm">AI processing</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="h-2 w-2 bg-gray-300 rounded-full mr-3"></div>
                    <span className="text-sm">Content generation</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}