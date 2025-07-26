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
    <div className="w-full">
      {/* Progress Bar */}
      <div className="relative mx-10">
        {/* Background Progress Line */}
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full h-0.5 bg-gray-200 rounded-full" />
        </div>
        
        {/* Active Progress Line */}
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div 
            className="h-0.5 bg-blue-600 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${(currentStep / (steps.length - 1)) * 100}%`
            }}
          />
        </div>
        
        {/* Step Circles */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200 ease-out ${
                index < currentStep
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : index === currentStep
                  ? 'border-blue-600 text-blue-600 bg-white ring-2 ring-blue-100'
                  : 'border-gray-300 text-gray-400 bg-white hover:border-gray-400'
              }`}
            >
              {/* Completed Step Icon */}
              {index < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                <span className="text-xs font-medium">{step.id}</span>
              )}
              
            </div>
          ))}
        </div>
      </div>
      
      {/* Step Labels */}
      <div className="flex justify-between mt-4">
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            className="text-center max-w-[120px] transition-colors duration-200"
          >
            <div>
              <p className={`text-sm font-medium transition-colors duration-200 ${
                index < currentStep 
                  ? 'text-blue-600' 
                  : index === currentStep
                  ? 'text-gray-900'
                  : 'text-gray-500'
              }`}>
                {step.title}
              </p>
              <p className={`text-xs mt-1 transition-colors duration-200 ${
                index < currentStep 
                  ? 'text-blue-500' 
                  : index === currentStep
                  ? 'text-gray-600'
                  : 'text-gray-400'
              }`}>
                {step.description}
              </p>
              
              {/* Progress Indicator */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}