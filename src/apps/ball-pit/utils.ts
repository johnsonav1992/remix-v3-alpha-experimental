import { COLORS } from './constants'

export const getRandomColor = (): string => {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}
