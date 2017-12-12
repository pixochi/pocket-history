// @param val string/number - initial value
// @param minLength int - minimal length of the final string
// @param leadingChar string - leading character if val is shorther than minLength
export const addLeadingChars = (val, minLength, leadingChar) => {
  if (val.length >= minLength) return val;
  let chars = '';
  for (let i = minLength - 1; i > 0; i--) {
    chars += leadingChar;
  }
  const result = (chars + (val)).slice(-minLength);
  return result;
}