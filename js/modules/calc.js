function calc() {
    // Calculator

    const result = document.querySelector('.calculating__result span')
    
    let sex
    let height
    let weight
    let age
    let ratio = '1.375' // коэфициент активности
    
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex')
    } else {
        sex = 'female'
        localStorage.setItem('sex', 'female')
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio')
    } else {
        ratio = 1.375
        localStorage.setItem('ratio', 1.375)
    }

    function initLocalSettings(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`)

        elements.forEach(element => {
            element.classList.remove(activeClass)

            if (element.getAttribute('id') === localStorage.getItem('sex')) {
                element.classList.add(activeClass)
            } 

            if (element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                element.classList.add(activeClass)
            }
        })
    }

    initLocalSettings('#gender', 'calculating__choose-item_active')
    initLocalSettings('.calculating__choose_big', 'calculating__choose-item_active')

    function calcTotalCalories() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '______'
            return
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio)
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio)
        }

    }

    calcTotalCalories()

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`)

        elements.forEach(element => {
            element.addEventListener('click', (event) => {
                if (event.target && event.target.getAttribute('data-ratio')) {
                    ratio = +event.target.getAttribute('data-ratio')
                    localStorage.setItem('ratio', +event.target.getAttribute('data-ratio'))
                } else {
                    sex = event.target.getAttribute('id')
                    localStorage.setItem('sex', event.target.getAttribute('id'))
                }
    
                elements.forEach(element => {
                    element.classList.remove(activeClass)
                })
    
                event.target.classList.add(activeClass)
                calcTotalCalories()
            })
        })
    }

    getStaticInformation('#gender', 'calculating__choose-item_active')
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active')

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector)

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red'
            } else {
                input.style.border = 'none'
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value
                    break;
                case 'weight':
                    weight = +input.value
                    break
                case 'age':
                    age = +input.value
                    break
                default:
                    break;
            }
            calcTotalCalories()
        })
    }

    getDynamicInformation('#height')
    getDynamicInformation('#weight')
    getDynamicInformation('#age')

}

export default calc