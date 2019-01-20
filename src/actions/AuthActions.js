import axios from 'axios';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  NAME_CHANGED,
  CODE_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER_SUCCESS,
  FETCH_USER,
  UPDATE_USER_PROFILE_FIELD,
  SET_USER_TYPE,
  SHOW_LINK} from './types';

  const BASE_URL = '/api/auth';
  export const emailChange = (value) => {
    return {
      type:EMAIL_CHANGED,
      payload: value
    }
  }

  export const passwordChange = (value) => {
    return {
      type: PASSWORD_CHANGED,
      payload: value
    }
  }


  export const nameChange = (value) => {
    return {
      type: NAME_CHANGED,
      payload: value
    }
  }

  export const codeChange = (value) => {
    return {
      type: CODE_CHANGED,
      payload: value
    }
  }


  export const checkForLogin = (history) => async dispatch => {
    history.push('/dashboard');
  }

  export const loginUser = ({email, password}, history) => {
    return async (dispatch) => {
      dispatch({type:LOGIN_USER});
      const url = `${BASE_URL}/login`
      const payload = {
        user: {
          email,
          password
        }
      };
      try {
          const res = await axios.post(url, payload);
          localStorage.setItem('userToken',res.data.token);
          dispatch({type:LOGIN_USER_SUCCESS});
          dispatch({type: FETCH_USER, payload: res.data});
          history.push('/dashboard');
      }catch(err){
         dispatch({
          type: LOGIN_USER_FAILED,
          payload: err.response
        });
      }
    }
  };

export const signupUser = ({name, email, password}, history) => {
  return async (dispatch) => {
    dispatch({type:LOGIN_USER});

    const url = `${ BASE_URL }/registration`;
    const payload = { user: { name, email, password } };

    const res = await axios.post(url, payload);
    if(res.status === 200){
      localStorage.setItem('userToken',res.data.token);
      dispatch({type:LOGIN_USER_SUCCESS, payload: res.data});
      history.push('/dashboard');
    } else {
      dispatch({type: LOGIN_USER_FAILED,payload: res.data});
    }
  }
};

export const logoutUser = (history) => async dispatch => {
  const token = localStorage.getItem('userToken');
  const url = `${BASE_URL}/logout`;
  try{
    const res = await axios.get(url,{headers: {"Authorization": `bearer ${token}`}});
    localStorage.removeItem('userToken');
    dispatch({type: LOGOUT_USER_SUCCESS });
    history.push('/');
  }catch(err){
      dispatch({type: SHOW_LINK,payload: { showLinkFlag: false}});
      history.push('/');
  }
}

export const showLoginLink = () => dispatch => {
    return dispatch({
        type: SHOW_LINK,
        payload: { showLinkFlag: true}
    });
  };

  export const showSignupLink = () => dispatch => {
    console.log('showsignuplink')
    return dispatch ({
        type: SHOW_LINK,
        payload: { showLinkFlag: false}
    });
  };

  export const fetchUser = () => async dispatch => {
    const token = localStorage.getItem('userToken');
    if(!token) return dispatch({type: FETCH_USER, payload: null});

    const url = `${BASE_URL}/current_user`;
    const res = await axios.get(url,{headers: {"Authorization": `bearer ${token}`}});
    console.log(res);
    dispatch({type: FETCH_USER, payload: res.data});
  };

  export const loginAdmin = ({email, password, code}, history) => {
    return async (dispatch) => {
      dispatch({type:LOGIN_USER});
      const url = `${BASE_URL}/admin/login`
      const payload = {
          email,
          password,
          vCode:code
      };
      try {
          const res = await axios.post(url, payload);
          localStorage.setItem('userToken',res.data.token);
          dispatch({type:LOGIN_USER_SUCCESS,payload: res.data});
          history.push('/admin/dashboard');
      }catch(err){
        dispatch({type: LOGIN_USER_FAILED, payload: err.response.data});
      }
    }
  };


  export const userProfileUpdateEachField = ({prop, value}) => {
  return {
      type: UPDATE_USER_PROFILE_FIELD,
      payload: { prop, value}
  }
};

export const userProfileUpdate = (newUserData, oldUserData) => async dispatch => {
  newUserData._id = oldUserData._id;
  newUserData._rev = oldUserData._rev;
  console.log(newUserData);
  const token = localStorage.getItem('userToken');
  if(!token) return dispatch({type: FETCH_USER, payload: null});
  const url = `/api/user/upadte`;
  try{
  const res = await axios.post(
    url,
    {...newUserData},
    {headers:{"Authorization": `bearer ${token}`}}
   );
   console.log(res);
   dispatch({type: FETCH_USER, payload: res.data});
  }catch (err){
    console.log(err.response);
  }
}

export const setUserType = (userType) => {
  return {
    type: SET_USER_TYPE,
    payload: userType
  }
}
