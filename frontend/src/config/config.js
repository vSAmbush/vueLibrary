export default {
    colorSet: [
        '#f40b74',
        '#ac53a8',
        '#2e6cd1',
        '#1daa88',
        '#f1690e',
        '#86da25',
        '#bd0600'
    ],
    restDomainUrl: 'http://localhost:8080/api',
    userKey: 'USER',
    tokenKey: 'TOKEN',
    getHeaders(headers = {}) {
        if (localStorage.getItem(this.tokenKey)) {
            return {
                ...headers,
                'Authorization': 'Bearer ' + localStorage.getItem(this.tokenKey)
            }
        }

        return headers;
    }
}