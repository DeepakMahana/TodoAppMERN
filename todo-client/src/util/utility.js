import Alert from 'react-s-alert';

// const hostname = window.location.hostname;
// export let API_URL = hostname === 'localhost' ? 'http://localhost:3000' : `https://${hostname}`;

export const USER_LOGIN_API = `/api/user/login`;
export const USER_REGISTER_API = `/api/user/register`;
export const GET_USER_DETAILS = `/api/user/info`
export const ADD_TODO_API = `/api/todo/addtodo`;
export const DELETE_TODO_API = `/api/todo/deletetodo`;
export const ADD_TODO_SUBTASK_API = `/api/todo/addsubtask`;
export const DELETE_TODO_SUBTASK_API = `/api/todo/deletesubtask`;
export const GET_USER_TODOS_API = `/api/todo/list`;

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const authMiddleWare = (history) => {
    const authToken = localStorage.getItem('AuthToken');
    if(authToken === null){
        history.push('/login')
    }
}

/**
 * [Generic method for success message]
 * @param  {[string]} message [You need to pass message to access this function]
 * @param  {[Integer]} timeout [This one is optional but if you will pass then you need to pass it in milliseconds (By default it would be 5000 milliseconds)]
 */
export const showSuccessMessage = (message, timeout) => {
    Alert.success(message, {
        position: 'bottom-right',
        effect: 'slide',
        timeout: timeout ? timeout : 5000,
    });
};

/**
 * [Generic method for Error message]
 * @param  {[string]} message [You need to pass message to access this function]
 * @param  {[integer]} timeout [This one is optional but if you will pass then you need to pass it in milliseconds (By default it would be 5000 milliseconds)]
 */
export const showErrorMessage = (message, timeout) => {
    Alert.error(message, {
        position: 'bottom-right',
        effect: 'slide',
        timeout: timeout ? timeout : 5000,
    });
};

/**
 * [Generic method for Warning message]
 * @param  {[string]} message [You need to pass message to access this function]
 * @param  {[integer]} timeout [This one is optional but if you will pass then you need to pass it in milliseconds (By default it would be 10000 milliseconds)]
 */
export const showWarningMessage = (message, timeout) => {
    Alert.warning(message, {
        position: 'bottom-right',
        effect: 'slide',
        timeout: timeout ? timeout : 5000,
    });
};