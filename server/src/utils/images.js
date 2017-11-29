import _ from 'lodash';


const WIKI_IMG_ROOT_URL = 'https://upload.wikimedia.org/wikipedia/';

export const optimizeImageSource = (source) => {
	// get only the part which is unique for each image
	// removes 'https://upload.wikimedia.org/wikipedia' from the beginning
	const match = source.match(/(en|commons)\/thumb\//);
	source = source.slice(match.index);

	// replace en|commons with e|c and remove 'thumb' from the path
	source = source.slice(0,1) + source.slice(match[1].length);
	source = source.replace(/([ec])\/thumb\//,'$1/');

	return source;
}

// reversed 'optimizeImageSource'
export const getFullImageSource = (source) => {
	if (!source) { return false; }

	let urlSegment;
	if (source[0] === 'e') {
		urlSegment = 'en';
	} else {
		urlSegment = 'commons';
	}
	source = urlSegment + source.slice(1);

	const firstSlashIndex = source.indexOf('/');
	source = WIKI_IMG_ROOT_URL + source.slice(0, firstSlashIndex+1) + 'thumb' + source.slice(firstSlashIndex);

	return source;
}

// sorts the array of returned images from wiki
// because they are sorted by page IDs
export const sortByTitles = (data, titles) => {
	if (_.isEmpty(titles) || data === null) {
		return false;
	}

	let sortedData = [];

	for (let imgInfo of data) {
		for (let i in titles) {
	  	if(imgInfo.title === titles[i]) {
	      sortedData[i] = imgInfo;
	      break;
	    }
	  }
	}

	return sortedData;
}