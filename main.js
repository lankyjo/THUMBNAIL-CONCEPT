const thumbnail = {
    item: document.querySelectorAll('.section-thumbnail-item'),
    itemText: document.querySelectorAll('.section-thumbnail-item > h1'),
    figure: document.querySelectorAll('.section-thumbnail-item-figure')
}
const bg = {
    media: document.querySelectorAll('.section-bg-media'),
    mediaImage: document.querySelectorAll('.section-bg-media img'),
    mediaText: document.querySelectorAll('.section-bg-media-text > span')
}
const clipPath = {
    init: 'polygon(0% 0%, 0% 0%, 10% 100%, 10% 100%)',
    full: 'polygon(100% 0%, 0% 0%, 10% 100%, 90% 100%)'
}
gsap.defaults({
    duration: 1.1,
    ease: 'expo.inOut',
    overwrite: true
})

const init = () => { 
    gsap.set(thumbnail.item, {yPercent: 120});
    gsap.set(bg.media, {clipPath: clipPath.init, scale: 1.25});
    gsap.set(bg.mediaText, {yPercent: 100})
    gsap.to(thumbnail.item, {yPercent: 0, stagger: 0.032})
}

const animateClipPath = (index, eventType) =>{
    for(let i = 0; i<bg.media.length; i++){
        gsap.to(bg.media[index], {
            clipPath: ()=> (eventType === 'mouseenter'? clipPath.full:clipPath.init)
        })
        gsap.to(bg.mediaImage[index], {
            scale: ()=> eventType === 'mouseenter' ? 1 : 1.25,
        })
        gsap.to(bg.mediaText[index], {yPercent: ()=> (eventType ==='mouseenter'? 0 : 100)})
    }
}
const animateStyle = (item, eventType) =>{
    thumbnail.item.forEach(otherItem => {
        if(otherItem === item ){
            otherItem.style.color = eventType=== 'mouseenter'?'white': '#181818';
        }else{
            otherItem.style.opacity  = eventType === 'mouseenter' ? 0.5 : 1
        }
    })
}

const addEventListeners = () => {
    thumbnail.item.forEach((item, index)=> {
        const figure = thumbnail.figure[index];

        const handleInteraction = (event) =>{
            const eventType = event.type === 'touchstart' || event.type === 'mouseenter' ? 'mouseenter' : 'mouseleave';
            animateClipPath(index, eventType)
            animateStyle(index, eventType)
            eventType === 'mouseenter' ? figure.classList.add('active') : figure.classList.remove('active')
        }

        item.addEventListener('mouseenter', handleInteraction)
        item.addEventListener('mouseleave', handleInteraction)
        item.addEventListener('touchstart', handleInteraction)
        item.addEventListener('touchend', handleInteraction)
        
    })
}

window.addEventListener('DOMContentLoaded', ()=>{
    init();
    addEventListeners()
})

