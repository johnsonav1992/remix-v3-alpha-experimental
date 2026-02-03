import type { Handle } from '@remix-run/component'

import { PHYSICS } from '../constants'
import type { BallData } from '../types'
import { getRandomColor } from '../utils'
import { Ball } from './Ball'

export function BallPit(handle: Handle) {
  let balls: BallData[] = []
  let nextId = 0
  let containerRef: HTMLDivElement
  let animationFrameId: number | null = null

  const addBall = (x: number, y: number): void => {
    balls.push({
      id: nextId++,
      x,
      y,
      vx: (Math.random() - 0.5) * 15,
      vy: Math.random() * -10 - 5,
      color: getRandomColor(),
      radius: 20 + Math.random() * 20,
    })
  }

  const updateBalls = (): void => {
    if (!containerRef) return

    const width = containerRef.clientWidth
    const height = containerRef.clientHeight

    balls.forEach((ball) => {
      ball.vy += PHYSICS.gravity
      ball.vx *= PHYSICS.friction
      ball.vy *= PHYSICS.friction

      ball.x += ball.vx
      ball.y += ball.vy

      if (ball.x - ball.radius < 0) {
        ball.x = ball.radius
        ball.vx = Math.abs(ball.vx) * PHYSICS.bounce
      } else if (ball.x + ball.radius > width) {
        ball.x = width - ball.radius
        ball.vx = -Math.abs(ball.vx) * PHYSICS.bounce
      }

      if (ball.y - ball.radius < 0) {
        ball.y = ball.radius
        ball.vy = Math.abs(ball.vy) * PHYSICS.bounce
      } else if (ball.y + ball.radius > height) {
        ball.y = height - ball.radius
        ball.vy = -Math.abs(ball.vy) * PHYSICS.bounce
      }
    })
  }

  const animate = (): void => {
    updateBalls()
    handle.update()
    animationFrameId = requestAnimationFrame(animate)
  }

  const startAnimation = (): void => {
    if (animationFrameId === null) {
      animationFrameId = requestAnimationFrame(animate)
    }
  }

  const stopAnimation = (): void => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }
  }

  handle.signal.addEventListener('abort', stopAnimation)

  return () => (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#FFFBF0',
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,87,87,.03) 35px, rgba(255,87,87,.03) 70px)',
        fontFamily: '"Space Grotesk", system-ui, sans-serif',
        padding: '40px',
        boxSizing: 'border-box',
      }}
    >
      <div
        css={{
          marginBottom: '30px',
          textAlign: 'center',
        }}
      >
        <h1
          css={{
            fontSize: '42px',
            fontWeight: '900',
            margin: 0,
            marginBottom: '12px',
            color: '#2F3542',
            textTransform: 'uppercase',
            letterSpacing: '-2px',
          }}
        >
          Ball Pit
        </h1>
        <p
          css={{
            fontSize: '18px',
            color: '#57606F',
            margin: 0,
            fontWeight: '600',
            marginBottom: '16px',
          }}
        >
          Click to throw balls • {balls.length} in the pit
        </p>
        <button
          type="button"
          on={{
            click() {
              balls = []
              handle.update()
            },
          }}
          css={{
            backgroundColor: '#FF5757',
            color: '#FFFBF0',
            border: '4px solid #2F3542',
            padding: '12px 28px',
            fontSize: '14px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            cursor: 'pointer',
            boxShadow: '4px 4px 0 #2F3542',
            transition: 'transform 0.1s ease, box-shadow 0.1s ease',
            '&:hover': {
              transform: 'translate(-2px, -2px)',
              boxShadow: '6px 6px 0 #2F3542',
            },
            '&:active': {
              transform: 'translate(1px, 1px)',
              boxShadow: '2px 2px 0 #2F3542',
            },
          }}
        >
          Clear Pit
        </button>
      </div>
      <div
        css={{
          position: 'relative',
          width: '100%',
          maxWidth: '900px',
          height: '600px',
          backgroundColor: '#E8F4F8',
          border: '8px solid #2F3542',
          boxShadow: 'inset 0 8px 16px rgba(0,0,0,0.1), 8px 8px 0 #2F3542',
          overflow: 'hidden',
        }}
      >
        <div
          connect={(node) => {
            containerRef = node
            startAnimation()
          }}
          on={{
            click(event) {
              const rect = event.currentTarget.getBoundingClientRect()
              const x = event.clientX - rect.left
              const y = event.clientY - rect.top
              addBall(x, y)
            },
          }}
          css={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            cursor: 'crosshair',
          }}
        >
          {balls.map((ball) => (
            <Ball key={ball.id} x={ball.x} y={ball.y} radius={ball.radius} color={ball.color} />
          ))}
        </div>
      </div>
    </div>
  )
}
