import tabs from './modules/tabs'
import modal, { showModal } from './modules/modal'
import timer from './modules/timer'
import cards from './modules/cards'
import calc from './modules/calc'
import forms from './modules/forms'
import slider  from './modules/slider'
import 'nodelist-foreach-polyfill'

require('es6-promise').polyfill();

window.addEventListener('DOMContentLoaded', () => {

    const timeOpenModal = 1500000 //15s
    const modalTimerId = setTimeout(() => showModal('.modal', modalTimerId), timeOpenModal);

    timer('.timer', '2020-12-12')
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active')
    modal('[data-modal]', '.modal', modalTimerId)
    cards()
    calc()
    forms('form', modalTimerId)
    slider({
        container: '.offer__slider', 
        slide: '.offer__slide', 
        nextArrow: '.offer__slider-next', 
        prevArrow: '.offer__slider-prev', 
        totalCounter: '#total', 
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper', 
        field: '.offer__slider-inner'
    })
})

