import Cookies from 'js-cookie';

const getUserData = () => {
    const userDataCookie = Cookies.get('user');
    if (userDataCookie) {
        return JSON.parse(userDataCookie);
    }
    return null;
};

const getToken = () => {
    return Cookies.get('token');
};

export const user = getUserData();
export const token = getToken();