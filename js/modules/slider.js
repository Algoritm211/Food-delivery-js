import { getZero } from "./timer"

function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // Slider V2.0

    const sliderPhotos = document.querySelectorAll(slide)
    const slider = document.querySelector(container)
    const nextButton = document.querySelector(nextArrow)
    const prevButton = document.querySelector(prevArrow)
    const totalPhotosNumber = document.querySelector(totalCounter)
    const currentPhotoNumber = document.querySelector(currentCounter)
    const slidesWrapper = document.querySelector(wrapper)
    const slidesField = document.querySelector(field)
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
            // console.log(numberOfSliderAttr, slideIndex, width, offset);

            slidesField.style.transform = `translateX(-${offset}px)`
            currentPhotoNumber.innerHTML = getZero(slideIndex)

            changeSliderDot()

        })
    })


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

}

export default slider