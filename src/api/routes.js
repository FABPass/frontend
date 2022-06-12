export const saveProfileInformationWithPw = 'http://localhost:8084/user/update?pw=';

import {baseUrl} from "./baseUrl";


export const profileInformation = baseUrl + '/user?email=';
export const saveProfileInformation = baseUrl + '/user';

export const forgotPassword = baseUrl + '/user/forgotPassword?email=';
export const changePassword = baseUrl + '/user/changePassword/';

export const getUserDataGroups = 'http://localhost:8084/usersDataGroups?userId=';

export const createDataItem = baseUrl + '/dataItem';

export const createDataGroup = baseUrl + '/dataGroup'; 

export const getUserDataItems = baseUrl + '/userDataItems?userId=';

