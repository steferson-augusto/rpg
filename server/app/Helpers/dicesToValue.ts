const values = new Map([
  ['d4', 4],
  ['d6', 6],
  ['d8', 8],
  ['d10', 10],
  ['d12', 12],
  ['d12+1', 14],
  ['d12+2', 16],
  ['d12+3', 18],
  ['d12+4', 20],
  ['d12+5', 22],
  ['d12+6', 24]
])

const dicesToValue = (dices: string[]) => {
  const result = dices.reduce<number>((sum, dice) => {
    const value = values.get(dice) || 0
    return sum + value
  }, 0)

  return result
}

export default dicesToValue
