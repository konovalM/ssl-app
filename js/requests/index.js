window.addEventListener('load', () => {
    if (!localStorage.hasOwnProperty('jwt') || !localStorage.getItem('jwt')){
        console.log(1231231)
        window.location.href = '/entrance.html'
    }
})

const postReq = async () => {
    return await fetch('https://sslwallet.app/api/certificates', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        /*mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit*/
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
            'Content-Type': 'application/json'
        },
        /*redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client*/
        //body: JSON.stringify(data)  body data type must match "Content-Type"
    }).then(res => {
        return res.json()
    })
}



// Draft certificates
let deleteBtns;

window.addEventListener('load', () => {
    const res = postReq()
        .then(res => {
            let certificates = res.data.filter(certificate => {
                return certificate.status === 'Draft'
            }).map(certificate => {
                return createDraftCard(certificate)
            })
            document.querySelector('.createNewCertificate').insertAdjacentHTML('afterend', certificates.join(''))
            document.querySelector('.countDraftCertificates').innerText = `(${certificates.length})`

            // delete certificate

            deleteBtns = document.querySelectorAll('.deleteCertificateImg')

            deleteBtns.forEach((item, i) => {
                item.addEventListener('click', async () => {
                    const certificates = await postReq()
                    let draftCertificates = certificates.data.filter((item, i) => {
                        return item.status === 'Draft'
                    })
                    console.log(draftCertificates[i].id)
                    localStorage.setItem('deleteCertificateId', draftCertificates[i].id)
                    window.location.href = '/deleteDraft.html'
                    //
                })
            })
        })
})

const createDraftCard = (certificate) => {
    return `
        <div class="sertificates-table__row draft__certificate">
            <div class="open-arrow"></div>
            <div class="sertificates-table__item domains">${certificate.domain}</div>
            <div class="sertificates-table__item type"><div class="d-block d-sm-none">SSL type</div><span>${certificate.certificate_type.type}</span></div>
            <div class="sertificates-table__item cost"><div class="d-block d-sm-none">Period/Cost</div><span>1-year / ${certificate.certificate_type.price}</span></div>
            <div class="sertificates-table__item action relative">
                <a class="btn-invert">issue</a>
                <button class="deleteCertificateBtn">
                    <img src="../../img/cross.svg" alt="delete certificate" class="deleteCertificateImg">
                </button>
            </div>
        </div>`
}



// Issued certificates

window.addEventListener('load', () => {
    const res = postReq()
        .then(res => {
            let certificates = res.data.filter(certificate => {
                return certificate.status === 'Issued'
            }).map(certificate => {
                return createIssuedCard(certificate)
            })
            document.querySelector('.issuedCertificates').insertAdjacentHTML('afterend', certificates.join(''))
            document.querySelector('.countIssuedCertificates').innerText = `(${certificates.length})`
        })
})

const createIssuedCard = (certificate) => {
    let autoProlangate;
    if (certificate.autoProlangate){
        autoProlangate = '<input type="checkbox" name="auto-prolongate" checked>'
    } else{
        autoProlangate = '<input type="checkbox" name="auto-prolongate">'
    }
    return `
        <div class="sertificates-table__row issued__certificate"><div class="open-arrow"></div>
            <div class="sertificates-table__item domains">${certificate.domain}</div>
            <div class="sertificates-table__item type"><div class="d-block d-sm-none">SSL type</div><span>${certificate.certificate_type.type}</span></div>
            <div class="sertificates-table__item cost"><div class="d-block d-sm-none">Expires</div><span>12.03.2022</span></div>
            <div class="sertificates-table__item auto">
                <div class="d-block d-sm-none">Auto-prolongate</div>
                <div class="sertificates-prolongate">
                    ${autoProlangate}
<!--                    <input type="checkbox" name="auto-prolongate" checked=${false}>-->
                    <div class="sertificates-prolongate__wrap"></div>
                </div>
            </div>
            <div class="sertificates-table__item action"><a href="validation.html" class="btn-invert">view</a></div>
        </div>
`
}

// Expired certificates

window.addEventListener('load', () => {
    const res = postReq()
        .then(res => {
            let certificates = res.data.filter(certificate => {
                return certificate.status === 'Expired'
            }).map(certificate => {
                return createExpiredCard(certificate)
            })
            document.querySelector('.expiredCertificates').insertAdjacentHTML('afterend', certificates.join(''))
            document.querySelector('.countExpiredCertificates').innerText = `(${certificates.length})`
        })
})

const createExpiredCard = (certificate) => {
    return `
        <div class="sertificates-table__row expired__certificate"><div class="open-arrow"></div>
            <div class="sertificates-table__item domains">${certificate.domain}</div>
            <div class="sertificates-table__item type"><div class="d-block d-sm-none">SSL type</div><span>${certificate.certificate_type.type}</span></div>
            <div class="sertificates-table__item cost"><div class="d-block d-sm-none">Expires</div><span>12.03.2022</span></div>
            <div class="sertificates-table__item action"><a href="#" class="btn-invert renew" title="renew page">renew</a></div>
        </div>`
}

// Canceled certificates

window.addEventListener('load', () => {
    const res = postReq()
        .then(res => {
            console.log(res.data)
            let certificates = res.data.filter(certificate => {
                return certificate.status === 'Canceled'
            }).map(certificate => {
                return createCanceledCard(certificate)
            })
            console.log(certificates)
            document.querySelector('.canceledCertificates').insertAdjacentHTML('afterend', certificates.join(''))
        })
})

const createCanceledCard = (certificate) => {
    return `
        <div class="sertificates-table__row canceled__certificate"><div class="open-arrow"></div>
            <div class="sertificates-table__item domains">${certificate.domain}</div>
            <div class="sertificates-table__item type"><div class="d-block d-sm-none">SSL type</div><span>${certificate.certificate_type.type}</span></div>
            <div class="sertificates-table__item cost"><div class="d-block d-sm-none">Expires</div><span>12.03.2022</span></div>
            <div class="sertificates-table__item action"><button type="button" class="btn-invert">copy hash</button></div>
        </div>`
}


// add new certificate

const addNewCertificateBtn = document.querySelector('#add-certificate__btn')
const sertificatesTab = document.querySelectorAll('.sertificates-tab')
const tabsPanel = document.querySelectorAll('.tabs__panel')

function addCertificate() {
    sertificatesTab.forEach((element, i) => {
        if (i === 0){
            sertificatesTab[i].classList.add('active')
        } else{
            sertificatesTab[i].classList.remove('active')
        }
    })
    tabsPanel.forEach((element, i) => {
        if (i === 0){
            tabsPanel[i].classList.add('active')
        } else{
            tabsPanel[i].classList.remove('active')
        }
    })
    document.querySelector('.createNewCertificate').classList.toggle('createNewCertificateActive')
}

addNewCertificateBtn.addEventListener('click', addCertificate)

// log out

const logoutBtn = document.querySelector('.logOutLink')

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('jwt')
})

// add certificate

const domain = document.getElementById('newDomain')
const type = document.getElementById('selectChoose')
const duration = document.getElementById('selectDuration')
const createCertificateBtn = document.getElementById('createNewCertificate')

const createCertificate = async (data) => {
    createCertificateBtn.disabled = true
    return await fetch('https://sslwallet.app/api/certificates', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        /*mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit*/
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type"
    }).then(res => {
        return res.json()
    }).then(res => {
        createCertificateBtn.disabled = false
        window.location.href = '/index.html'
    })
}

createCertificateBtn.addEventListener('click', () => {
    if (domain.value.length >= 4){
        createCertificateBtn.disabled = false
        const day = new Date().getDate().toString().length === 1 ? '0' + new Date().getDate() : new Date().getDate()
        const month = (new Date().getMonth()+1).toString().length === 1 ? '0' + (new Date().getMonth()+1) : new Date().getMonth()+1
        const year = new Date().getFullYear()
        const nowDate = `${year}-${month}-${day}`
        const endDate = `${year+ +duration.value[0]}-${month}-${day}`
        let certificateType;
        switch (type.value){
            case 'simple':
                certificateType = 1
                break
            case 'wildcard':
                certificateType = 2
                break
            case 'multidomain':
                certificateType = 3
                break
        }
        const data = {
            domain: domain.value,
            startDate: nowDate,
            stopDate: endDate,
            autoProlangate: true,
            certificateType: certificateType
        }
        createCertificate(data)
    } else{
        console.log('Введите правильные данные')

    }
})


// search

const searchInput = document.getElementById('searchInput')

searchInput.addEventListener('input', () => {
    let val = searchInput.value
    let certificates;
    const tabs = document.querySelectorAll('.sertificates-tab')
    const arrList = ['draft__certificate', 'issued__certificate', 'expired__certificate', 'canceled__certificate']

    tabs.forEach((elem, i) => {
        if (elem.classList.contains('active')){
            certificates = document.querySelectorAll(`.${arrList[i]}`)
        }
    })


    if (val !== ''){
        certificates.forEach((elem, i) => {
            if (elem.querySelector('.domains').innerText.search(val) === -1){
                elem.style.display = 'none'
                elem.querySelector('.domains').innerHTML = elem.querySelector('.domains').innerText
            } else{
                elem.style.display = ''
                let str =  elem.querySelector('.domains').innerText
                elem.querySelector('.domains').innerHTML = insertMark(str,  elem.querySelector('.domains').innerText.search(val), val.length)
            }
        })
    } else{
        certificates.forEach((elem, i) => {
            elem.style.display = ''
            elem.querySelector('.domains').innerHTML = elem.querySelector('.domains').innerText
        })
    }
})

const insertMark = (string, pos, len) => {
    return string.slice(0, pos) + `<span style="background: #ff7c34;">` + string.slice(pos, pos + len) + `</span>` + string.slice(pos + len)
}




