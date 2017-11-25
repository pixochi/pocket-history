import { parseNumber } from './date';


// @param data obj[] - data for filtering
// @param searchValue string - text which must be found in searchIn
// @param searchIn string[] - keys of data objects to search searchValue in
// @return array - result after filtering
export const filterBySearch = (data, searchValue, searchIn) => {
	if (!searchValue || !searchIn.length || !searchIn[0]) { return data; }

  const filteredData = data.filter(obj => {
    for (key of searchIn) {
      if (obj[key] && obj[key].toLowerCase().includes(searchValue.toLowerCase())) {
        return obj;
      }
    }
  });
  
  return filteredData;
}

// @param data obj[] - data for sorting
// @param sortOrder enum['latest', 'oldest']
// @param dateKey string - key of an object property to sort by
// 	e.g. 'date', 'year'
export const sortByDate = (data, sortOrder, dateKey) => {
	if (!data.length) { return [] }
	// first checks if data is already in the correct order
	const firstDate = parseNumber(data[0][dateKey]);
	const lastDate = parseNumber(data[data.length-1][dateKey]);
	const currentSortOrder = (firstDate > lastDate) ? 'latest' : 'oldest';

	if (sortOrder === currentSortOrder || firstDate === lastDate) {
		return data;
	}
	return data.reverse();
}