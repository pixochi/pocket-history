import _ from 'lodash';


// add images to facts in one of the categories
export const addImagesToFacts = (images, facts) => {
	
	if (!images || !facts) {
		return facts;
	}

	console.log('ADDING IMAGES TO FACTS')

	const imagesArr = _.values(images);

	for (let i in facts) {
		const currTitle = _.get(facts[i], 'links[0].title', '');
		const image = imagesArr.find(img => img.title === currTitle);

		if (image && image.thumbnail) {
			facts[i].img = image.thumbnail.source;
		}
	}

	return facts;
}

// @param facts obj[0] - facts for a selected date and category
export const getTitlesFromFacts = (facts) => {

	const factsTitles = facts.map(fact => {
		const factTitle = _.get(fact, 'links[0].title', 'This fact does not have any links');
		return factTitle;
	});

	return factsTitles;
}