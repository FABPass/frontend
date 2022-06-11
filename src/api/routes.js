import {baseUrl} from "./baseUrl";

export const profileInformation = baseUrl + '/user?email=';
export const saveProfileInformation = baseUrl + '/user';

export const forgotPassword = baseUrl + '/user/forgotPassword?email=';
export const changePassword = baseUrl + '/user/changePassword/';

export const createDataItem = baseUrl + '/dataItem';

export const createDataGroup = baseUrl + '/dataGroup'; //TODO dodati ovu rutu
export const getUserDataGroups = baseUrl + '/usersDataGroups';

export const getUserDataItems = baseUrl + '/userDataItems?userId=';