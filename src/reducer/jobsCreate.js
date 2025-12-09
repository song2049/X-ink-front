export const initState = {
  title: '',
  position: '',
  start_line: '',
  dead_line: '',
  job_description: '',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.payload };
    case 'SET_POSITION':
      return { ...state, position: action.payload };
    case 'SET_START_LINE':
      return { ...state, start_line: action.payload };
    case 'SET_DEAD_LINE':
      return { ...state, dead_line: action.payload };
    case 'SET_JOB_DESCRIPTION':
      return { ...state, job_description: action.payload };
    default:
      return state;
  }
};
