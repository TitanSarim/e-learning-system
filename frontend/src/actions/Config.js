import Cookies from 'js-cookie';

const token = Cookies.get('token');


console.log("token", token)
export const ConfigApplicationJson = { headers: 
                  { 
                    "Content-Type": "application/json",
                     Authorization: `Bearer ${token}` 
                  }
                }




