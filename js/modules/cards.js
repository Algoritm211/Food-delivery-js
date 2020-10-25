import { getResources } from "../services/services";

function cards() {
  // Использование классов
  class MenuCard {
    constructor(
      imgSrc,
      alt,
      menuTitle,
      menuDescr,
      price,
      parentSelector,
      ...classes
    ) {
      this.imgSrc = imgSrc;
      this.alt = alt;
      this.menuTitle = menuTitle;
      this.menuDescr = menuDescr;
      this.parentSelector = document.querySelector(parentSelector);
      this.classes = classes;
      this.price = price;
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.transfer * this.price;
    }

    render() {
      const element = document.createElement("div");

      if (this.classes.length) {
        this.classes.forEach((classItem) => element.classList.add(classItem));
      } else {
        this.elementClass = "menu__item";
        element.classList.add(this.elementClass);
      }
      element.innerHTML = `
                <img src=${this.imgSrc} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.menuTitle}</h3>
                <div class="menu__item-descr">${this.menuDescr}</div>
                <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            
            `;

      this.parentSelector.append(element);
    }
  }

  // Fetch example
  // *Using getResources from services.js*
  // Axios example

  axios.get("http://localhost:3000/menu").then((menuData) => {
    createCard(menuData.data);
  });

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
    data.forEach(({ img, altimg, title, descr, price }) => {
      const element = document.createElement("div");
      element.classList.add("menu__item");

      price = price * 27;

      element.innerHTML = `
            <img src=${img} alt=${altimg}>
            <h3 class="menu__item-subtitle">${title}</h3>
            <div class="menu__item-descr">${descr}</div>
            <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${price}</span> грн/день</div>
        
            `;
      document.querySelector(".menu .container").append(element);
    });
  }
}

export default cards;
