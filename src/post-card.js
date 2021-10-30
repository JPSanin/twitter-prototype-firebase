import { getDatabase, ref, set, onValue, push } from 'firebase/database';


export class postCard{
    constructor(post){
        this.post = post;
    }

    render(){
       

        let postCard = document.createElement("div");
        postCard.className="post-card";

        let message=document.createElement("h3");
        message.className="post-message";
        message.innerHTML=this.post.post_content;

        let username = document.createElement("p");
        username.className = "post-user";
        username.innerHTML = "@"+this.post.username;

        let replies= document.createElement("div");
        replies.className="replies-cont";

        let reply= document.createElement('input');
        reply.className="reply-input";
        reply.placeholder="Type a reply";

        let replyBtn=document.createElement('button');
        replyBtn.className = "reply-button";
        replyBtn.innerHTML = "Reply";

       
        replyBtn.addEventListener("click", (e, ev)=>{
            // Obtener la base datos
            const db = getDatabase();
            const postRef = ref(db,'posts/'+this.post.id+'/comments');
            push(postRef,reply.value);
            addReply(this.post.comments);
        });

        postCard.appendChild(message);
        postCard.appendChild(username);
        postCard.appendChild(replies);
        addReply(this.post.comments);
        postCard.appendChild(reply);
        postCard.appendChild(replyBtn);


        function addReply(info){
            
            Object.keys(info).forEach((k, index)=>{
                //console.log("Objeto", info[k]);
                let replyCont = document.createElement("div");
                replyCont.className = "reply-cont";
                let reply = document.createElement("p");
                reply.className = "reply-text";
                reply.innerHTML = info[k];
                replyCont.appendChild(reply);
                replies.appendChild(replyCont);
            });

       
        }

        return postCard;
    }

    

}