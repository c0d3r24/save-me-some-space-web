import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  NAME_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGIN_USER,
  LOGOUT_USER_SUCCESS,
  FETCH_USER,
  UPDATE_USER_PROFILE_FIELD,
  CODE_CHANGED,
  SHOW_LINK,SET_USER_TYPE } from './../actions/types';

  const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false,
    message: '',
    name:'',
    showLinkFlag: false,
    code:'',
    degree: '',
    linkedin:'',
    portfolio: '',
    interest:'',
    major:'',
    github:'',
    userType: ''
  }

export default (state = INITIAL_STATE, action) => {
  //console.log(action);
  switch(action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return {...state, password: action.payload};
    case CODE_CHANGED:
    return {...state, code: action.payload};
    case NAME_CHANGED:
      return {...state, name: action.payload};
    case LOGIN_USER_SUCCESS:
      return {...state, loading: false};
    case LOGIN_USER_FAILED:
      console.log(action);
      return {...state, password: '', error: 'Authentication failed', message: action.payload.message}
    case LOGIN_USER:
      return { ...state, loading: true, error: '', message: ''};
    case LOGOUT_USER_SUCCESS:
      return {...state, ...INITIAL_STATE};
    case SHOW_LINK:
      return {...state, showLinkFlag: action.payload.showLinkFlag};
    case FETCH_USER:
            if(!action.payload){
              return { ...state, ...INITIAL_STATE}
            }
            // const { name, degree, linkedin, portfolio, interest, major, github, email } = action.payload.user;
            const message = action.payload.message || null;
            const user = action.payload.user || null;
             return {  ...state,
               user,
               message,
               name: user.name || '', degree: user.degree || '',
               linkedin: user.linkedin || '', portfolio: user.portfolio || '',
               interest: user.interest || '', major: user.major || '',
               github: user.github || '', email: user.email || ''
             };
    case UPDATE_USER_PROFILE_FIELD:
        return { ...state, [action.payload.prop]: action.payload.value };
    case SET_USER_TYPE:
      return {...state, userType: action.payload}
    default:

    return state;
  }
}
