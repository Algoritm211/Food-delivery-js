
function getZero(number) {
    if (number >= 0 && number < 10) {
        return `0${number}`
    }
    return number
}

function timer(timerId, deadline) {
    // Timer

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

    setClock(timerId, deadline)
}

export default timer
export {getZero}