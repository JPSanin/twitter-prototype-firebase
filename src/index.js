import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, push } from 'firebase/database';

import { getFirebaseConfig } from './firebase-config';

//Elementos
const username= document.getElementById("username_text");
const post_text= document.getElementById("post_text");
const post_btn= document.getElementById("post_btn");

// Inicializar firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);

function postear(post){
    // Obtener la base datos
    const db = getDatabase();
    const newpostRef = push(ref(db, 'posts'));
    console.log(newpostRef);

    // injectar el id
    post["id"] = newpostRef.key
    // escribir un nuevo usuario
    set(newpostRef, post);
}

const postEvent= (e,event)=>{
    const post={
        username:username.value,
        post_content: post_text.value,
        comments: "none"
    }
    postear(post);
    username.value="";
    post_text.value="";
}

post_btn.addEventListener("click", postEvent);