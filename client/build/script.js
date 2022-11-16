if("serviceWorker" in navigator){
    navigator.serviceWorker.register("/sworker.js").then(registration => {
        console.log("Service Worker Registered");
        console.log(registration);
    }).catch(error=> {
        console.log("Service Worker Error");
        console.log(error);
    })
}else{
    console.log("Service Worker Is Not Working");
}