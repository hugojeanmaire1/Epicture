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
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + authorization
            }
        }).then((response) => {
            console.log(response)
            return response.json()
        }).catch((error) => {

        })
    },

    favoriteAnImage(urlTarget: string, authorization: string) {
        return fetch(env.issuer + urlTarget, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + authorization
            }
        }).then((response) => {
            console.log(response)
            return response.json()
        }).catch((error) => {
            console.log(error)
        })
    },

    postImage (targetUrl: string, data, authorization) {
        return fetch(env.issuer + targetUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + authorization,
            },
            body: JSON.stringify(data.data)
        }).then((res) => {
                return res.json()
        }).catch((error) => {

        })
    },
}

