interface BallProps {
  x: number
  y: number
  radius: number
  color: string
}

export function Ball() {
  return ({ x, y, radius, color }: BallProps) => (
    <div
      style={{
        position: 'absolute',
        left: `${x - radius}px`,
        top: `${y - radius}px`,
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
      }}
      css={{
        borderRadius: '50%',
        backgroundColor: color,
        border: '3px solid #2F3542',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        pointerEvents: 'none',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '25%',
          left: '25%',
          width: '25%',
          height: '25%',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          borderRadius: '50%',
        },
      }}
    />
  )
}
