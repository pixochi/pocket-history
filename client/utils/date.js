const MONTHS =  [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


// converts a date from the state ("October 25")
// to api format date ("10/25")
export const toApiFactDate = (stateDate) => {
  const date = stateDate.split(" ");
  const month = MONTHS.findIndex(x => x === date[0]) + 1;
  const day = date[1];

  return `${month}/${day}`; // 10/25
}

// returns the format of the selected date
// in the state
// format: October 25
export const toStateDate = (dateObj) => {
  const day = dateObj.getDate();
  const month = MONTHS[dateObj.getMonth()];

  return `${month} ${day}`; // October 25
}