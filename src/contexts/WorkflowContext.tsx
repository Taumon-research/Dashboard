'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

// Types from existing components
interface UploadedFile {
  file: File
  description: string
}

interface OBJ {
  id: string
  uploadedFiles: UploadedFile[]
  description: string
}

interface Shot {
  id: string
  description: string
  referencedContent: string
  transitionPrompt: string
}

interface VideoBlock {
  id: string
  textInput: string
  parameters: {
    quality: string
    duration: string
    style: string
    mood: string
  }
  selectedTools: string[]
}

interface WorkflowData {
  metaPrompt: {
    generalPrompt: string
    objs: OBJ[]
  }
  shots: Shot[]
  generatedContent: VideoBlock[]
}

interface WorkflowContextType {
  data: WorkflowData
  updateMetaPrompt: (generalPrompt: string, objs: OBJ[]) => void
  updateShots: (shots: Shot[]) => void
  updateGeneratedContent: (content: VideoBlock[]) => void
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined)

const initialData: WorkflowData = {
  metaPrompt: {
    generalPrompt: '',
    objs: []
  },
  shots: [],
  generatedContent: []
}

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<WorkflowData>(initialData)

  const updateMetaPrompt = (generalPrompt: string, objs: OBJ[]) => {
    setData(prev => ({
      ...prev,
      metaPrompt: { generalPrompt, objs }
    }))
  }

  const updateShots = (shots: Shot[]) => {
    setData(prev => ({
      ...prev,
      shots
    }))
  }

  const updateGeneratedContent = (content: VideoBlock[]) => {
    setData(prev => ({
      ...prev,
      generatedContent: content
    }))
  }

  return (
    <WorkflowContext.Provider value={{
      data,
      updateMetaPrompt,
      updateShots,
      updateGeneratedContent
    }}>
      {children}
    </WorkflowContext.Provider>
  )
}

export function useWorkflow() {
  const context = useContext(WorkflowContext)
  if (context === undefined) {
    throw new Error('useWorkflow must be used within a WorkflowProvider')
  }
  return context
}