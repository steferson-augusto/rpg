import resumeDices from '../../utils/resumeDices'

describe('Utils - resumesDices', () => {
  test('Deve converter dados em string resumida', () => {
    let result = resumeDices(['d12+6', 'd10'])
    expect(result).toBe('2d12 d4 d10 +6')

    result = resumeDices(['d4', '-2'])
    expect(result).toBe('d4 -2 ')

    result = resumeDices(['d12+6', 'd12+5', 'd12+4', 'd10'])
    expect(result).toBe('5d12 d4 2d10 +15')
  })
})
