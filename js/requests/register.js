const btn = document.querySelector('#registerBtn')
const mail = document.querySelector('.registerEmail')
const pass = document.querySelector('.registerPass')
const postReq = async (data) => {
    return await fetch('https://sslwallet.app/api/auth/local/register', {
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
        username: mail.value,
        email: mail.value,
        password: pass.value
    }
    let func = await postReq(obj).then((res) => {
        return res
    })
    console.log(func)
    if (func.hasOwnProperty('error')){
        const divError = document.querySelector('.registerError')
        divError.innerText = func.error.message
    } else {
        console.log('success')
        document.location.href = document.location.href.replace('/register', '/registerSuccess')
    }
})