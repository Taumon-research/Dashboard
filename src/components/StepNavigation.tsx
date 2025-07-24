'use client'

import { Check } from 'lucide-react'

interface Step {
  id: number
  title: string
  description: string
  completed: boolean
}

interface StepNavigationProps {
  steps: Step[]
  currentStep: number
}

export default function StepNavigation({ steps, currentStep }: StepNavigationProps) {
  return (
    <div className="w-full mb-8">
      {/* Progress Bar */}
      <div className="relative mx-10">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-between">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 bg-white ${
                index < currentStep
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : index === currentStep
                  ? 'border-blue-600 text-blue-600'
                  : 'border-gray-300 text-gray-400'
              }`}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                <span className="text-sm font-medium">{step.id}</span>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Step Labels */}
      <div className="flex justify-between mt-4">
        {steps.map((step, index) => (
          <div key={step.id} className="text-center max-w-[120px]">
            <p className={`text-sm font-medium ${
              index <= currentStep ? 'text-gray-900' : 'text-gray-500'
            }`}>
              {step.title}
            </p>
            <p className={`text-xs mt-1 ${
              index <= currentStep ? 'text-gray-600' : 'text-gray-400'
            }`}>
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}