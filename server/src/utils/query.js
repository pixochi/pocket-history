import _ from 'lodash';


// take into account only words which
// start with a capital letter
export const optimizeQuery = (queryText) => {
	const words = queryText.split(' ');

	if (words.length === 0) {
		return queryText;
	}

	let startsWithCapital = [];

	words.forEach((w) => {
		const charCode = w.charCodeAt(0);
		if(charCode > 64 && charCode < 91){
	  	startsWithCapital.push(w);
	  }
	});

	startsWithCapital = _.uniq(startsWithCapital);

	const optimizedQuery = startsWithCapital.join(' ');

	return optimizedQuery;
}