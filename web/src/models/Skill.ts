import Dice from './Dice'

export default interface Skill {
  id: number
  userId: number
  label: string
  dices: Dice[]
  powerPoints: number
  pinned: boolean
}
