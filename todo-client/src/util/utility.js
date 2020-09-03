import Alert from 'react-s-alert';

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

export const showSuccessMessage = (message, timeout) => {
    Alert.success(message, {
        position: 'bottom-right',
        effect: 'slide',
        timeout: timeout ? timeout : 3000,
    });
};

export const showErrorMessage = (message, timeout) => {
    Alert.error(message, {
        position: 'bottom-right',
        effect: 'slide',
        timeout: timeout ? timeout : 3000,
    });
};

export const showWarningMessage = (message, timeout) => {
    Alert.warning(message, {
        position: 'bottom-right',
        effect: 'slide',
        timeout: timeout ? timeout : 3000,
    });
};