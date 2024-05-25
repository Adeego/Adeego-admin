// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import tokenStore from "./src/Store/TokenStore";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import React, { useEffect } from "react"; // Import useEffect hook
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUm38tHJ8HBWCYS3YpjjaKLjFgARTxdFc",
  authDomain: "adeego-6d3be.firebaseapp.com",
  projectId: "adeego-6d3be",
  storageBucket: "adeego-6d3be.appspot.com",
  messagingSenderId: "1038474343982",
  appId: "1:1038474343982:web:8f068b428737ebf06951bf",
  measurementId: "G-21WJK467DS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);

export default app;

// export const generateToken = async () => {
//   const permission = await Notification.requestPermission();
//   console.log(permission)
//   if (permission === "granted") {
//     const token = await getToken(messaging, {
//       vapidKey: "BFwu4x55Ol5h5cnlkt6BSUbTKfmwibmCTJJxMvgB5ib-c_UEQf9_e8StabiOT"
//     })
//     console.log(token)
//   }
// };

export const RequestPermission = () => {
  // Use uppercase for React components
  const token = tokenStore((state) => state.token);
  const setToken = tokenStore((state) => state.setToken);
  const clearToken = tokenStore((state) => state.clearToken);

  // useEffect(() => {
  //   clearToken();
  //   console.log("Done")
  // }, [])

  useEffect(() => {
    console.log("Requesting User Permission......");

    const requestPermissionAsync = async () => {
      try {
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
          console.log("Notification User Permission Granted.");

          const currentToken = await getToken(messaging, {
            vapidKey:
              "BFwu4x55Ol5h5cnlkt6BSUbTKfmwibmCTJJxMvgB5ib-c_UEQf9_e8StabiOTtVKGdHcxzJEpZZG0gmwvX5s0W8",
          });
          console.log("Client Token: ", currentToken);

          if (currentToken && !token) {
            // Check for both token existence and null value

            setToken(currentToken); // Update the token in Zustand store only if it's new
            // Add the token to the Token collection (assuming a Firebase function exists)

            const db = getFirestore(app);
            const tokenRef = collection(db, "Token");
            const newToken = await addDoc(tokenRef, {
              Token: currentToken,
            });
            console.log(newToken);
          } else {
            console.log("Token already exists or failed to generate.");
          }
        } else {
          console.log("User Permission Denied.");
        }
      } catch (err) {
        console.error("An error occurred:", err);
      }
    };

    requestPermissionAsync(); // Call the function inside useEffect
  }, []); // Empty dependency array to run only once

  return null; // Or return any JSX content you need
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
      console.log(payload);
    });
  });
