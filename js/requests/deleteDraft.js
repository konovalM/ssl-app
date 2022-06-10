const returntoIndex = document.querySelector('.returnToIndex')

returntoIndex.addEventListener('click', () => {
    localStorage.removeItem('deleteCertificateId')
})

const confirmationOfDelete = document.querySelector('.confirmationOfDelete')

const deleteCertificate = async (id) => {
    return await fetch(`https://sslwallet.app/api/certificates/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
            'Content-Type': 'application/json'
        },
    }).then(res => {
        return res.json()
    })
}

confirmationOfDelete.addEventListener('click', async () => {
    const del = await deleteCertificate(localStorage.getItem('deleteCertificateId'))
    window.location.href = '/index.html'
})