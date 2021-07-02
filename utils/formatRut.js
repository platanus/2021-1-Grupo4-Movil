
function formatRut(value) {
  let rut = value.replace(/[^kK\d]/g, '');
  const rutLength = 10;
  if (rut.match(/^(\d{1,3})(\w{1})$/)) {
    rut = rut.replace(/^(\d{1,3})(\w{1})$/, '$1-$2');
  } else if (rut.match(/^(\d{1,3})(\d{3})(\w{1})$/)) {
    rut = rut.replace(/^(\d{1,3})(\d{3})(\w{1})$/, '$1.$2-$3');
  } else if (rut.match(/^(\d{1,3})(\d{3})(\d{3})(\w{1})$/)) {
    rut = rut.replace(/^(\d{1,3})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
  } else {
    rut = rut.substr(0, rutLength).replace(/^(\d{1,3})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
  }

  return rut;
}

export default formatRut;
