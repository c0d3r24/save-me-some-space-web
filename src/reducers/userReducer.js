import {FETCH_USERS, FETCH_USER} from  './../actions/types';
const INITIAL_STATE = {
  users:[],
  projectCount:'',
  userCount: '',
  error: '',
  loading:false,
  message:'',

}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
  case FETCH_USERS:
      return {...state, users : action.payload.users };
    default:
      return state;
  }
}
