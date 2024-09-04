'use strict';

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
const arrowUp = document.querySelector('.arrow__up');


document.addEventListener('scroll', () => {

    // Transparent Navbar when it is on the top, Blue color navbar when scroll is below the navbar
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }

    //Home is getting transparent when the scroll down
    home.style.opacity = 1 - window.scrollY/homeHeight;

    //show arrow up button when scrolling down
    if(window.scrollY > homeHeight/2) {
        arrowUp.classList.add('visible');
    } else {
        arrowUp.classList.remove('visible');
    }
})

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
const navbarMenu = document.querySelector('.navbar__menu');
navbarToggleBtn.addEventListener('click', (event) => {  
    console.log(navbarMenu);
    navbarMenu.classList.toggle('open');
});


//Scroll to the section when tapping on the navbar menu
navbarMenu.addEventListener('click', (event) => {

    const target = event.target;
    const targetMenu = target.dataset.menu;
    if(targetMenu == null) {
        return;
    } 

    navbarMenu.classList.remove('open');

    scrollIntoView(targetMenu);
    // selectNavItem(target);

})

//Scroll to contact section when "contact me" button
const contactMeBtn = document.querySelector('.home__contact');
contactMeBtn.addEventListener('click', (event) => {
    scrollIntoView("contact");
})

//Scroll to home when click allow up button
arrowUp.addEventListener('click', () =>{
    scrollIntoView("home");
})



// 1. Get all sections and menu items
const sectionIds = [
    'home',
    'about',
    'experience',
    'skills',
    'works',
    'contact'
];

const sections = sectionIds.map(id=> document.getElementById(id));
const navItems = sectionIds.map(id=> document.querySelector(`[data-menu="${id}"]`));
let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem (selected){
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}
// 2. observe my sections using intersectionObserver
const observerOptions = {
    root : null,
    rootMargin : '0px',
    threshold :  0.3,
}

const observerCallback = (entries, observer) => {

    // 3. active the menu item by the targeted section
    entries.forEach(entry => {

        if(!entry.isIntersecting && entry.intersectionRatio > 0){
            const index = sectionIds.indexOf(`${entry.target.id}`);
            // let selectedIndex;

            //when scrolling down, changed the targeted section
            if(entry.boundingClientRect.y < 0){
                selectedNavIndex = index+1;
            } else {
                selectedNavIndex = index-1;
            }
                
        }
    });
}
const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach(section => observer.observe(section));

window.addEventListener('wheel',()=>{
    if (window.scrollY === 0) {
        selectedNavIndex = 0;
    } else if (Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight){
        selectedNavIndex = navItems.length-1;
    }
    selectNavItem(navItems[selectedNavIndex]); 
})




function scrollIntoView (selector) {
    const scrollTo =  document.getElementById(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}



const projectBtn = document.querySelector('.work__categories');
const workProjects = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

projectBtn.addEventListener('click', (e) => {
    const projectFilter = e.target.dataset.projectfilter ||  e.target.parentNode.dataset.projectfilter;

    if(projectFilter == null) {
        return;
    }

    const selected = document.querySelector('.category__btn.selected');
    selected.classList.remove('selected');
    //if button is clicked, use button. else (span is clicked) use parent node 
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');

    workProjects.classList.add('animation_out');
    setTimeout(() => {
        projects.forEach((project) => {
            if(projectFilter === 'all' || projectFilter === project.dataset.type){
                project.classList.remove('project__invisible');
            } else {
                project.classList.add('project__invisible');
            }
        })

        workProjects.classList.remove('animation_out');
    },300);
})
