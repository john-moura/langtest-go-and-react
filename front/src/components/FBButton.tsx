import React from 'react'

const FBButton = () => {
    React.useEffect(() => {
        const fbScript = document.createElement('script');
        fbScript.async = true;
        fbScript.defer = true;
        fbScript.src = 'https://connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v23.0&appId=1807865159497068';
        document.body.appendChild(fbScript);

        const authScript = document.createElement('script');
        authScript.src = 'scripts/fbauth.js';
        document.body.appendChild(authScript);

        return () => {
            document.body.removeChild(fbScript);
            document.body.removeChild(authScript);
        };
    }, []);
    return (
        <div>
            <div id="spinner"
                className="
                    bg-[#1877F2]
                    rounded-md
                    color-white
                    h-10
                    text-center
                    flex-auto
                ">
                <div 
                    className="fb-login-button h-10 flex-auto" 
                    data-max-rows="1"
                    data-width="353" 
                    data-size="large"
                    data-button-type="" 
                    data-layout="" 
                    data-auto-logout-link="false" 
                    data-use-continue-as="false"
                    >    
                </div>
            </div>
        </div>
    )
}

export default FBButton