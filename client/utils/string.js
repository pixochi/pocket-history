export const removeHtmlTags = (str) => {
  if (typeof str !== 'string' || str === '') return false;
  return str.replace(/<[^>]*>/g, '');
}

// e.g., &#64; -> @
export const replaceHtmlChars = (str) => {
	if (typeof str !== 'string' || str === '') return false;

  return str.replace(/&[^>]*;/g, (htmlChar) => {
  	const charCode = parseInt(htmlChar.replace( /^\D+/g, ''));
  	return String.fromCharCode(charCode);
  });
}