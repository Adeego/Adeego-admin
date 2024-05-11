importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

 //the Firebase config object 
const firebaseConfig = {
  apiKey: "AIzaSyCUm38tHJ8HBWCYS3YpjjaKLjFgARTxdFc",
  authDomain: "adeego-6d3be.firebaseapp.com",
  projectId: "adeego-6d3be",
  storageBucket: "adeego-6d3be.appspot.com",
  messagingSenderId: "1038474343982",
  appId: "1:1038474343982:web:8f068b428737ebf06951bf",
  measurementId: "G-21WJK467DS"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});