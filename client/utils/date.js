const MONTHS =  [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

//remove strings from the beginning and end of string
const parseNumber = (str) => {
  if (typeof str !== 'string' || !str) return false;

  const number = parseInt(str.replace( /^\D+/g, ''));
  return number;
}

// @return day, month, year in numbers
// 1st month is 0
const getDateNums = (timestamp) => {
  if (!isNumber(timestamp)) return false;
  const date = new Date(timestamp);
  const month = date.getMonth() 
  const day = date.getDate();
  const year = date.getFullYear();
  console.log({ day, month, year })
  return { day, month, year };
}

const isNumber = (val) => {
  if (!val || typeof val !== 'number' ) return false;
  return true;
}

// @param val string/number - initial value
// @param minLength int - minimal length of the final string
// @param leadingChar string - leading character if val is shorther than minLength
const addLeadingChars = (val, minLength, leadingChar) => {
  if (val.length >= minLength) return val;
  let chars = '';
  for (let i = minLength - 1; i >= 0; i--) {
    chars += leadingChar;
  }
  const result = (chars + (val)).slice(-minLength);
  return result;
}

// converts a date from the state ("October 25")
// to api format date ("10/25")
export const toApiFactDate = (timestamp) => {
  if (!isNumber(timestamp)) return false;
  const { day, month } = getDateNums(timestamp);
  return `${month+1}/${day}`; // 10/25
}

// news api format date ("october/25")
export const toApiNewsDate = (timestamp) => {
  if (!isNumber(timestamp)) return false;
  const { day, month } = getDateNums(timestamp);
  const monthText = MONTHS[month].toLowerCase();
  return `${monthText}/${day}`; // october/25
}

// returns the format of the selected date
// in the state
// format: October 25
export const toFactDate = (date) => {
  const { day, month } = getDateNums(date.getTime());
  const monthText = MONTHS[month];
  return `${monthText} ${day}`; // October 25
}

export const toCalendarDate = (timestamp) => {
  if (!isNumber(timestamp)) return false;
  const { day, month, year } = getDateNums(timestamp);
  const _month = addLeadingChars(month+1, 2, '0') // adds a leading zero if month < 10
  const _day = addLeadingChars(day, 2, '0')  // adds a leading zero if day < 10
  return `${year}-${_month}-${_day}`; // 2017-11-03
}

export const yearsAgo = (year) => {
  const currentYear = new Date().getFullYear();
  const yearNumber = parseNumber(year);
  if (year.indexOf('BC') > -1) {
    return (currentYear + yearNumber);
  } 
  return currentYear - yearNumber;
}

// @param str string - text which contains (d. [YEAR]) or (b. [YEAR])
// @param category string - enum ['Births', 'Deaths'], because
//  some of the texts don't contain either (d. [YEAR]) or (b. [YEAR])
// @param selectedDate timestamp - date of a birth or death
// @param year int - year of a birth or death
// @return object{beginDate, endDate}, both format: [YYYYMMDD]
export const dateRangeFromString = (str, category, selectedDate, year) => {
  let yearResult;
  let rangeStart;
  let rangeEnd;
  const currentYear = new Date().getFullYear();
  const LIFE_EXPECTANCY = 70;
  const MAX_AGE = 105;
  const beginDate = '0000'; // 1st day of the year
  const endDate = '1231' // last day of the year
  let { day, month } = getDateNums(selectedDate);
  day = addLeadingChars(day, 2, '0');
  month = addLeadingChars(month, 2, '0');
  yearText = addLeadingChars(year, 4, '0');

  const matches = str.match(/\([db].\d+\)$/); // finds (d. [YEAR]) or (b. [YEAR])
  if (!matches){
    // person is maybe still alive
    if (category === 'Births' && year > (currentYear - MAX_AGE) ) {
      rangeEnd = currentYear + endDate;
      rangeStart = yearText + month + day;
    } else {
      if (category === 'Births') {
        rangeEnd = (year + LIFE_EXPECTANCY) + endDate;
        rangeStart = yearText + month + day;  
      } else {
        rangeEnd = yearText + month + day;
        rangeStart = (year - LIFE_EXPECTANCY) + beginDate;
      }   
    }  
  } else {
    yearResult = parseNumber(matches[0]);
    if (yearResult > year) { // yearResult is date of death
      rangeEnd = yearResult + endDate;
      rangeStart = yearText+month+day;
    } else { // yearResult is date of birth
      rangeEnd = yearText + month + day;
      rangeStart = yearResult + beginDate;
    }
  }
  return { rangeStart, rangeEnd }
}