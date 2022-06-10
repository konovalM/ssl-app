const accountBtn = document.querySelector('.accountBtn')
const firstName = document.getElementById('first-name')
const lastName = document.getElementById('last-name')
const phone = document.getElementById('phone')
const email = document.getElementById('email')
const organization = document.getElementById('organization')
const postCode = document.getElementById('post-code')
const city = document.getElementById('city')
const country = document.getElementById('country')


const getMe = async () => {
    return await fetch('https://sslwallet.app/api/users/me', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res.json()
    }).then(res => {
        return res
    })
}

const putMySettings = async (id, data) => {
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

accountBtn.addEventListener('click', async () => {
    const data = await getMe()
    let myData = {
        username: email.value || data.userName,
        email: email.value || data.email,
        firstName: firstName.value || data.firstName,
        lastName: lastName.value || data.lastName,
        city: city.value || data.city,
        country: country.value || data.country,
        postalCode: postCode.value || data.postalCode,
        phone: phone.value || data.phone,
        organization: organization.value || data.organization
    }
    const putMyData = await putMySettings(data.id, myData)
    console.log(putMyData)
    email.value = '';
    firstName.value = '';
    lastName.value = '';
    city.value = '';
    country.value = '';
    postCode.value = '';
    phone.value = '';
    organization.value = '';

    if (!putMyData.hasOwnProperty('error')){
        accountBtn.insertAdjacentHTML('beforebegin', '<div style="color: #1CC800; text-align: center; margin-bottom: 5px;">Success</div>')
    }
})