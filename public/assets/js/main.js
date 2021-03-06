// cek status user login / tidak
auth.onAuthStateChanged((user)=>{
    if(user){
        // user.providerData.forEach(function (profile) {
        //     console.log("  Sign-in provider: " + profile.providerId);
        //     console.log("  Provider-specific UID: " + profile.uid);
        //     console.log("  Name: " + profile.displayName);
        //     console.log("  Email: " + profile.email);
        //     console.log("  Photo URL: " + profile.photoURL);
        // });
        //console.warn("login", user.uid);
        localStorage.setItem("uid", user.uid)
    }else{
        console.warn("out");
        window.location = window.location.origin+prefix+"/login";
    }
})

// logout
document.getElementById("logout").addEventListener("click", ()=>{
    Swal.fire({
        title : "Warning",
        icon : "warning",
        text : "Are you sure want to sign out ?",
        showCancelButton : true
    }).then(({isConfirmed})=>{
        if(isConfirmed){
            wait();
            auth.signOut()
            .then(()=>{
                location.href = window.location.origin+prefix+"/login";
            })
            .catch((err)=>{
                Swal.fire("error",err.message,"error")
            })
            .finally(()=>{
                wait(true);
            })
        }
    })
})

