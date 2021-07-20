function regexNumber(text, isFloat = true) {
  if (isFloat) {
    const newNumberMatch = text.match(/\d+[,|.]{0,1}\d*/);

    return newNumberMatch ? newNumberMatch[0] : '';
  }

  return text.replace(/[^0-9]/, '');
}

export default regexNumber;
