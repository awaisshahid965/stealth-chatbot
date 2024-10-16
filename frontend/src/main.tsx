import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CopilotKit } from '@copilotkit/react-core'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CopilotKit runtimeUrl='http://localhost:8000/query'>
      <App />
    </CopilotKit>
  </StrictMode>,
)
