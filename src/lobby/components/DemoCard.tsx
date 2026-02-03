import type { IconComponent } from '../../shared/types'

interface DemoCardProps {
  id: string
  name: string
  description: string
  color: string
  icon: IconComponent | string
  onSelect: (id: string) => void
}

export function DemoCard() {
  return ({ id, name, description, color, icon: Icon, onSelect }: DemoCardProps) => {
    const iconContent = typeof Icon === 'function' ? <Icon /> : Icon

    return (
      <button
        type="button"
        on={{
          click() {
            onSelect(id)
          },
        }}
        css={{
          backgroundColor: '#FFFFFF',
          border: '5px solid #2F3542',
          padding: '0',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          position: 'relative',
          boxShadow: '8px 8px 0 #2F3542',
          '&:hover': {
            transform: 'translate(-4px, -4px)',
            boxShadow: '12px 12px 0 #2F3542',
          },
          '&:active': {
            transform: 'translate(2px, 2px)',
            boxShadow: '4px 4px 0 #2F3542',
          },
        }}
      >
        <div
          css={{
            backgroundColor: color,
            padding: '24px',
            borderBottom: '5px solid #2F3542',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '140px',
          }}
        >
          {iconContent}
        </div>
        <div
          css={{
            padding: '28px',
          }}
        >
          <h3
            css={{
              fontSize: '28px',
              fontWeight: '900',
              margin: 0,
              marginBottom: '12px',
              color: '#2F3542',
              textTransform: 'uppercase',
              letterSpacing: '-1px',
            }}
          >
            {name}
          </h3>
          <p
            css={{
              fontSize: '15px',
              color: '#57606F',
              margin: 0,
              lineHeight: 1.5,
              marginBottom: '20px',
              fontWeight: '500',
            }}
          >
            {description}
          </p>
          <div
            css={{
              display: 'inline-block',
              backgroundColor: '#2F3542',
              color: '#FFFBF0',
              padding: '10px 20px',
              fontSize: '13px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Play Now →
          </div>
        </div>
      </button>
    )
  }
}
