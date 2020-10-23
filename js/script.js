
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
    // const closeModalButton = document.querySelector('[data-close]')

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

    // closeModalButton.addEventListener('click', hideModal)

    modalWindow.addEventListener('click', (event) => {
        if (event.target && (event.target === modalWindow || event.target.getAttribute('data-close') === '')) {
            hideModal()
        }
    })

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            hideModal()
        }
    })

    const timeOpenModal = 1500000 //15s

    const modalTimerId = setTimeout(showModal, timeOpenModal);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
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

    // Fetch example
    // const getResources = async (url) => {
    //     const res = await fetch(url)

    //     if (!res.ok) {
    //         throw new Error(`Произошла ошибка, данные по адресу ${url} не были 
    //                             загружены статус ошибки: ${res.status}`)
    //     }

    //     return await res.json()
    // }

    // Axios example

    axios.get('http://localhost:3000/menu')
        .then(menuData => {
            createCard(menuData.data)
        })

    // getResources('http://localhost:3000/menu')
    //     .then((dataMenu) => {
    //         dataMenu.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(
    //                 img, 
    //                 altimg, 
    //                 title, 
    //                 descr, 
    //                 price,
    //                 '.menu .container'
    //             ).render()
    //         })
    //     })


    // getResources('http://localhost:3000/menu')
    //     .then(menuData => {
    //         createCard(menuData)
    //     })

    function createCard(data) {
        data.forEach(({img, altimg, title, descr, price}) => {
            const element = document.createElement('div')
            element.classList.add('menu__item')

            price = price * 27

            element.innerHTML = `
            <img src=${img} alt=${altimg}>
            <h3 class="menu__item-subtitle">${title}</h3>
            <div class="menu__item-descr">${descr}</div>
            <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${price}</span> грн/день</div>
        
            `
            document.querySelector('.menu .container').append(element)
        })
    }

    // Forms

    const forms = document.querySelectorAll('form')

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, скоро с Вами свяжется наш менеджер',
        failure: 'Что-то пошло не так, попробуйте еще раз'
    }


    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        })
        return await res.json()

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

          
            
            json = JSON.stringify(Object.fromEntries(formData.entries()))

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
        showModal()

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
            hideModal()
        }, 4000)
    }

    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(result => console.log(result))


    // Slider

    // const sliderPhotos = document.querySelectorAll('.offer__slide')
    // const nextButton = document.querySelector('.offer__slider-next')
    // const prevButton = document.querySelector('.offer__slider-prev')
    // const totalPhotosNumber = document.querySelector('#total')
    // const currentPhotoNumber = document.querySelector('#current')

    // totalPhotosNumber.innerHTML = getZero(sliderPhotos.length)
    
    // sliderPhotosHide()
    // sliderPhotoShow()

    // function sliderPhotosHide() {
    //     sliderPhotos.forEach((photo) => {
    //         photo.classList.remove('show')
    //         photo.classList.add('hide')
    //     })
    // }

    // function sliderPhotoShow(itemIndex = 0) {
    //     // console.log(itemIndex);
    //     sliderPhotos[itemIndex].classList.add('show')
    //     sliderPhotos[itemIndex].classList.remove('hide')

    //     currentPhotoNumber.innerHTML = getZero(itemIndex + 1)
    // }

    // function switchSlider(nextNumber) {
    //     const newTarget = +currentPhotoNumber.innerHTML - 1 + nextNumber

    //     if (newTarget >= +totalPhotosNumber.innerHTML) {
    //         sliderPhotosHide()
    //         sliderPhotoShow()
    //     } else if (newTarget < 0) {
    //         sliderPhotosHide()
    //         sliderPhotoShow(sliderPhotos.length - 1)
    //     } else {
    //         // console.log(newTarget);
    //         sliderPhotosHide()
    //         sliderPhotoShow(newTarget)
    //     }
    // }

    // nextButton.addEventListener('click', () => {
    //     switchSlider(1)
    // })

    // prevButton.addEventListener('click', () => {
    //     switchSlider(-1)
    // })

    // Slider V2.0

    const sliderPhotos = document.querySelectorAll('.offer__slide')
    const slider = document.querySelector('.offer__slider')
    const nextButton = document.querySelector('.offer__slider-next')
    const prevButton = document.querySelector('.offer__slider-prev')
    const totalPhotosNumber = document.querySelector('#total')
    const currentPhotoNumber = document.querySelector('#current')
    const slidesWrapper = document.querySelector('.offer__slider-wrapper')
    const slidesField = document.querySelector('.offer__slider-inner')
    const width = window.getComputedStyle(slidesWrapper).width

    totalPhotosNumber.innerHTML = getZero(sliderPhotos.length)

    let slideIndex = 1
    currentPhotoNumber.innerHTML = getZero(1)

    let offset = 0

    slidesField.style.width = `${100 * sliderPhotos.length}%`
    slidesField.style.display = 'flex'
    slidesField.style.transition = '0.5s all'
    slidesWrapper.style.overflow = 'hidden'

    sliderPhotos.forEach(slide => {
        slide.style.width = width
    })

    slider.style.position = 'relative'

    const indicators = document.createElement('ol')
    const dots = []
    indicators.classList.add('carousel-indicators')

    slider.append(indicators)
    
    for(let i = 0; i < sliderPhotos.length; i++) {
        const dot = document.createElement('li')
        dot.setAttribute('data-slide-to', i + 1)
        dot.classList.add('dot')

        if (i === 0) {
            dot.style.opacity = 1
        }
        indicators.append(dot)
        dots.push(dot)
    }
    // service funcs
    function deleteNoDigits(str) {
        return +str.replace(/\D/g, '')
    }

    function changeSliderDot() {
        dots.forEach(dot => {
            dot.style.opacity = 0.5
        })

        dots[slideIndex - 1].style.opacity = 1
    }

    // end of service funcs



    nextButton.addEventListener('click', () => {
        if (offset === deleteNoDigits(width) * (sliderPhotos.length - 1)) {
            offset = 0
        } else {
            offset += deleteNoDigits(width) 
        }

        slidesField.style.transform = `
            translateX(-${offset}px)
        `
        if (slideIndex === sliderPhotos.length) {
            slideIndex = 1
        } else {
            slideIndex += 1
        }

        currentPhotoNumber.innerHTML = getZero(slideIndex)

        changeSliderDot()
    
    })

    prevButton.addEventListener('click', () => {
        if (offset === 0) {
            offset = deleteNoDigits(width) * (sliderPhotos.length - 1)
        } else {
            offset -= deleteNoDigits(width)
        }

        slidesField.style.transform = `
            translateX(-${offset}px)
            `
        
        if (slideIndex === 1) {
            slideIndex = sliderPhotos.length
        } else {
            slideIndex -= 1
        }

        currentPhotoNumber.innerHTML = getZero(slideIndex)

        changeSliderDot()

    })

    dots.forEach((dot) => {

        dot.addEventListener('click', () => {
            const numberOfSliderAttr = +dot.getAttribute('data-slide-to')
            slideIndex = numberOfSliderAttr
            offset = deleteNoDigits(width) * (slideIndex - 1)

            slidesField.style.transform = `translateX(-${offset}px)`
            currentPhotoNumber.innerHTML = getZero(slideIndex)

            changeSliderDot()

        })
    })
})
