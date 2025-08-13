'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { WorkflowData, OBJ, TextShot, Shot, VideoBlock } from '@/lib/models'

interface WorkflowContextType {
  data: WorkflowData
  updateMetaPrompt: (generalPrompt: string, objs: OBJ[]) => void
  updateTextShots: (textShots: TextShot[]) => void
  updateShots: (shots: Shot[]) => void
  updateGeneratedContent: (content: VideoBlock[]) => void
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined)

const initialData: WorkflowData = {
  metaPrompt: {
    generalPrompt: '',
    objs: []
  },
  textShots: [],
  shots: [],
  generatedContent: []
}

export function WorkflowProvider({ children, initialData: initialDataProp }: { children: ReactNode, initialData?: WorkflowData }) {
  const [data, setData] = useState<WorkflowData>(initialDataProp || initialData)

  const updateMetaPrompt = (generalPrompt: string, objs: OBJ[]) => {
    setData(prev => ({
      ...prev,
      metaPrompt: { generalPrompt, objs }
    }))
  }

  const updateTextShots = (textShots: TextShot[]) => {
    setData(prev => ({
      ...prev,
      textShots
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
      updateTextShots,
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