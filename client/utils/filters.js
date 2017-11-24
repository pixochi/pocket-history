// @param data obj[] - data for filtering
// @param searchValue string - text which must be found in searchIn
// @param searchIn string[] - keys of data objects to search searchValue in
// @return array - result after filtering
export const filterBySearch = (data, searchValue, searchIn) => {
  const filteredData = data.filter(obj => {
    for (key of searchIn) {
      if (obj[key] && obj[key].toLowerCase().includes(searchValue.toLowerCase())) {
        return obj;
      }
    }
  })
  return filteredData;
}