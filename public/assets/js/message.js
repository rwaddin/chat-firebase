let refMessage = db.ref("messages");

// send message trigger
document.getElementById("sendMessage").addEventListener("keydown", (e)=>{

    if(e.code === "Enter"){
        let msg = e.target.value.trim();
        wait()
        sendMessage(msg).then((data)=>{
            console.warn(data);
        })
        .finally(()=>{
            wait(0)
        })
        //e.target.value.trim() = '';
        document.getElementsByTagName("form")[0].reset();
    }
})

// proses send ke firebase
function sendMessage(msg){
    return new Promise((resolve, reject) =>{
        try {
            let msgId = refMessage.push({
                message: msg,
                timestamp: Date.now()
            }).key;
            resolve(msgId);
        } catch (error) {
            reject(error)
        }
    })
}

// notif jika ada message baru masuk
refMessage.endAt().limitToLast(1).on("child_added", (data)=>{
    //Swal.fire("New message","Data baru ditambahkan","info");
    console.warn("Added", data.val());
})

// set message
refMessage.on("value", (data)=>{
    console.warn(data.val());
})