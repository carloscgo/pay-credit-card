/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  flipCardHandler,
  onInputCardHandler,
  onInputCVVHandler,
  onInputExpiredHandler,
  onInputNameHandler,
} from './services'

describe('flipCardHandler', () => {
  const divElement = document.createElement('div')

  document.body.appendChild(divElement)

  const current = {
    current: divElement,
  } as any

  it('show front / back side', () => {
    let action = flipCardHandler('flipToFront', current)

    action()

    expect(divElement.classList.contains('backIsVisible')).toBeFalsy()

    action = flipCardHandler('flipToRear', current)

    action()

    expect(divElement.classList.contains('backIsVisible')).toBeTruthy()

    action = flipCardHandler('flipToFront', current)

    action()

    expect(divElement.classList.contains('backIsVisible')).toBeFalsy()
  })

  it('show with flip', () => {
    let action = flipCardHandler('flip', current)

    action()

    expect(divElement.classList.contains('backIsVisible')).toBeTruthy()

    action = flipCardHandler('flip', current)

    action()

    expect(divElement.classList.contains('backIsVisible')).toBeFalsy()

    action = flipCardHandler('flip', current)

    action()

    expect(divElement.classList.contains('backIsVisible')).toBeTruthy()
  })
})

describe('onInputCardHandler', () => {
  let mockEvent: any
  const mockUpdateCreditCardData = jest.fn()

  const inputElement = document.createElement('input')
  inputElement.value = ''

  document.body.appendChild(inputElement)

  beforeEach(() => {
    // Set-up the mock event object
    mockEvent = {
      target: inputElement,
    }
  })

  it('should call updateCreditCardData with type and numberCard', () => {
    const value = '4916338506082832'
    const expectedFormattedNumber = '4916 3385 0608 2832'
    const cardType = 'Visa'

    mockEvent.target.value = value

    onInputCardHandler(mockEvent, mockUpdateCreditCardData)

    expect(mockUpdateCreditCardData).toHaveBeenCalledWith('type', cardType)
    expect(mockUpdateCreditCardData).toHaveBeenCalledWith(
      'numberCard',
      expectedFormattedNumber
    )
  })
})

describe('onInputCVVHandler', () => {
  let mockEvent: any
  const mockUpdateCreditCardData = jest.fn()

  const inputElement = document.createElement('input')
  inputElement.value = ''

  document.body.appendChild(inputElement)

  beforeEach(() => {
    // Set-up the mock event object
    mockEvent = {
      target: inputElement,
    }
  })

  it('should call updateCreditCardData with type and ccv', () => {
    const value = '123'
    const expectedFormattedNumber = '123'

    mockEvent.target.value = value

    onInputCVVHandler(mockEvent, mockUpdateCreditCardData)

    expect(mockUpdateCreditCardData).toHaveBeenCalledWith(
      'ccv',
      expectedFormattedNumber
    )
  })
})

describe('onInputExpiredHandler', () => {
  let mockEvent: any
  const mockUpdateCreditCardData = jest.fn()

  const inputElement = document.createElement('input')
  inputElement.value = ''

  document.body.appendChild(inputElement)

  beforeEach(() => {
    // Set-up the mock event object
    mockEvent = {
      target: inputElement,
    }
  })

  it('should call updateCreditCardData with type and expireDate', () => {
    const value = '1212'
    const expectedFormattedNumber = '12/12'

    mockEvent.target.value = value

    onInputExpiredHandler(mockEvent, mockUpdateCreditCardData)

    expect(mockUpdateCreditCardData).toHaveBeenCalledWith(
      'expireDate',
      expectedFormattedNumber
    )
  })
})

describe('onInputNameHandler', () => {
  let mockEvent: any
  const mockUpdateCreditCardData = jest.fn()

  const inputElement = document.createElement('input')
  inputElement.value = ''

  document.body.appendChild(inputElement)

  beforeEach(() => {
    // Set-up the mock event object
    mockEvent = {
      target: inputElement,
    }
  })

  it('should call updateCreditCardData with type and holderName', () => {
    const value = 'Carlos Camacho'
    const expectedFormattedNumber = 'Carlos Camacho'

    mockEvent.target.value = value

    onInputNameHandler(mockEvent, mockUpdateCreditCardData)

    expect(mockUpdateCreditCardData).toHaveBeenCalledWith(
      'holderName',
      expectedFormattedNumber
    )
  })
})
