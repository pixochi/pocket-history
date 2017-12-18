import { NAVIGATION_CHANGE, NAVIGATION_CHANGE_FACTS } from '../constants/actionTypes';


export const changeRoute = (route) => {
	return {
		type: NAVIGATION_CHANGE,
		route
	}
}

export const changeRouteOnDay = (route) => {
	return {
		type: NAVIGATION_CHANGE_FACTS,
		route
	}
}