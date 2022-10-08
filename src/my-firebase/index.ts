import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { getFirestore, query, getDocs, collection, where, addDoc } from 'firebase/firestore';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const app = initializeApp({
  apiKey: 'AIzaSyADsG2JaINEy9v49fTVF6V_ikMfvFuTqkY',
  authDomain: 'star-wars-chat-319a9.firebaseapp.com',
  projectId: 'star-wars-chat-319a9',
  storageBucket: 'star-wars-chat-319a9.appspot.com',
  messagingSenderId: '889298841323',
  appId: '1:889298841323:web:49e12f3e9737e5f4ab58ae',
  measurementId: 'G-E2SB85WQBW'
});

const auth = getAuth(app);
const db = getFirestore(app);

const signInWithGoogle = async () => {
  try {
    const { user } = await signInWithPopup(auth, new GoogleAuthProvider());
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const { docs } = await getDocs(q);
    if (docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
        photo: user.photoURL
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
  signOut(auth);
};

const messaging = getMessaging(app);

export const getTokens = (setTokenFound: any) =>
  getToken(messaging, {
    vapidKey:
      'BLPKB6oz97ZJ0b1iJo-61mUIY2ZqtU51vH6_BCFGnofhCDpCoDnaKLsy7rmgoHWh36QKqPGvDhu5kB8YwzjXVvU'
  })
    .then(currentToken => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
      }
    })
    .catch(err => {
      console.log('An error occurred while retrieving token. ', err);
    });

export const onMessageListener = () =>
  new Promise(resolve =>
    onMessage(messaging, payload => {
      resolve(payload);
    })
  );

export { auth, db, app, signInWithGoogle, logInWithEmailAndPassword, logout };
