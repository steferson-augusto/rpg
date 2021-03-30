import React from 'react'

import { render, waitFor } from '../index'
import Attributes from '../../pages/Attributes'
import { fireEvent } from '@testing-library/dom'

jest.mock('lottie-web')

describe('Tela de atributos', () => {
  test('deve renderizar atributos', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        writeText: jest.fn(async () => {})
      }
    })

    jest.spyOn(navigator.clipboard, 'writeText')

    const { container, findByTestId, getByTestId, getAllByTestId } = render(
      <Attributes />
    )
    expect(container).toBeInTheDocument()

    const label = await findByTestId('attr-label')
    expect(label.textContent).toBe('Agilidade: d6 ')

    const resume = await findByTestId('attr-resume')
    expect(resume.textContent).toBe('d6 ')

    const dice = await findByTestId('attr-dice')
    expect(dice.textContent).toBe('d6')

    const btnEdit = getByTestId('btn-edit')
    expect(btnEdit).toBeInTheDocument()

    const btnAdd = getByTestId('btn-add')
    expect(btnAdd).toBeInTheDocument()

    fireEvent.click(btnEdit)

    let btnPlus = getByTestId('btn-plus')
    let btnMinus = getByTestId('btn-minus')
    expect(btnPlus).toBeInTheDocument()
    expect(btnMinus).toBeInTheDocument()

    fireEvent.click(btnEdit)
    expect(btnPlus).not.toBeInTheDocument()
    expect(btnMinus).not.toBeInTheDocument()
    fireEvent.click(btnEdit)
    btnPlus = getByTestId('btn-plus')
    btnMinus = getByTestId('btn-minus')

    // const btnDelete = getByTestId('btn-delete')
    // expect(btnDelete).toBeInTheDocument()

    fireEvent.click(btnMinus)
    expect(resume.textContent).toBe('d4 ')
    expect(dice.textContent).toBe('d4')
    // expect(btnMinus).not.toBeInTheDocument()

    let btnDelete = getByTestId('btn-delete')
    expect(btnDelete).toBeInTheDocument()

    fireEvent.click(btnDelete)
    expect(resume.textContent).toBe('d4 ')

    fireEvent.click(btnPlus)
    expect(resume.textContent).toBe('d6 ')
    expect(dice.textContent).toBe('d6')

    fireEvent.click(btnAdd)
    const dices = getAllByTestId('attr-dice')
    const plus = getAllByTestId('btn-plus')

    expect(dices.length).toBe(2)
    expect(resume.textContent).toBe('d6 d4 ')
    expect(dices[1].textContent).toBe('d4')

    fireEvent.click(plus[1])
    expect(resume.textContent).toBe('2d6 ')
    expect(dices[1].textContent).toBe('d6')

    const minus = getAllByTestId('btn-minus')
    fireEvent.click(minus[1])
    expect(resume.textContent).toBe('d6 d4 ')
    expect(dices[1].textContent).toBe('d4')

    btnDelete = getByTestId('btn-delete')
    fireEvent.click(btnDelete)
    expect(resume.textContent).toBe('d6 ')
    expect(dices[1]).not.toBeInTheDocument()

    await waitFor(() => fireEvent.click(resume))
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1)
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('d6 ')
  })

  // testar visualização de mestre
  // testar rolagem de atributo
})
