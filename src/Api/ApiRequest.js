import env from '../../env.json'

module.exports = {

    get(urlTarget: string) {
        return fetch(env.issuer + urlTarget, {
            headers: new Headers({
                Authorization: `Client-ID ${env.clientId}`,
            }),
        }).then((response) => {
            return response.json()
        })
    },

    getProfile(urlTarget: string, authorization: string) {
        return fetch(env.issuer + urlTarget, {
            method: 'GET',
            headers: {
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

    postImage(targetUrl: string, authorization: {}, token: string) {
        console.log("UPLOAD")
        console.log(authorization)
        const formData = new FormData();
        if (authorization.video === undefined) {
            formData.append('image', authorization.image);
        } else if (authorization.image === undefined) {
            formData.append('video', authorization.video);
        }
        formData.append('name', authorization.name);
        formData.append('type', 'base64');
        formData.append('title', authorization.title);
        formData.append('description', authorization.description);


        return fetch(env.issuer + targetUrl, {
            method: 'POST',
            headers: new Headers({
                Authorization: `Bearer ${token}`,
            }),
            body: formData
        }).then((res) => {
            console.log(res)
            return res.json()
        }).catch((error) => {
            console.log(error)
            return error
        })
    },
}

