import axios from 'axios';

import { 
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  FETCH_FAVORITE
} from '../../constants/actionTypes';


export const f = () => dispatch => {


dispatch({ type: ADD_FAVORITE, payload: 'factsPromise' })
  .catch(e => console.log(e));
}