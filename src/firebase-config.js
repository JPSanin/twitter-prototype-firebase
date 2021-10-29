const firebaseConfig = {
    apiKey: "AIzaSyB07AMljg0sukVjEVqEcV7JBaowBxruv34",
    authDomain: "twitter-prototype-5e43f.firebaseapp.com",
    projectId: "twitter-prototype-5e43f",
    storageBucket: "twitter-prototype-5e43f.appspot.com",
    messagingSenderId: "1051613159091",
    appId: "1:1051613159091:web:0e1e04bf7b42ee11851ac6"
  };

export function getFirebaseConfig() {
    if (!firebaseConfig || !firebaseConfig.apiKey) {
        throw new Error("Firebase configuration error");
    } else {
        return firebaseConfig;
    }
}