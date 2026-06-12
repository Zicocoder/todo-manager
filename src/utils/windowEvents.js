
let logoutCallback = null;
let shouldLogout = false;

export const initializeWindowEvents = (callback) => {
    logoutCallback = callback;

    const handleBeforeUnload = (event) => {
        if (logoutCallback) {
            event.preventDefault();
            event.returnValue = '';
            shouldLogout = true;
            return event.returnValue;
        }
    };

    const handleUnload = () => {
        if (shouldLogout) {
            const token = localStorage.getItem('auth_token');
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');

            if (token) {
                // keepalive lets this request survive page unload without blocking the browser
                fetch('http://localhost:9090/api/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    keepalive: true
                }).catch(() => {});
            }
        }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        window.removeEventListener('unload', handleUnload);
        logoutCallback = null;
        shouldLogout = false;
    };
};

export const removeWindowEvents = () => {
    logoutCallback = null;
    shouldLogout = false;
};