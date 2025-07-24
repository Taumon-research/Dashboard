'use client'

import {useEffect, useState} from 'react'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import StepNavigation from './StepNavigation'
import MetaPrompt from './MetaPrompt'
import Shots from './Shots'
import GeneratedContent from './GeneratedContent'
import { Button } from './ui/button'
import { WorkflowProvider, useWorkflow } from '@/contexts/WorkflowContext'

const steps = [
  { id: 1, title: 'MetaPrompt', description: 'Set up prompts and objects', completed: false },
  { id: 2, title: 'Shots', description: 'Create scene sequences', completed: false },
  { id: 3, title: 'Generated Content', description: 'Configure video output', completed: false }
]

function WorkflowContent() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false])
  const { data } = useWorkflow()

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0: // MetaPrompt validation
        console.log(data)
        console.log("helooo")
        return data.metaPrompt.generalPrompt.trim().length > 0
      case 1: // Shots validation
        return data.shots.length > 0 && data.shots.every(shot => shot.description.trim().length > 0)
      case 2: // GeneratedContent validation
        return data.generatedContent.length > 0
      default:
        return true
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const newCompletedSteps = [...completedSteps]
      newCompletedSteps[currentStep] = true
      setCompletedSteps(newCompletedSteps)
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    if (validateCurrentStep()) {
      const newCompletedSteps = [...completedSteps]
      newCompletedSteps[currentStep] = true
      setCompletedSteps(newCompletedSteps)
      window.location.href = '/generate'
    }
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <MetaPrompt />
      case 1:
        return <Shots />
      case 2:
        return <GeneratedContent />
      default:
        return <MetaPrompt />
    }
  }

  const stepsWithCompletion = steps.map((step, index) => ({
    ...step,
    completed: completedSteps[index]
  }))

  let isLastStep = currentStep === steps.length - 1
  let isFirstStep = currentStep === 0
  let canProceed = validateCurrentStep()

  // useEffect(() => {
  //   isLastStep = currentStep === steps.length - 1
  //   isFirstStep = currentStep === 0
  //   canProceed = validateCurrentStep()
  //   console.log(canProceed)
  // }, [currentStep, data.metaPrompt.generalPrompt])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Taumon AI Dashboard</h1>
          <p className="text-gray-600">Create AI-generated content in 3 simple steps</p>
        </div>

        {/* Step Navigation */}
        <StepNavigation steps={stepsWithCompletion} currentStep={currentStep} />

        {/* Current Step Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          {renderCurrentStep()}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={isFirstStep}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </div>

          {isLastStep ? (
            <Button
              onClick={handleComplete}
              disabled={!canProceed}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
            >
              <Check className="w-4 h-4" />
              Complete
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={false}
              className="flex items-center gap-2 disabled:bg-gray-400"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function MultiStepWorkflow() {
  return (
    <WorkflowProvider>
      <WorkflowContent />
    </WorkflowProvider>
  )
}