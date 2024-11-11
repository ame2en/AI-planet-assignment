import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WorkflowProvider } from './context/WorkflowContext.jsx';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WorkflowProvider>
    <App />
    </WorkflowProvider>
  </StrictMode>,
)
