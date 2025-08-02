'use client'

import {useEffect, useState} from 'react'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import StepNavigation from './StepNavigation'
import MetaPrompt from './MetaPrompt'
import TextShots from './TextShots'
import Shots from './Shots'
import GeneratedContent from './GeneratedContent'
import { Button } from './ui/button'
import { WorkflowProvider, useWorkflow } from '@/contexts/WorkflowContext'

const steps = [
  { id: 1, title: 'MetaPrompt', description: 'Set up prompts and objects', completed: false },
  { id: 2, title: 'Text Blocks', description: 'Create text-focused content', completed: false },
  { id: 3, title: 'Shots', description: 'Create scene sequences', completed: false },
  { id: 4, title: 'Generated Content', description: 'Configure video output', completed: false }
]

function WorkflowContent() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false, false])
  const { data } = useWorkflow()

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0: // MetaPrompt validation
        console.log(data)
        console.log("helooo")
        return data.metaPrompt.generalPrompt.trim().length > 0
      case 1: // TextShots validation
        return data.textShots.length > 0 && data.textShots.every(textShot => textShot.content.trim().length > 0)
      case 2: // Shots validation
        return data.shots.length > 0 && data.shots.every(shot => shot.description.trim().length > 0)
      case 3: // GeneratedContent validation
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
        return <TextShots />
      case 2:
        return <Shots />
      case 3:
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
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Step Navigation */}
        <div className="mb-6">
          <StepNavigation steps={stepsWithCompletion} currentStep={currentStep} />
        </div>

        {/* Current Step Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          {renderCurrentStep()}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center bg-white rounded-lg border border-gray-200 p-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={isFirstStep}
            className="flex items-center gap-2 px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600 font-medium">
              Step {currentStep + 1} of {steps.length}
            </div>
            <div className="flex space-x-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index <= currentStep 
                      ? 'bg-blue-600' 
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {isLastStep ? (
            <Button
              onClick={handleComplete}
              disabled={!canProceed}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium rounded-md transition-all duration-200 disabled:cursor-not-allowed"
            >
              <Check className="w-4 h-4" />
              Complete Workflow
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={false}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-md transition-all duration-200"
            >
              {currentStep === 0 && data.metaPrompt.generalPrompt.trim().length === 0 ? 'Skip' : 'Continue'}
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