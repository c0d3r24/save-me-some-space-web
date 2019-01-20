import axios from 'axios';

import {FETCH_PROJECTS,
        PROJECT_NAME_CHANGED,
        SAVE_PROJECT,
        SAVE_PROJECT_FAILED,
        SAVE_PROJECT_SUCCESS,
        CONTRIBUTORS_CHANGED,
        DELETE_PROJECT,
        LOAD_PROJECT_DATA_SUCCESS,
        INCREMENT_TAB_COUNT,
      PROJECT_DESCRIPTION_CHANGED, CLASSIFY_DATA, UPDATE_PAGE_VAULE, LOADING} from './types';

  const BASE_URL = '/api/projects';

export const fetchProjects = (userId) => async dispatch => {
   const url = BASE_URL;
   const token = localStorage.getItem('userToken');
   const res = await axios.get(
     url,
     {headers:{"Authorization": `bearer ${token}`}}
    );
    const data  = {
      projects: res.data,
      userId
    }
    dispatch({
      type: FETCH_PROJECTS,
      payload: data
    });
}
export const projectDescriptionChanged = (value) =>{
  return {
    type: PROJECT_DESCRIPTION_CHANGED,
    payload: value
  }
}
export const projectNameChanged = (value) => {
  return {
    type: PROJECT_NAME_CHANGED,
    payload: value
  }
}
export const contributorsChanged = (value) => {
  return {
    type: CONTRIBUTORS_CHANGED,
    payload: value
  }
}

export const saveProject = (name, contributors, description, history) => async dispatch => {
  dispatch({type: SAVE_PROJECT});
  const url = `${BASE_URL}/new`;
  const token = localStorage.getItem('userToken');
  console.log(token);
  try{
  const res = await axios.post(
    url,
    {name,contributors, description},
    {headers:{"Authorization": `bearer ${token}`}}

   );
   console.log(res);
   history.push('/project/'+res.data.project.id);
   processSuccess(dispatch, res.data);
  }catch (err){
    console.log(err.response);
    processFail(dispatch, err.response.data);
  }
}


const processFail =(dispatch, data) => {
    dispatch({type: SAVE_PROJECT_FAILED, payload:data});
};

const processSuccess = (dispatch, data) => {
    dispatch({
        type: SAVE_PROJECT_SUCCESS,
        payload: data
    });
};


export const deleteProject = (_id, _rev, _userId) => async dispatch => {

    const url = `${BASE_URL}/${_userId}/${_id}/${_rev}`;
    const token = localStorage.getItem('userToken');
    try {
        const res = await axios.delete(url,{headers:{"Authorization": `bearer ${token}`}});
        console.log(res);
        const data  = {
          projects: res.data,
          userId: _userId
        }
        dispatch({type: DELETE_PROJECT, payload: data});
    }catch(err){

    }
}

export const getProjectData = (id) => async dispatch => {

  const url = `/api/project/${id}`;
  const token = localStorage.getItem('userToken');
  try{
  const res = await axios.get(
    url,
    {headers:{"Authorization": `bearer ${token}`}}
   );
   console.log(res);
   dispatch( {
     type: LOAD_PROJECT_DATA_SUCCESS,
     payload: res.data.project
   });
  } catch (err){
    console.log(err);
    processFail(dispatch, err.response);
  }
}

export const increaseTabCount = (project) => async dispatch => {
  const url = `/api/project/increaseTabCount/${project._id}/${project._rev}`;
  const token = localStorage.getItem('userToken');
  try{
  const res = await axios.get(
    url,
    {headers:{"Authorization": `bearer ${token}`}}
   );

   project._id = res.data._id;
   project._rev = res.data._rev;
   project.tabCount = res.data.tabCount;
   dispatch( {
     type: INCREMENT_TAB_COUNT,
     payload: project
   });
  } catch (err){
    console.log(err.response);
    processFail(dispatch, err.response.data);
  }
}
export const closeThisTab = (project, id) => async dispatch => {
  const url = `/api/project/closeThisTab/${project._id}/${project._rev}`;
  const token = localStorage.getItem('userToken');
  const data = {project, id};
  try{
    const res = await axios.post(
      url,
      data,
      {headers:{"Authorization": `bearer ${token}`}}
     );
     dispatch( {
       type: LOAD_PROJECT_DATA_SUCCESS,
       payload: res.data.project
     });
  } catch (err){
   console.log(err);
   processFail(dispatch, err.response.data);
 }
}
export const saveAllTabsData = (project) => async dispatch => {
  const url = `/api/project/saveAllTabsData/${project._id}/${project._rev}`;
  const token = localStorage.getItem('userToken');
  try{
    const res = await axios.post(
      url,
      project,
      {headers:{"Authorization": `bearer ${token}`}}
     );
     dispatch( {
       type: LOAD_PROJECT_DATA_SUCCESS,
       payload: res.data.project
     });
  } catch (err){
   console.log(err);
   processFail(dispatch, err.response.data);
 }
}



export const updatePageValue = (page, value) => {
  return {
    type: UPDATE_PAGE_VAULE,
    payload: {page, value}
  }
}

// export const showHideModal = (dispatch, key, value) =>{
//
// }
export const classify = (data, key, value) => async dispatch =>  {
  console.log(data);
  dispatch({
    type: LOADING,
    payload: {key, value}
  });
  const url = `/api/project/analyse/62b9e514c9624c6a3f43eda005001086`;
  const token = localStorage.getItem('userToken');
  try{
  const res = await axios.post(
    url,
    data,
    {headers:{"Authorization": `bearer ${token}`}}
   );
   // showHideModal(dispatch, key, value);

   dispatch( {
     type: CLASSIFY_DATA,
     payload: res.data.data
   });
   dispatch({
     type: LOADING,
     payload: {key, value: !value}
   });

  } catch (err){
    console.log(err.response);
    processFail(dispatch, err.response.data);
  }
}
