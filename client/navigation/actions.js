import { NAVIGATION_CHANGE } from '../constants/actionTypes';


export const changeRoute = (route) => {
	return {
		type: NAVIGATION_CHANGE,
		route
	}
}