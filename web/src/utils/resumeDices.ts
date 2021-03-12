interface Spread {
  spread: string[]
  fixed: number
}

interface Resume {
  result: string
  ocurred: string[]
}

const bonus = [['d4'], ['d6'], ['d8'], ['d10'], ['d12'], ['d12', 'd4']]

export default (values: string[]): string => {
  const { spread, fixed } = values.reduce<Spread>(
    (result, value) => {
      const [dice, dumpFix] = value.split('+')
      const fix = Number(dumpFix ?? 0)

      result.spread.push(dice)
      if (fix > 0) {
        result.spread.push(...bonus[fix - 1])
        result.fixed += fix
      }

      return result
    },
    { spread: [], fixed: 0 }
  )

  let { result } = spread.reduce<Resume>(
    (final, dice) => {
      if (!final.ocurred.includes(dice)) {
        final.ocurred.push(dice)
        const quantity = spread.filter(v => v === dice).length
        final.result += `${quantity > 1 ? quantity : ''}${dice} `
      }

      return final
    },
    { result: '', ocurred: [] }
  )

  result += fixed > 0 ? `+${fixed}` : ''
  return result
}
