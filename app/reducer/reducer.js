
export const GET_REPOS = 'LOAD';
export const GET_REPOS_SUCCESS = 'LOAD_SUCCESS';
export const GET_REPOS_FAIL = 'LOAD_FAIL';

export default function reducer(state = { repos: [] }, action) {
    switch (action.type) {
        case GET_REPOS:
            return { ...state, loading: true };
        case GET_REPOS_SUCCESS:
            return { ...state, loading: false, repos: action.payload.data };
        case GET_REPOS_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching repositories'
            };
        default:
            return state;
    }
}

export function listRepos(phone_number) {
    return {
        type: GET_REPOS,
        payload: {
            request: {
                url: `http://vntelecom.vnta.gov.vn:10245/apps/api/checkNumber?phone_number=${phone_number}`
            }
        }
    };
}