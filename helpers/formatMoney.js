function formatMoney(number, symbol = '', code = '') {
  if (isNaN(number)) return '';
  if (symbol !== '') {
    return `${symbol}${(number).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1.')}`;
  }
  if (code !== '') {
    return `${(number).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1.')} ${code}`;
  }

  return `${(number).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1.')}`;
}

export default formatMoney;
