/* eslint-disable func-names */
/* eslint-disable no-undef */
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config

const firebaseConfig = initializeApp({
  apiKey: 'AIzaSyADsG2JaINEy9v49fTVF6V_ikMfvFuTqkY',
  authDomain: 'star-wars-chat-319a9.firebaseapp.com',
  projectId: 'star-wars-chat-319a9',
  storageBucket: 'star-wars-chat-319a9.appspot.com',
  messagingSenderId: '889298841323',
  appId: '1:889298841323:web:49e12f3e9737e5f4ab58ae',
  measurementId: 'G-E2SB85WQBW'
});

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body
  };

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions);
});
