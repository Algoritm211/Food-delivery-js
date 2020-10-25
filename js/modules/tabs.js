function tabs(tabsSelector, tabsContentSelector, parentTabsSelector, activeClass) {
    //Tabs
    const tabs = document.querySelectorAll(tabsSelector)
    const tabsContent = document.querySelectorAll(tabsContentSelector)
    const parentTabs = document.querySelector(parentTabsSelector)

    function hideTabsContent() {
        tabsContent.forEach(tab => {
            tab.classList.remove('show', 'fade')
            tab.classList.add('hide')
        })

        tabs.forEach(tab => {
            tab.classList.remove(activeClass)
        })
    }

    function showTabsContent(itemNumber = 0) {
        tabsContent[itemNumber].classList.remove('hide')
        tabsContent[itemNumber].classList.add('show', 'fade')

        tabs[itemNumber].classList.add(activeClass)
    }

    hideTabsContent()
    showTabsContent()

    parentTabs.addEventListener('click', (event) => {
        const target = event.target

        if (target && target.classList.contains(tabsSelector.slice(1))) {

            tabs.forEach((tab, index) => {
                if (tab === target) {
                    hideTabsContent()
                    showTabsContent(index)
                }
            })
        }
    })
}

export default tabs