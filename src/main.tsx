import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RoomAvailabilityForm from './RoomAvailability.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RoomAvailabilityForm />
    </StrictMode>,
)
