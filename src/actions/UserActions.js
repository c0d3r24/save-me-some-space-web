import axios from 'axios';
import { FETCH_USERS, FETCH_USER} from './types';


const BASE_URL = '/api/users';

  export const fetchUsers = () => async dispatch => {
     const url = BASE_URL;
     const token = localStorage.getItem('userToken');
     const res = await axios.get(
       url,
       {headers:{"Authorization": `bearer ${token}`}}
      );
      dispatch({
        type: FETCH_USERS,
        payload: res.data
      });
      console.log(res.data);
}
