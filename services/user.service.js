import { AsyncStorage } from 'react-native';
import { enableExpoCliLogging } from 'expo/build/logs/Logs';
import config from '../config.json';

export const userService = {
    login,
    logout
};

function login(username, password) {
    // if(username === 'test' && password === 'test') {
    //     let user = (username + ':' + password);
    //     AsyncStorage.setItem('user', JSON.stringify(user));
    //     return user;
    // }
    // return '';

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(config.backend + '/users/authenticate', requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log('authentication');
            if (user) {
                let user = (username + ':' + password);
                AsyncStorage.setItem('user', JSON.stringify(user));
                return 'success';
            }
            return user;
        })
        .catch(err => {
            console.log("Error with server. " + err);
            return err;
        })
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