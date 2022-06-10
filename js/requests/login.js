const btn = document.querySelector('#loginBtn')
const mail = document.querySelector('.loginEmail')
const pass = document.querySelector('.loginPass')
const postReq = async (data) => {
    return await fetch('https://sslwallet.app/api/auth/local', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        /*mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit*/
        headers: {
            'Content-Type': 'application/json'
        },
        /*redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client*/
        body: JSON.stringify(data) // body data type must match "Content-Type"
    }).then(res => {
        return res.json()
    }).then(res => {
        /*console.log(res.error.message)*/
        // return res.error.message
        return res
    })
}

btn.addEventListener('click', async (e) => {
    e.preventDefault()
    const obj = {
        identifier: mail.value,
        password: pass.value
    }
    console.log(obj)
    let func = await postReq(obj).then((res) => {
        return res
    })
    if (func.hasOwnProperty('error')){
        const divError = document.querySelector('.loginError')
        divError.innerText = func.error.message
    } else {
        // console.log(func.jwt)
        localStorage.setItem('jwt', func.jwt)
        document.location.href = document.location.href.replace('/login', '/index')
    }
})