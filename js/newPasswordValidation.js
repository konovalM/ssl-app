const btn = document.querySelector('#validation')
const pass = document.querySelector('#pass')
const passRepeat = document.querySelector('#passRepeat')
const passRepeatWrapper = document.querySelector('.errorPassWrapper')

const getMe = async () => {
    return await fetch('https://sslwallet.app/api/users/me', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res.json()
    })
}

const changePassword = async (id, data) => {
    return await fetch(`https://sslwallet.app/api/users/${id}`, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type"
    }).then(res => {
        return res.json()
    })
}

const postNewPass = async (data) => {
    return await fetch('https://sslwallet.app/api/auth/reset-password', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type"
    }).then(res => {
        return res.json()
    })
}
btn.addEventListener('click', async (e) => {

    e.preventDefault()
    if (pass.value !== passRepeat.value){
        pass.value = '';
        passRepeat.value = ''
        passRepeatWrapper.classList.add('errorPassWrapperActive')
        passRepeat.classList.add('redPlaceholder')
        if (window.innerWidth <= 880){
            passRepeat.placeholder = 'Password doesn\'t match'

        }
    } else if (localStorage.hasOwnProperty('jwt')){
        const myAcc = await getMe()
        let data = {
            password: pass.value
        }
        const result = await changePassword(myAcc.id, data)

        if (result.hasOwnProperty('error')){
            console.log(result)
            const newPasswordErrorDiv = document.querySelector('.newPasswordError')
            newPasswordErrorDiv.innerText = result.error.message
        } else {
            console.log(result)
            localStorage.removeItem('jwt')
            window.location.href = '/entrance.html'
        }
    } else{
        let testLink = '?code=6f2f2ef1868a54d73c2cd2255b6437478995a4c70e50b86c2f022798a4802d51fbbb765868cfaf753066d5bce95499a3eb03e5160454e7832f8e931551d81905'
        let paramsFromLink = window.location.search.substring(1).split('&')

        let code = paramsFromLink[0].split('=')[1]

        const body = {
            password: pass.value,
            passwordConfirmation: pass.value,
            code: code
        }

        let res = await postNewPass(body)

        if (res.hasOwnProperty('jwt')){
            localStorage.setItem('jwt', res.jwt)
            window.location.href = '/index.html'
        }
    }
})

passRepeat.addEventListener('input', () => {
    passRepeatWrapper.classList.remove('errorPassWrapperActive')
    passRepeat.classList.remove('redPlaceholder')
})





