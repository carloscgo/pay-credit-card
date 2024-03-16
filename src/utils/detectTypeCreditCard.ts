export enum ETypeCreditCards {
  maestro = 'Maestro',
  visa = 'Visa',
  mastercard = 'Mastercard',
  amex = 'Amex',
  diners = 'Diners',
  discover = 'Discover',
  jcb = 'Jcb',
}

const getCardType = (number: string): string | null => {
  const regExpCards = {
    [ETypeCreditCards.maestro]:
      /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
    [ETypeCreditCards.visa]: /^4[0-9]{12}(?:[0-9]{3})?$/,
    [ETypeCreditCards.mastercard]:
      /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/,
    [ETypeCreditCards.amex]: /^3[47][0-9]{13}$/,
    [ETypeCreditCards.diners]: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    [ETypeCreditCards.discover]: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    [ETypeCreditCards.jcb]: /^(?:2131|1800|35\d{3})\d{11}$/,
  }

  for (const key in regExpCards) {
    const regexKey = key as keyof typeof regExpCards

    if (regExpCards[regexKey].test(number)) {
      return regexKey
    }
  }

  return null
}

export default getCardType
