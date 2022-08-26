import React from 'react';


/*
    Disables error message for different server and client HTML files
    https://dev.to/apkoponen/how-to-disable-server-side-rendering-ssr-in-next-js-1563
*/
const SafeHydrate: React.FC = ({ children }) => {
    return (
        <div suppressHydrationWarning>
            {typeof window === 'undefined' ? null : children}
        </div>
    );
};

export default SafeHydrate;