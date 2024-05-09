import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import staffStore from '../Store/UserStore';
import '../CSS/Login.css'; // import the CSS file  
import app from '../../firebaseConfig';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';


function Login(){
    const setStaff = staffStore((state) => state.setStaff);
    const [phoneNumber, setPhoneNumber] = useState('')
    const [passcode, setPasscode] = useState('')
    const navigate = useNavigate();


    const verifyStaff = async () => {
        try {
          // Check if user exists in the database
            const db = getFirestore(app);
            const number = phoneNumber;
            const userRef = collection(db, 'Staff');
            const userQuery = query(userRef, where("Phone", "==", number));
            const querySnapshot = await getDocs(userQuery);
            // Check if any documents match the query
            if (querySnapshot.empty) {
              alert(`${phoneNumber} does not exist! Sign up`);
            } else {
              const pass = querySnapshot.docs[0].data().Passcode;
              if (pass != passcode) {
                alert('Invalid passcode');
              } else {
                const userData = querySnapshot.docs[0].data();
                const userId = querySnapshot.docs[0].id;
                const user = {
                  UserId: userId,
                  FirstName: userData.FirstName,
                  LastName: userData.LastName,
                  Phone: userData.Phone,
                  Role: userData.Role
                }
                setStaff(user)
    
                alert('Login successful')
    
                navigate('/');
              }
            }
        } catch (err) {
          alert(`An error occurred ${err}`);
        }
      }

      const handlePhone = (e) => {
        setPhoneNumber(e.target.value)
      }

      const handlePasscode = (e) => {
        setPasscode(e.target.value)
      }

    return(
        <div className="login_body">
            <div className="center">
                <h1 className="login_header">Login</h1>
                <div className='cont'>
                    <div className="txt_field">
                        <input id='inp' type="tel" value={phoneNumber} onChange={handlePhone} required/>
                        <label id='lab' >Phone Number</label>
                    </div>
                    <div className="txt_field">
                        <input id='inp2' type="password" value={passcode} onChange={handlePasscode} required/>
                        <label id='lab2'>Passcode</label>
                    </div>
                    <button className="login_btn" onClick={verifyStaff} >Login</button>
                </div>
                    

            </div>
        </div>
    );
}

export default Login;