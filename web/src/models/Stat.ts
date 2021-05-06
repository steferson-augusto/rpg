export default interface Stat {
  id: number
  userId: number
  label: string
  max: number | null
  current: number
  energy: boolean
}
