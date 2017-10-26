import { FETCH_FACTS } from '../../constants/actionTypes';

// maximum number of days
// saved in AsyncStorage
const MAX_FACTS = 10;

// returns the current month and day
const getDate = () => {
        const dateObj = new Date(),
    locale = "en-us",
    // format: October 25
    date = dateObj.toLocaleString(locale, { month: "long", day: "numeric" });
        return date;
}

const defaultState = {
        facts: [],
        selectedDate: getDate(),
        isLoading: false,
        error: false
}

const factsReducer = (state = defaultState, action) => {
        switch(action.type) {
                case `${FETCH_FACTS}_PENDING`:
                        return { ...state, isLoading: true };
                case `${FETCH_FACTS}_FULFILLED`: {
                        const { data } = action.payload;
                        return {
                                ...state,
                                isLoading: false,
                                facts: [
                                ...state.facts.slice(-MAX_FACTS+1),
                                {...data.data, date: data.date}]
                        }
                        break;
                }
                case `${FETCH_FACTS}_REJECTED`:
                        return { ...state, isLoading: false, error: true };
        }
        return state;
}

export default factsReducer;