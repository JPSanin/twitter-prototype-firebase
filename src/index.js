import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, push } from 'firebase/database';

import { getFirebaseConfig } from './firebase-config';
import { postCard } from './post-card';


//Elementos
const username= document.getElementById("username_text");
const post_text= document.getElementById("post_text");
const post_btn= document.getElementById("post_btn");
const feed=document.getElementById("feed");

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
        comments: ""
    }
    postear(post);
    username.value="";
    post_text.value="";
    
}


function getPosts(){
    const db = getDatabase();
    const dbRef =ref(db, 'posts');
    onValue(dbRef, (snapshot) =>{
        const data = snapshot.val();
        updatePosts(data);
    });
}

function updatePosts(info){
    
    if (info) {
        feed.innerHTML="";
        Object.keys(info).forEach((k, index)=>{
            //console.log(k, index);
            //console.log("Objeto", info[k]);
            const post = new postCard(info[k]);
           
            feed.appendChild(post.render());
        });

    } else {
        feed.innerHTML = "No posts yet...";
    }
}


post_btn.addEventListener("click", postEvent);
getPosts();