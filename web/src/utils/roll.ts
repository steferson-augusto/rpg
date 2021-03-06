export interface RollValues {
  total: number
  fixed: number
  critical: number
  history: number[]
}

const roll = (dices: string[]): RollValues => {
  const values = dices.reduce<RollValues>(
    (result, dice) => {
      if (dice.includes('d')) {
        const [num, face] = dice.split('d')
        const quantity = Number(num) || 1
        const max = Number(face)
        if (max <= 1) {
          result.total += 1
          return result
        }

        for (let index = 0; index < quantity; index++) {
          let rolagem = Math.floor(Math.random() * max) + 1
          result.total += rolagem
          result.history.push(rolagem)
          while (rolagem === max) {
            rolagem = Math.floor(Math.random() * max) + 1
            result.total += rolagem
            result.critical += rolagem
          }
        }
      } else {
        result.fixed += Number(dice)
        result.total += Number(dice)
      }

      return result
    },
    { total: 0, fixed: 0, critical: 0, history: [] } as RollValues
  )

  return values
}

export default roll
