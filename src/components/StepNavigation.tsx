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
    <div className="w-full fade-in">
      {/* Progress Bar */}
      <div className="relative mx-12">
        {/* Background Progress Line */}
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full h-1 bg-gradient-to-r from-slate-200 via-slate-200 to-slate-200 rounded-full" />
        </div>
        
        {/* Active Progress Line */}
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div 
            className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 rounded-full transition-all duration-700 ease-out shadow-lg"
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
              className={`relative flex items-center justify-center w-14 h-14 rounded-full border-3 transition-all duration-300 ease-out ${
                index < currentStep
                  ? 'border-blue-500 bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl'
                  : index === currentStep
                  ? 'border-blue-500 text-blue-600 bg-white shadow-2xl ring-4 ring-blue-100'
                  : 'border-slate-300 text-slate-400 bg-white shadow-md hover:border-slate-400 hover:shadow-lg'
              }`}
            >
              {/* Completed Step Icon */}
              {index < currentStep ? (
                <Check className="w-6 h-6" />
              ) : (
                <span className="text-sm font-bold tracking-wide">{step.id}</span>
              )}
              
            </div>
          ))}
        </div>
      </div>
      
      {/* Step Labels */}
      <div className="flex justify-between mt-8">
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            className="text-center max-w-[160px] transition-colors duration-200"
          >
            <div>
              <p className={`text-base font-bold tracking-wide transition-colors duration-300 ${
                index < currentStep 
                  ? 'text-blue-600 drop-shadow-sm' 
                  : index === currentStep
                  ? 'text-slate-900 drop-shadow-sm'
                  : 'text-slate-500'
              }`}>
                {step.title}
              </p>
              <p className={`text-sm mt-2 font-medium transition-colors duration-300 ${
                index < currentStep 
                  ? 'text-blue-500/80' 
                  : index === currentStep
                  ? 'text-slate-600'
                  : 'text-slate-400'
              }`}>
                {step.description}
              </p>
              
              {/* Progress Indicator */}
              {index <= currentStep && (
                <div className="mt-3 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}