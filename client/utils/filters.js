import _ from 'lodash';
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


export const filterTimelineByDate = (data, range) => {
	if (_.isEmpty(range)) { return data; }

	let { start, end } = range;

	const filteredData = data.filter(d => {
		const	[year, month, day] = d.date.split('/').map(val => parseInt(val));
		if (start.month && month >= start.month && month <= end.month) {
			return d;
		}
		if (start.year && year >= start.year && year <= end.year) {
			return d;
		}
	});

	return filteredData;
}

// @param data obj[] - data for sorting
// @param sortOrder enum['latest', 'oldest']
// @param dateKey string - key of an object property to sort by
// 	e.g. 'date', 'year'
export const sortByDate = (data, sortOrder, dateKey) => {
	if (!data.length) { return data }
	// first checks if data is already in the correct order
	let firstDate = parseNumber(data[0][dateKey]);
	let lastDate = parseNumber(data[data.length-1][dateKey]);

	firstDate *= firstDate < 10000 ? 10000 : 1;
	lastDate *= lastDate < 10000 ? 10000 : 1;

	const currentSortOrder = (firstDate > lastDate) ? 'latest' : 'oldest';

	if (sortOrder === currentSortOrder) {
		return data;
	}
	return data.reverse();
}