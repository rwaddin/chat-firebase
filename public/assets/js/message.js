
let fieldMsg = document.getElementById("sendMessage")
// send message trigger
fieldMsg.addEventListener("keydown", (e)=>{

    if(e.code == "Enter"){
        let msg = e.target.value.trim();
        
        sendMessage(msg).then((res)=>{
            console.warn("thenn add",res.key);
        }).catch((err)=>{
            Swal.fire("error", err,"error")
        });
        //e.target.value.trim() = '';
        
        e.preventDefault();
        document.getElementsByTagName("form")[0].reset();
    }
})

// proses send ke firebase
function sendMessage(msg){
    return new Promise((resolve, reject) =>{
        refMessage.push({
            message: msg,
            timestamp: Date.now(),
            uid: localStorage.uid
        })
        .then((data)=>{
            resolve(data);
        })
        .catch((err)=>{
            console.warn("errrose send",err.message);
            reject(err.message)
        })
    })
}

// notif jika ada message baru masuk
refMessage.limitToLast(1).on("child_added", (item)=>{
    console.log("Added", item.val());
    let data = item.val();
    if(data.uid !== localStorage.uid){
        setGoing(data)
        // document.getElementById("toastTitle").innerHTML = data.message;
        document.getElementsByClassName("toast-body")[0].innerHTML = data.message
        $('#liveToast').toast('show')
    }
})

// set message
refMessage.on("value", (data)=>{
    console.warn("list", data.val());
    data.forEach(item => {
        if(item.val().uid === localStorage.uid){
            setGoing(item.val());
        }else{
            setComing(item.val());
        }
    });
    $(".msg_history").scrollTop($(".msg_history")[0].scrollHeight)
})


function setComing(message){
    console.warn("coming",message);
    let html = '<div class="incoming_msg">\
        <div class="incoming_msg_img"> \
            <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> \
        </div>\
        <div class="received_msg">\
            <div class="received_withd_msg">\
            <p>'+message.message+'</p>\
            <span class="time_date"> 11:01 AM    |    June 9</span></div>\
        </div>\
    </div>';
    $(".msg_history").append(html);
    // document.getElementsByClassName("msg_history")[0].appendChild(html)
    // console.log(document.getElementsByClassName("msg_history"));

}

function setGoing(message){
    console.warn("going",message);
    let html = '<div class="outgoing_msg">\
        <div class="sent_msg">\
            <p>'+message.message+'</p>\
            <span class="time_date"> 11:01 AM    |    June 9</span> \
        </div>\
    </div>';

    $(".msg_history").append(html);
    // document.getElementsByClassName("msg_history")[0].append(html)
}