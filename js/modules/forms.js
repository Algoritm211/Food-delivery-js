import { postData } from "../services/services"
import { hideModal, showModal } from "./modal"



function forms(formSelector, modalTimerId) {
    // Forms

    const forms = document.querySelectorAll(formSelector)

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, скоро с Вами свяжется наш менеджер',
        failure: 'Что-то пошло не так, попробуйте еще раз'
    }


    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault()

            const statusMessage = document.createElement('img')
            statusMessage.src = message.loading
            statusMessage.classList.add('modal-window-spinner')
            // form.append(statusMessage)
            form.insertAdjacentElement('afterend', statusMessage)

            // При пост-запросе НЕ ДЛЯ JSON не указывать хедеры
            const formData = new FormData(form)
            // const obj = {}
            // // логика для JSON
            // formData.forEach(function (value, key) {
            //     obj[key] = value
            // })

          
            
            const json = JSON.stringify(Object.fromEntries(formData.entries()))

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success)                 
                statusMessage.remove()
            }).catch((e) => {
                console.log(e);
                showThanksModal(message.failure)
            }).finally(() => {
                form.reset()
            })

        })
    }


    forms.forEach((item) => {
        bindPostData(item)
    })

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog')

        prevModalDialog.classList.add('hide')
        prevModalDialog.classList.remove('show')
        showModal('.modal', modalTimerId)

        const thanksModal = document.createElement('div')
        thanksModal.classList.add('modal__dialog')

        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `

        document.querySelector('.modal').append(thanksModal)
        setTimeout(() => {
            thanksModal.remove()
            prevModalDialog.classList.add('show')
            prevModalDialog.classList.remove('hide')
            hideModal('.modal')
        }, 4000)
    }

    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(result => console.log(result))

}

export default forms