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
      <div className="relative mx-11">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t-2 border-slate-200" />
        </div>
        <div className="relative flex justify-between">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 bg-white shadow-sm ${
                index < currentStep
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : index === currentStep
                  ? 'border-blue-600 text-blue-600 bg-blue-50'
                  : 'border-slate-300 text-slate-400'
              }`}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                <span className="text-sm font-semibold">{step.id}</span>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Step Labels */}
      <div className="flex justify-between mt-6">
        {steps.map((step, index) => (
          <div key={step.id} className="text-center max-w-[140px]">
            <p className={`text-sm font-semibold ${
              index <= currentStep ? 'text-slate-900' : 'text-slate-500'
            }`}>
              {step.title}
            </p>
            <p className={`text-xs mt-1 ${
              index <= currentStep ? 'text-slate-600' : 'text-slate-400'
            }`}>
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}