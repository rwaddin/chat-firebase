let refUser     = db.ref("users");
const wait      = (show = true) => $.LoadingOverlay(show ? "show" :"hide");

let email   = document.getElementById("email");
let pwd     = document.getElementById("pwd") ;

// login
document.getElementById("btnLogin").addEventListener("click", function(){
    wait();
    auth.signInWithEmailAndPassword(email.value, pwd.value)
    .then(({ user })=>{
        // Swal.fire("Yahoo",user.email+ " berhasil login!","success")
        location.href = window.location.origin+prefix;
    })
    .catch((err)=>{
        Swal.fire("error",err.message,"error")
    })
    .finally(()=>{
        wait(false)
    })
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
            db.ref("users/"+uid).set({
                email : email.value
            });
        })
        .catch((err)=>{
            Swal.fire("error",err.message,"error")
        })
        .finally(()=>{
            wait(false);
        })
    }
})

auth.onAuthStateChanged((user)=>{
    if(user){
        location.href = window.location.origin+prefix;
        console.warn("in");
    }else{
        console.warn("out");
    }
})

refUser.on("child_added", (items)=>{
    console.log("reg add", items.val());
})