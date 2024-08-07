export const getCardType = (cardNumber: string): string | null => {
  const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
  const mastercardRegex = /^5[1-5][0-9]{14}$/;
  const amexRegex = /^3[47][0-9]{13}$/;

  if (visaRegex.test(cardNumber)) {
    return "Visa";
  } else if (mastercardRegex.test(cardNumber)) {
    return "Mastercard";
  } else if (amexRegex.test(cardNumber)) {
    return "Amex";
  } else {
    return null;
  }
};
