import { getCookie } from "../helpers/cookie";

const user_id = getCookie("user_id");
const initialState = {
    id:user_id ? user_id :  null,
    isLogin:user_id ? true: false
};

const checkLogin = (state = initialState, action) => {
    switch (action.type) {
        case 'isLogin':
            return {
                ...state,
                id: action.id,
                isLogin: true,
            };
        case 'lockout':
            return {
                ...state,
                id: null,
                isLogin: false
            };
        default:
            return state;
    }
};

export default checkLogin;
