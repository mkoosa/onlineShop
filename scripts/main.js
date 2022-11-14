//dropdown menu




import basket from './Basket.esm.js';
import {
    storage
} from './Storage.esm.js';


window.onload = () => {
    appear();
    changingWidth();
    if (!storage.getItemFromStorage()) {
        localStorage.setItem('items', JSON.stringify([]))
        basket.bag = storage.getItemFromStorage()
    };
};

const dropDownItems = document.querySelectorAll('.dropdown-hover');
const linkProducts = document.querySelector('.link-products')
const headerNavSell = document.querySelector('.header__nav--sell');
const navLinks = document.querySelectorAll(['.nav-list__item-link--template', '.nav-list__item--resource']);
const sellNavLinksList = document.querySelector('.nav-dropdown__item--sell')
const linkResource = document.querySelector('.link-resource');
const headerNavResource = document.querySelector('.header__nav--resource')

window.onresize = () => {
    changingWidth();
}

function changingWidth() {
    let windowWidth = window.innerWidth;
    if (windowWidth >= 992) {
        dropDownItems.forEach(dropdownItem => {
           
            dropdownItem.addEventListener('mouseover', visible)
        });

        dropDownItems.forEach(dropdownItem => {
            dropdownItem.addEventListener('mouseout', unVisible);
        });
        linkProducts.removeEventListener('click', dropProductItems);
        linkResource.removeEventListener('click', dropResourceItems);
    }
    if ((windowWidth < 992)) {
        linkProducts.addEventListener('click', dropProductItems);
        linkResource.addEventListener('click', dropResourceItems);
        dropDownItems.forEach(dropdownItem => {
            dropdownItem.removeEventListener('mouseover', visible)
        });

        dropDownItems.forEach(dropdownItem => {
            dropdownItem.removeEventListener('mouseout', unVisible);
        });
    };
}

function visible() {
        this.firstElementChild.nextElementSibling.style.cssText = 'transform: rotate(180deg); transition: transform .2s'
        this.lastElementChild.style.cssText = 'opacity: 1; visibility: visible';
}

function unVisible() {    
        this.firstElementChild.nextElementSibling.style.cssText = 'transform: rotate(0deg); transition: transform .2s'
        this.lastElementChild.style.cssText = 'opacity: 0; visibility: hidden';

}

function dropProductItems() {
    headerNavSell.classList.toggle('active');
    sellNavLinksList.classList.toggle('active');
    navLinks.forEach(link => link.classList.toggle('active'))

};

function dropResourceItems() {
    headerNavResource.classList.toggle('active')
}


// appear disappear section elements

const sections = document.querySelectorAll(['.main__top', '.selling', '.store-management__wrapper', '.starting']);
window.addEventListener('scroll', appear);

function appear() {
    sections.forEach(section => {
        let elementTop = Number(section.getBoundingClientRect().top.toFixed());
        let elementBottom = Number(section.getBoundingClientRect().bottom.toFixed());
        let windowHeight = Number(window.innerHeight.toFixed());
        let sectionHeight = windowHeight - elementTop;
        if (sectionHeight > 0 && elementBottom > 0) {
            section.classList.add('appear')
        } else {
            section.classList.remove('appear')
        };
    });
};


//hamburger menu

const hamburger = document.querySelector('.hamburger');
const smallMenu = document.querySelector('.small-menu');
const firstLine = document.querySelector('.hamburger__line--first');
const secondLine = document.querySelector('.hamburger__line--second');
const thirdLine = document.querySelector('.hamburger__line--third');
const navList = document.querySelector('.nav-list');
const headerButtons = document.querySelector('.header__buttons');

hamburger.addEventListener('click', hamburgerMenuActive);

function hamburgerMenuActive() {
    hamburger.classList.toggle('active');
    smallMenu.classList.toggle('active');
    firstLine.classList.toggle('active');
    secondLine.classList.toggle('active');
    thirdLine.classList.toggle('active');
    navList.classList.toggle('active');
    headerButtons.classList.toggle('active');


}




























// function mainSectionAppear() {
//     const mainSectionElements = document.querySelectorAll(['.top__left', '.top__right']);
//     mainSectionElements.forEach(element => element.classList.add('appear'))
// };

// const mainTop = document.querySelector('.main__top');
// const sellingSection = document.querySelector('.selling');
// const storeManagementSection = document.querySelector('.store-management__wrapper');
// const startingSection = document.querySelector('.starting');

// const mainTopBottom = mainTop.getBoundingClientRect().bottom

// let storeManagementSectionTop = storeManagementSection.getBoundingClientRect().top;
// let startingSectionTop = startingSection.getBoundingClientRect().top;