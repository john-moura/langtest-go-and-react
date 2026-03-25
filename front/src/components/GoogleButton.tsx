import React from 'react'

const GoogleButton = () => {
    React.useEffect(() => {
        const googleScript = document.createElement('script');
        googleScript.src = 'https://accounts.google.com/gsi/client';
        googleScript.async = true;
        document.body.appendChild(googleScript);

        const authScript = document.createElement('script');
        authScript.src = 'scripts/googleauth.js';
        authScript.async = true;
        document.body.appendChild(authScript);

        return () => {
            document.body.removeChild(googleScript);
            document.body.removeChild(authScript);
        };
    }, []);
    return (
        <div>
            <div
                id="g_id_onload"
                data-auto_prompt="false"
                data-callback="handleCredentialResponse"
                data-client_id="PUT_YOUR_WEB_CLIENT_ID_HERE"
                className="h-10 flex-auto"
            ></div>
            <div className="g_id_signin"></div>
        </div>
    )
}

export default GoogleButton