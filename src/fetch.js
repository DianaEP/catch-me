// --------------------------------- REGISTER -----------------------------------------

export async function register(dataRegister,navigate,setUserAuth, setAlertMessage){
    try{
        const response = await fetch('http://localhost:3000/register',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              //   Authorization: `Bearer ${userAuth.token}`,
              },
            body: JSON.stringify(dataRegister)
        })
        const body = await response.json();
        if(response.ok){
            localStorage.setItem('accessToken' , body.accessToken);
            localStorage.setItem('userId' , body.user.id);
            setUserAuth({
                accessToken : body.accessToken,
                userId : body.user.id
            })
            navigate('/')
            // console.log(body);

        }

        if (!response.ok) {
            if(response.status === 400){
              setAlertMessage(`A user with this email address already exists. `);
            }
            return;    
          }
       
        
    }catch(error){
        console.error('failed to fetch register'+ error)
    }
}

// --------------------------------- LOGIN -----------------------------------------

export async function login(dataLogin,navigate, setUserAuth,setAlertMessage){
    try{
        const response = await fetch('http://localhost:3000/login',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${userAuth.token}`,
              },
            body: JSON.stringify(dataLogin)
        })
        const body = await response.json();
        if(response.ok){
            localStorage.setItem('accessToken' , body.accessToken);
            localStorage.setItem('userId' , body.user.id);
            setUserAuth({
                accessToken : body.accessToken,
                userId : body.user.id
            })
            navigate('/')
            // console.log(body);

        }

        if (!response.ok) {
            if(response.status === 400){
              setAlertMessage(`Cannot find user. Register first.`);
            }
            return;    
          }
        
    }catch(error){
        console.error('failed to fetch register'+ error)
    }
}

// --------------------------------- GET GRID ITEMS -----------------------------------------

export async function getGridItem(setGridItems,token,navigate){
    try{
        const response = await fetch('http://localhost:3000/gridItems',{
            headers: {
                Authorization: `Bearer ${token}`,
              },
        });
        const data = await response.json();
        if(response.ok){
            setGridItems(data);
        }
        if(response.status === 401){
            localStorage.removeItem('accessToken'); 
            localStorage.removeItem('userId');
            navigate('/login') 
        }
    }catch(error){
        console.error('Error fetching grid items:', error);
    }
}

// --------------------------------- POST SCORE -----------------------------------------

export async function postScore(score, token){
    try{
        const response = await fetch('http://localhost:3000/score', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(score),
          });
        const data = await response.json();
        console.log(data);
        

    }catch(error){
        console.error('Error fetching grid items:', error);
    }
}

// --------------------------------- GET SCORE -----------------------------------------

export async function getScore(setScore, token){
    try{
        const response= await fetch('http://localhost:3000/score',{
            headers: {
                 Authorization: `Bearer ${token}`,
                 'Content-Type': 'application/json',
            }
        }
        )
        const data = await response.json();
        setScore(data)
        // console.log(token);
        
    }catch(error){
        console.error('Error fetching scores:', error)
    }
}


// --------------------------------- GET USER -----------------------------------------

export async function getUserName(userId,token,setUserName){
    try{
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
           }
        });

        if(response.ok){
            const data = await response.json();
            // console.log(data.firstName);
            setUserName(data.firstName)
            
        }
    }catch(error){
        console.error('Error fetching user name:', error);
        return null;
    }
}

// --------------------------------- DELETE ACCOUNT -----------------------------------------

export async function deleteUser(userAuth,navigate){
    try { 
        const response = await fetch(`http://localhost:3000/users/${userAuth.userId}`,{
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${userAuth.accessToken}`
          }
        });
  
        if (response.ok) {
          navigate('/register')
        } 
        }catch (error) {
        console.error('Error deleting user account:', error); 
      }
}
