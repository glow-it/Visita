import React, { useState, useEffect } from 'react';

function InstallPwa({children,onAccept,onReject}) {



  useEffect(() => {



    const installButton = document.getElementById('pwa-app-install-button')

    

    // Check if the user has previously accepted the PWA install prompt
    let deferredPrompt;



    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
    });



    // Handle the user's response to the PWA install prompt
    
    installButton.addEventListener('click', (e) => {
      // Show the prompt

      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          onAccept()
        } else {
          onReject()
        }
        deferredPrompt = null;
      });
    });
  }, []);

  return (
    <div id="pwa-app-install-button" >
       
          {children}
        
    </div>
  );
}

export default InstallPwa;
