export default function formatPhone(value) {
  let phone = (value === '+56 ') ?
    value.replace('+56 ', '').replace(/[^\d]/g, '') :
    value.replace('+56', '').replace(/[^\d]/g, '');
  if (phone.match(/^(\d{1,4})(\d{4})$/)) {
    phone = phone.replace(/^(\d{1,4})(\d{4})$/, '$1 $2');
  } else {
    phone = phone.substr(0, 9).replace(/^(\d{1})(\d{4})(\d{4})$/, '$1 $2 $3');
  }

  return `+56 ${phone}`;
}
