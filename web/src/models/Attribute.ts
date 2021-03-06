import Dice from './Dice'

export type AttributeLabel =
  | 'Força'
  | 'Vigor'
  | 'Agilidade'
  | 'Espírito'
  | 'Astúcia'

export default interface Attribute {
  id?: number
  userId?: number
  label: AttributeLabel
  dices: Dice[]
}
