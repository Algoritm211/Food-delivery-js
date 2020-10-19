window.addEventListener('DOMContentLoaded', () => {
 
    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item')
    const parentTabs = document.querySelector('.tabheader__items')
    const tabsContent = document.querySelectorAll('.tabcontent')

    function hideTabsContent() {
        tabsContent.forEach(tab => {
            tab.classList.remove('show', 'fade')
            tab.classList.add('hide')
        })

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active')
        })
    }

    function showTabsContent(itemNumber = 0) {
        tabsContent[itemNumber].classList.remove('hide')
        tabsContent[itemNumber].classList.add('show', 'fade')

        tabs[itemNumber].classList.add('tabheader__item_active')
    }

    hideTabsContent()
    showTabsContent()

    parentTabs.addEventListener('click', (event) => {
        const target = event.target

        if (target && target.classList.contains('tabheader__item')) {

            tabs.forEach((tab, index) => {
                if (tab === target) {
                    hideTabsContent()
                    showTabsContent(index)
                }
            })
        }
    })

    // Timer

    const deadline = '2020-12-12'

    function getTimeRemaining(endtime) {
        const timeDiff = Date.parse(endtime) - Date.parse(new Date())

        const days = Math.floor(timeDiff/(1000 * 60 * 60 * 24))
        const hours = Math.floor((timeDiff / (1000 * 60 * 60) % 24))
        const minutes = Math.floor((timeDiff / (1000 * 60)) % 60)
        const seconds = Math.floor((timeDiff / 1000) % 60)

        return {
            total: timeDiff,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }

    }

    function getZero(number) {
        if (number >= 0 && number < 10) {
            return `0${number}`
        }
        return number
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector)
        const days = timer.querySelector('#days')
        const hours = timer.querySelector('#hours')
        const minutes = timer.querySelector('#minutes')
        const seconds = timer.querySelector('#seconds')
        const timeInterval = setInterval(updateClock, 1000)

        updateClock()

        function updateClock() {
            
            const timeDiff = getTimeRemaining(endtime)

            days.innerHTML = getZero(timeDiff.days)
            hours.innerHTML = getZero(timeDiff.hours)
            minutes.innerHTML = getZero(timeDiff.minutes)
            seconds.innerHTML = getZero(timeDiff.seconds)

            if (timeDiff.total <= 0) {
                clearInterval(timeInterval)
            }

        }

    }

    setClock('.timer', deadline)

    // Modal window

    const buttonsModal = document.querySelectorAll('[data-modal]')
    const modalWindow = document.querySelector('.modal')
    const closeModalButton = document.querySelector('[data-close]')

    function hideModal() {
        modalWindow.classList.add('hide')
        modalWindow.classList.remove('show')
        document.body.style.overflow = ''
    }

    function showModal() {
        modalWindow.classList.add('show')
        modalWindow.classList.remove('hide')
        document.body.style.overflow = 'hidden'
        clearInterval(modalTimerId)
    }

    buttonsModal.forEach(button => {
        button.addEventListener('click', showModal)
    })

    closeModalButton.addEventListener('click', hideModal)

    modalWindow.addEventListener('click', (event) => {
        if (event.target && event.target === modalWindow) {
            hideModal()
        }
    })

    document.addEventListener('keydown', (event) => {
        if (event.code = 'Escape' && modal.classList.contains('show')) {
            hideModal()
        }
    })

    // const timeOpenModal = 15000 //15s

    // const modalTimerId = setTimeout(showModal, timeOpenModal);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight === document.documentElement.scrollHeight - 1) {
            // console.log(window.pageYOffset, '~~~~~', document.documentElement.clientHeight, '~~~~~', document.documentElement.scrollHeight);
            showModal()
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll)

    // Использование классов

    class MenuCard {

        constructor(imgSrc, alt, menuTitle, menuDescr, price, parentSelector, ...classes) {
            this.imgSrc = imgSrc
            this.alt = alt
            this.menuTitle = menuTitle
            this.menuDescr = menuDescr
            this.parentSelector = document.querySelector(parentSelector)
            this.classes = classes
            this.price = price
            this.transfer = 27
            this.changeToUAH()
        }

        changeToUAH() {
            this.price = this.transfer * this.price
        }

        render() {
            const element = document.createElement('div')

            if (this.classes.length) {
                this.classes.forEach(classItem => element.classList.add(classItem))
            } else {
                this.elementClass = 'menu__item'
                element.classList.add(this.elementClass)
            }
            element.innerHTML = `
                <img src=${this.imgSrc} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.menuTitle}</h3>
                <div class="menu__item-descr">${this.menuDescr}</div>
                <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            
            `

            this.parentSelector.append(element)       
        }
    }


    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        10,
        '.menu .container',
        // 'menu__item'
    ).render()
})


