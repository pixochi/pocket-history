import { 
  CLOSE_MODAL,
  OPEN_MODAL
} from '../../constants/actionTypes';


const defaultState = {
  isVisible: false,
  currentName: null
}

const modalReducer = (state = defaultState, action) => {
  switch(action.type) {
    case OPEN_MODAL:
      return { ...state, isVisible: true, currentName: action.currentName };
    case CLOSE_MODAL: 
      return { ...state, isVisible: false, currentName: null };
    default: 
      return state;
  }
}

export default modalReducer;