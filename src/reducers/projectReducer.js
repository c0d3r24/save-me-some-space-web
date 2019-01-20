import {FETCH_PROJECTS,
        PROJECT_NAME_CHANGED,
        SAVE_PROJECT,
        SAVE_PROJECT_FAILED,
        SAVE_PROJECT_SUCCESS,
        PROJECT_DESCRIPTION_CHANGED,
        CONTRIBUTORS_CHANGED,DELETE_PROJECT,
        LOAD_PROJECT_DATA_SUCCESS,
        INCREMENT_TAB_COUNT,UPDATE_PAGE_VAULE,
      CLASSIFY_DATA, LOADING} from  './../actions/types';
const INITIAL_STATE = {
  projects:[],
  projectName: '',
  contributors: '',
  totalProjectsCount: 0,
  ownedProjectsCount: 0,
  sharedProjectsCount: 0,
  error: '',
  loading:false,
  message:'',
  description:'',
  project : {},
  algorithmResult: '',
  page1:'',
  page2: '',
  page3: '',
  page4: '',
  tabCount: 1,
  showAnalysisModal: false
}

export default (state = INITIAL_STATE, action) => {
  let project = {};
  switch(action.type){
    case PROJECT_DESCRIPTION_CHANGED:
      return { ...state, description: action.payload}
    case CONTRIBUTORS_CHANGED:
      return { ...state, contributors: action.payload}
    case PROJECT_NAME_CHANGED:
        return { ...state, projectName: action.payload}
    case FETCH_PROJECTS:
    case DELETE_PROJECT:
      const allProjects = action.payload.projects.userProjects;
      const userId = action.payload.userId;
      console.log(action.payload);
      let ownedProjectsCount = 0;
      let sharedProjectsCount = 0;
      allProjects.forEach((item) => {
          if(item.owner === userId){
            ownedProjectsCount++;
          }else{
            sharedProjectsCount++;
          }
      });
      return {...state, ...INITIAL_STATE, allProjects,ownedProjectsCount, sharedProjectsCount};
    case SAVE_PROJECT:
      return {...state, error:'', message: '', loading: true }
    case SAVE_PROJECT_SUCCESS:
      console.log(action.payload);
      return {...state, ...INITIAL_STATE,project: action.payload.project}
    case SAVE_PROJECT_FAILED:
      // return {...state, loading: false, error: 'Something went Wrong', message: action.payload.message}
      return {...state, loading: false}
    case CLASSIFY_DATA:
      console.log("Printing payload", action.payload);
      return {
        ...state, algorithmResult: action.payload
      }
    case LOAD_PROJECT_DATA_SUCCESS:
      project = action.payload;
      console.log('from reducer', project);
      return { ...state, ...INITIAL_STATE, project, page1: project.pageData.page1 || '',
        page2: project.pageData.page2 || '',
        page3: project.pageData.page3 || '',
        page4: project.pageData.page4 || '',
        algorithmResult: project.pageData.algorithmResult || '',
        tabCount: project.tabCount
      }

    case INCREMENT_TAB_COUNT:
      project = action.payload;
      return { ...state, project, tabCount: project.tabCount}

    case UPDATE_PAGE_VAULE:
      return { ...state, [action.payload.page]:action.payload.value}
    case LOADING:
      return {...state, [action.payload.key]: action.payload.value}
    default:
      return state;
  }
}
