document.addEventListener("DOMContentLoaded", function(e){
    if(window.localStorage.getItem("session_init") != undefined){
        if(window.localStorage.getItem("session_init") != ""){
            
        }else{
            window.location.href = "index.html";
        }
    }else{
        window.location.href = "index.html";
    }
})