import Cookies from 'js-cookie';

const token = Cookies.get('token');



export const ConfigApplicationJson = { headers: 
                  { 
                    "Content-Type": "application/json",
                     Authorization: `Bearer ${token}` 
                  }
                }











// const persistData = localStorage.getItem('persist:root');
// const parsedPersistData = JSON.parse(persistData);
// const userData = JSON.parse(parsedPersistData.user);
// if(userData.isAuthenticated === true){
//   token = userData.user.token;
//   if (token) {
//     Cookies.set('token', token, { expires: 7 });
//   }
// }