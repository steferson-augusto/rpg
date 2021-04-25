const withSign = (points: number): string => {
  if (points === 0) return ''
  if (points > 0) return `+${points}`

  return `${points}`
}

export default withSign
