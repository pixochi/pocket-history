// take into account only words which
// start with a capital letter
export const optimizeQuery = (queryText) => {
	const words = queryText.split(' ');
	let startsWithCapital = [];

	words.forEach((w) => {
		if(w[0] === w[0].toUpperCase()){
	  	startsWithCapital.push(w);
	  }
	});

	const optimizedQuery = startsWithCapital.join(' ');

	return optimizedQuery;
}