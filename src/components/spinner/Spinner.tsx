// Spinner.tsx
import React from 'react'

export const Spinner = () => (
  <div
    style={{
      display: 'inline-block',
      width: 32,
      height: 32,
      border: '4px solid rgba(0, 123, 255, 0.3)',
      borderRadius: '50%',
      borderTopColor: '#007bff',
      animation: 'spin 1s ease infinite',
    }}
  />
)

// Añade animación global en tu CSS principal (ej. App.css):
/* 
@keyframes spin {
  to { transform: rotate(360deg); }
}
*/
