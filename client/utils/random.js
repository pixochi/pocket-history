
// returns a random integer between min and max, both inclusive
export const getRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}