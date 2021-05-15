export interface Modifier {
  id: number
  statId: number
  label: string
  value: number
  description: string | null
}

export default interface Stat {
  id: number
  userId: number
  label: string
  max: number | null
  current: number
  energy: boolean
  modifiers?: Modifier[]
}
