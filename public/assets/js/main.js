const wait      = (show = true) => $.LoadingOverlay(show ? "show" :"hide");

$("#attach").click(function(){
    $(".attachement").toggle();
});
$("#dset").click(function(){
    $(".setting-drop").toggle('1000');
});
	
$(document).ready(function(){
    $(".flip").click(function(){
        $(".message-box").show("slide", { direction: "right" }, 10000);
    });

    $("#back").click(function(){
        $(".message-box").hide("slide", { direction: "left" }, 10000);
    });
});

// cek status user login / tidak
auth.onAuthStateChanged((user)=>{
    if(user){
        user.providerData.forEach(function (profile) {
            console.log("  Sign-in provider: " + profile.providerId);
            console.log("  Provider-specific UID: " + profile.uid);
            console.log("  Name: " + profile.displayName);
            console.log("  Email: " + profile.email);
            console.log("  Photo URL: " + profile.photoURL);
        });
        console.warn("login", user.uid);
    }else{
        console.warn("out");
        window.location = window.location.origin+"/public/login";
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


document.getElementById("sendMessage").addEventListener("keydown", (e)=>{
    if(e.code === "Enter"){

        console.warn(e.code);
    }
})
