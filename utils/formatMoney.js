function formatMoney(number, symbol = '', code = '') {
  if (isNaN(number) || !number) return '';
  if (symbol !== '') {
    return `${symbol}${(Number(number)).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1.')}`;
  }
  if (code !== '') {
    return `${(Number(number)).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1.')} ${code}`;
  }

  return `${(Number(number)).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1.')}`;
}

export default formatMoney;
