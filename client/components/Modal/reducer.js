import { 
  CLOSE_MODAL,
  OPEN_MODAL
} from '../../constants/actionTypes';


const defaultState = {
  isVisible: false
}

const modalReducer = (state = defaultState, action) => {
  switch(action.type) {
    case OPEN_MODAL:
      return { ...state, isVisible: true };
    case CLOSE_MODAL: 
      return { ...state, isVisible: false };
    default: 
      return state;
  }
}

export default modalReducer;