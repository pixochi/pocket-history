const getMonthFromString = (month) => {
        const timestamp = Date.parse(month + "25, 2017");
        if(!isNaN(timestamp)){
                return new Date(timestamp).getMonth() + 1;
        }
        return -1;
}

// converts a text date ("October 25")
// to api format date ("10/25")
export const textDateToNumbers = (textDate) => {
  const date = textDate.split(" ");
  const month = getMonthFromString(date[0]);
  const day = date[1];

  return `${month}/${day}`;
}