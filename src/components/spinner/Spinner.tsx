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