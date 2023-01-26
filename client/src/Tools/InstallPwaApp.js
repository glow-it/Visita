export default function installPwaApp(installButton,deferredPrompt,callback){
    window.addEventListener("beforeinstallprompt", (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI to notify the user they can add to home screen
        installButton.style.display = "block";
      
        installButton.addEventListener("click", (e) => {
          // hide our user interface that shows our A2HS button
          installButton.style.display = "none";
          // Show the prompt
          deferredPrompt.prompt();
          // Wait for the user to respond to the prompt
          deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                callback(true)
            } else {
                callback(false)
            }
            deferredPrompt = null;
          });
        });
      });
}