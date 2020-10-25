
function hideModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector)

    modalWindow.classList.add('hide')
    modalWindow.classList.remove('show')
    document.body.style.overflow = ''
}

function showModal(modalSelector, modalTimerId) {
    const modalWindow = document.querySelector(modalSelector)

    modalWindow.classList.add('show')
    modalWindow.classList.remove('hide')
    document.body.style.overflow = 'hidden'

    // console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId)
    }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // Modal window

    const buttonsModal = document.querySelectorAll(triggerSelector)
    const modalWindow = document.querySelector(modalSelector)
    // const closeModalButton = document.querySelector('[data-close]')


    buttonsModal.forEach(button => {
        button.addEventListener('click', () => {
            showModal(modalSelector, modalTimerId)
        })
    })

    // closeModalButton.addEventListener('click', hideModal)

    modalWindow.addEventListener('click', (event) => {
        if (event.target && (event.target === modalWindow || event.target.getAttribute('data-close') === '')) {
            hideModal(modalSelector)
        }
    })

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            hideModal(modalSelector)
        }
    })

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            // console.log(window.pageYOffset, '~~~~~', document.documentElement.clientHeight, '~~~~~', document.documentElement.scrollHeight);
            showModal(modalSelector, modalTimerId)
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll)


}

export default modal

export {
    showModal, 
    hideModal
}