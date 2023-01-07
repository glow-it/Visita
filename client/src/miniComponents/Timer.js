import { useEffect, useState } from "react";

const Timer = (initialMinute=0,initialSeconds=0) => {
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                    document.getElementById('forgot_franchisee_password_resend_otp_button').classList.replace('hidden','flex')
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    return (
        <div>
        { minutes === 0 && seconds === 0
            ? null
            : <h1 className="font-medium" >OTP can be resend after <span className="text-purple-600" >{seconds}s</span></h1> 
        }
        </div>
    )
}

export default Timer;