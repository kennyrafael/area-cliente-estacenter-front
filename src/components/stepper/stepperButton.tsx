import React from 'react'

type StepperButtonProp = {
  data: StepperButtonData
  active?: boolean
}

export type StepperButtonData = {
  id: number
  title: string
  separator: boolean
}

export const StepperButton: React.FC<StepperButtonProp> = ({
  data,
  active = false,
}) => {
  const { id, title, separator } = data
  return (
    <React.Fragment>
      <div className="step">
        <button
          type="button"
          disabled
          className={`step-trigger ${active ? 'active' : ''}`}
        >
          <span className="bs-stepper-circle">{id}</span>
          <span className="bs-stepper-label">{title}</span>
        </button>
      </div>
      {separator && <div className="line"></div>}
    </React.Fragment>
  )
}
