function minutesToHoursText(minutes) {
  const hoursInMinutes = 60;
  const hours = Math.trunc(minutes / hoursInMinutes);
  const minutesLeft = minutes % hoursInMinutes;
  const hoursText = (hours === 1) ? 'hora' : 'horas';
  const minutesText = (minutesLeft === 1) ? 'minuto' : 'minutos';

  if (hours) {
    return (`${hours} ${hoursText} ${minutesLeft} ${minutesText}`);
  }

  return (`${minutesLeft} ${minutesText}`);
}

export default minutesToHoursText;
