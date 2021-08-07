const normalizeDigits = (str) => {
  if (String(str).length === 1) return `0${str}`;
  return str;
};

export function formatDate(date) {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hour = normalizeDigits(d.getHours()),
    mins = normalizeDigits(d.getMinutes()),
    seconds = normalizeDigits(d.getSeconds());

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [[year, month, day].join('-'), [hour, mins, seconds].join(':')].join(
    ' '
  );
}
