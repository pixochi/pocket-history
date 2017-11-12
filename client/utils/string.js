export const removeHtmlTags = (str) => {
  if ((str == null) || (str === '')) return false;
  return str.replace(/<[^>]*>/g, '');
}

// e.g., &#64; -> @
export const replaceHtmlChars = (str) => {
	if (!str) return false;

  return str.replace(/&[^>]*;/g, (htmlChar) => {
  	const charCode = parseInt(htmlChar.replace( /^\D+/g, ''));
  	return String.fromCharCode(charCode);
  });
}