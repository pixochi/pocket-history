const MONTHS =  [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


// converts a date from the state ("October 25")
// to api format date ("10/25")
export const toApiFactDate = (timestamp) => {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${month}/${day}`; // 10/25
}

// returns the format of the selected date
// in the state
// format: October 25
export const toFactDate = (timestamp) => {
	const date = new Date(timestamp);
  const day = date.getDate();
  const month = MONTHS[date.getMonth()];

  return `${month} ${day}`; // October 25
}

export const toCalendarDate = (timestamp) => {
	const date = new Date(timestamp);
	const year = date.getFullYear();
  const month = ('0' + (date.getMonth()+1)).slice(-2); // adds a leading zero if month < 10
  const day = ('0' + date.getDate()).slice(-2); // adds a leading zero if day < 10

  return `${year}-${month}-${day}`; // 2017-11-03
}