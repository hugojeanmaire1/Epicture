import env from '../../env.json'

module.exports = {

    get(urlTarget: string) {
        return fetch(env.issuer + urlTarget, {
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
                'Authorization': 'Client-ID' + env.clientId
            }
        }).then((response) => {
            return response.json()
        })
    },

    getProfile(urlTarget: string, authorization: string) {
        return fetch(env.issuer + urlTarget, {
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + authorization
            }
        }).then((response) => {
            return response.json()
        })
    }
}

