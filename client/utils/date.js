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
  for (let i = minLength - 1; i > 0; i--) {
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
export const toFactDate = (timestamp) => {
  const { day, month } = getDateNums(timestamp);
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

  // case when the 'year' contains BC
  let bc = false; // before Christ
  if (year.toUpperCase().indexOf('BC') > -1) {
    bc = true;
  }

  year = parseNumber(year);
  let yearResult;
  let start; // range start
  let end; // range end
  let isStartApproximate = false;
  let isEndApproximate = false;
  const currentYear = new Date().getFullYear();
  const LIFE_EXPECTANCY = 70;
  const MAX_AGE = 105;
  const beginDate = '0000'; // 1st day of the year
  const endDate = '1231' // last day of the year
  let { day, month } = getDateNums(selectedDate);
  day = addLeadingChars(day, 2, '0');
  month = addLeadingChars(month, 2, '0');
  yearText = addLeadingChars(year, 4, '0');

  if (bc) {
    yearText = '-' + yearText;
    year = -year;
  }

  // the range is 1 whole year
  if (category === 'Events') {
    return {
      start: {
        api: yearText + beginDate,
        year,
        month: '00',
        day: '00'
      },
      end: {
        api: yearText + endDate,
        year,
        month: '12',
        day: '31'
      }
    }
  }
  // finds (d. [YEAR]) or (b. [YEAR]), or with BC after [YEAR]
  const matches = str.match(/\([db]. \d+( BC)?\)$/);
  if (!matches){
    // person is maybe still alive
    if (category === 'Births' && year > (currentYear - MAX_AGE) ) {
      end = currentYear + endDate;
      start = yearText + month + day;
      isEndApproximate = true;
    } else { // person is probably dead
      if (category === 'Births') {
        end = year + LIFE_EXPECTANCY;
        isEndApproximate = true;
        isBC = end < 0;
        end *= isBC ? -1 : 1;
        end = addLeadingChars(end, 4, '0')
        end = isBC ? ('-' + end) : end;
        end += endDate;
        start = yearText + month + day;
      } else {
        end = yearText + month + day;
        isStartApproximate = true;
        start = year - LIFE_EXPECTANCY;
        isBC = start < 0;
        start *= isBC ? -1 : 1;
        start = addLeadingChars(start, 4, '0')
        start = isBC ? ('-' + start) : start;
        start += beginDate;
      }   
    }  
  } else {
    yearResultAsNumber = parseNumber(matches[0]);
    let yearResultAsString = addLeadingChars(yearResultAsNumber, 4, '0');

    if (matches[1] === ' BC') {
      yearResultAsNumber = -yearResultAsNumber;
      yearResultAsString = '-' + yearResultAsString;
    }
    
    if (yearResultAsNumber > year) { // yearResult is date of death
      end = yearResultAsString + endDate;
      start = yearText+month+day;
    } else { // yearResult is date of birth
      end = yearText + month + day;
      start = yearResultAsString + beginDate;
    }
  }
  start = {
    ...getDatesFromRangeText(start),
    api: start,
    approximate: isStartApproximate,
  }
  end = {
    ...getDatesFromRangeText(end),
    api: end,
    approximate: isEndApproximate,  
  }
  return { start, end }
}

// -19001231([YYYYMMDD]) to { year: -1900, month: 12, day: 31 }
const getDatesFromRangeText = (rangeText) => {
  const year = parseInt(rangeText.split('').reverse().join('').slice(4).split('').reverse().join(''));
  const month = parseInt(rangeText.slice(-4, -2));
  const day = parseInt(rangeText.slice(-2));
  return { year, month, day }
}