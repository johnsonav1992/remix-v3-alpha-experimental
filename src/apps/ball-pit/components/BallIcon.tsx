import { COLORS } from "../constants";

export function BallIcon() {
  return () => (
    <div
      css={{
        position: 'relative',
        width: '80px',
        height: '80px',
      }}
    >
      <div
        css={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          backgroundColor: COLORS[0],
          border: '4px solid #2F3542',
          boxShadow: '0 4px 0 rgba(47, 53, 66, 0.3)',
        }}
      />
      <div
        css={{
          position: 'absolute',
          top: '20%',
          left: '20%',
          width: '30%',
          height: '30%',
          borderRadius: '50%',
          backgroundColor: 'rgba(47, 53, 66, 0.15)',
        }}
      />
    </div>
  )
}
