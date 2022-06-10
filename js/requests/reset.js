const btn = document.getElementById('resetBtn')
const emailInput = document.getElementById('resetEmailInput')
const resetError = document.querySelector('.resetError')

const validateEmail = (email) => {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(email)
    /*if(reg.test(email) === false) {
        alert('Введите корректный e-mail');
        return false;
    }*/
}

const restorePass = async (data) => {
    return await fetch('https://sslwallet.app/api/auth/forgot-password', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type"
    }).then(res => {
        return res.json()
    }).then(res => {
        console.log(res)
    })
}



btn.addEventListener('click', (e) => {
    e.preventDefault()
    const temp = 'invalid email'
    if (!validateEmail(emailInput.value)){
        resetError.innerText = temp
        resetError.style.color = '#FF185FFF'
        emailInput.value = ''
    } else{

        const data = {
            email: emailInput.value
        }

        emailInput.value = ''
        resetError.innerText = 'Success'
        resetError.style.color = 'green'

        restorePass(data)
    }

})