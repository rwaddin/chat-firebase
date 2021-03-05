let auth        = firebase.auth();
let db          = firebase.database();
let refUser     = db.ref("users");

const wait = (show = true) => $.LoadingOverlay(show ? "show" :"hide");

let email   = document.getElementById("email");
let pwd     = document.getElementById("pwd") ;

// login
document.getElementById("btnLogin").addEventListener("click", function(){
    Swal.fire("Sss")
})

// register
document.getElementById("btnRegister").addEventListener("click", ()=>{
    if(email.value === "" || pwd.value === "")    {
        Swal.fire("error","Form is still empty!","error")
    }else{
        wait();
        auth.createUserWithEmailAndPassword(email.value, pwd.value)
        .then(({ user })=>{
            Swal.fire("Yahoo",user.uid,"success")
            let uid = user.uid;

            // insert to tb ref
            refUser.set({
                [uid] : {
                    email : email.value
                }
            });
            console.warn(newUser);
        })
        .catch((err)=>{
            Swal.fire("error",err.message,"error")
        })
        .finally(()=>{
            wait(false);
        })
    }
})