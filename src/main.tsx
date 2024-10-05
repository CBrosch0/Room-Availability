import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RoomAvailabilityForm from './RoomAvailability.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/*<RoomAvailabilityForm />*/}
        <App />
    </StrictMode>,
)
