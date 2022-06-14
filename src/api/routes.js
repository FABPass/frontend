import {baseUrl} from "./baseUrl";

export const saveProfileInformationWithPw = baseUrl + '/user/update?pw=';

export const profileInformation = baseUrl + '/user?email=';
export const saveProfileInformation = baseUrl + '/user';

export const forgotPassword = baseUrl + '/user/forgotPassword?email=';
export const changePassword = baseUrl + '/user/changePassword/';

export const getUserDataGroups = baseUrl + '/usersDataGroups?userId=';

export const createDataItem = baseUrl + '/dataItem';

export const createDataGroup = baseUrl + '/dataGroup'; 

export const getUserDataItems = baseUrl + '/userDataItems?userId=';

export const deleteDIRoute = baseUrl + '/deleteDataItem/';

