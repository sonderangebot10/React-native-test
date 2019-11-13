import { AsyncStorage } from 'react-native';

export const userService = {
    login,
    logout
};

function login(username, password) {
    if(username === 'test' && password === 'test') {
        let user = (username + ':' + password);
        AsyncStorage.setItem('user', JSON.stringify(user));
        return user;
    }
    return '';

    //EMULATOR CANNOT SEE LOCALHOST

    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, password })
    // };

    // return fetch('/users/authenticate', requestOptions)
    //     .then(handleResponse)
    //     .then(user => {
    //         console.log(2);
    //         if (user) {
    //             user.authdata = window.btoa(username + ':' + password);
    //             AsyncStorage.setItem('user', JSON.stringify(user));
    //         }
    //         return user;
    //     })
    //     .catch(err => {
    //         console.log("Error with server. " + err);
    //     })
}

function handleResponse(response) {
    console.log(1);
    return response.text().then(text => {
        let data = JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                this.location.reload(true);
            }
            const error = (data) || response.statusText;
            return Promise.reject(error);
        }
        else if(data.error){
            return Promise.reject(data.error);
        }

        return data;
    });
}

function logout() {
    AsyncStorage.removeItem('user');
}