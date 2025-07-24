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
    <div className="p-8 min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Step Navigation */}
        <div className="mb-10">
          <StepNavigation steps={stepsWithCompletion} currentStep={currentStep} />
        </div>

        {/* Current Step Content */}
        <div className="glass-card rounded-2xl shadow-elegant border border-white/30 p-10 mb-10 hover-lift backdrop-blur-xl">
          {renderCurrentStep()}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center glass-card rounded-2xl border border-white/30 p-8 shadow-elegant backdrop-blur-xl">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={isFirstStep}
            className="flex items-center gap-3 px-6 py-3 border-slate-200/50 text-slate-700 hover:bg-white/80 hover-lift rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </Button>

          <div className="flex items-center space-x-6">
            <div className="text-base text-slate-600 font-medium">
              Step {currentStep + 1} of {steps.length}
            </div>
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index <= currentStep 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg' 
                      : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {isLastStep ? (
            <Button
              onClick={handleComplete}
              disabled={!canProceed}
              className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold rounded-xl shadow-lg hover-lift transition-all duration-200 disabled:cursor-not-allowed"
            >
              <Check className="w-5 h-5" />
              Complete Workflow
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={false}
              className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold rounded-xl shadow-lg hover-lift transition-all duration-200"
            >
              Continue
              <ChevronRight className="w-5 h-5" />
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