import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import StepWelcome from './StepWelcome'
import StepRole from './StepRole'
import StepIndustry from './StepIndustry'
import StepAspiration from './StepAspiration'

const steps = ['welcome', 'role', 'industry', 'aspiration']

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const { setUser } = useUser()
  const navigate = useNavigate()

  const advance = (data = {}) => {
    if (step < steps.length - 1) {
      setUser(u => ({ ...u, ...data }))
      setStep(s => s + 1)
    } else {
      setUser(u => ({ ...u, ...data, onboardingComplete: true }))
      navigate('/feed')
    }
  }

  const pageStyle = {
    minHeight: '100dvh',
    maxWidth: '420px',
    margin: '0 auto',
    background: 'var(--surface-primary)',
    display: 'flex',
    flexDirection: 'column',
  }

  return (
    <div style={pageStyle}>
      {step === 0 && <StepWelcome onNext={() => advance()} />}
      {step === 1 && <StepRole onNext={advance} />}
      {step === 2 && <StepIndustry onNext={advance} />}
      {step === 3 && <StepAspiration onNext={advance} />}
    </div>
  )
}
