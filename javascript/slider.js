class Slider {
    constructor(container, pictures){
        this.container = container
        this.pictures  = pictures
        this.thumbs    = []
        this.slideVelocity = 25
        this.slideFriction = 0.85
        this.animationOffset = 0
        this.photoContainer = container.getElementsByClassName('photo-container')[0]
        this.button    = container.getElementsByClassName('next-button')[0]
        this.addListener()
        this.addPictures()
    }

    addPictures(){
        this.photoContainer.dataset.left = 0;
        this.pictures.forEach(p => {
            let newPic = document.createElement('span')
            newPic.classList.add('thumb-container')
            newPic.innerHTML =  `
            <span class="overlay">
                <div class="icon-container"><img src="./images/user.png" alt="" class="author-icon"></div>
                <h4 class="meta-heading">emerson martinez</h4>
                <div class="line"></div>
            </span>
            <img src="${p}" alt="" class="thumb">
            `
            newPic.style.left = 0 + 'px'
            newPic.dataset.left  = 0
            this.photoContainer.appendChild(newPic)
            this.thumbs.push(newPic)
        })
    }

    fadeIn(){
        let lastThumb = this.thumbs[this.thumbs.length - 1]
        let intOp = parseInt(lastThumb.dataset.opacity)
        lastThumb.dataset.opacity = intOp
        lastThumb.dataset.opacity += 0.1
        lastThumb.style.opacity = lastThumb.dataset.opacity
        let stop = requestAnimationFrame(this.fadeIn.bind(this))
        if(lastThumb.dataset.opacity >= 1){
            cancelAnimationFrame(stop)
        }
    }

    slide(){ 
        this.photoContainer.dataset.left -= this.slideVelocity
        this.slideVelocity *= this.slideFriction
        this.photoContainer.style.left = this.photoContainer.dataset.left + 'px'
        this.animationOffset += 10
        let stop = requestAnimationFrame(this.slide.bind(this))
        if(this.animationOffset > 150){
            cancelAnimationFrame(stop) 
            this.animationOffset = 0
            this.photoContainer.style.left = '0px'
            this.photoContainer.dataset.left = 0
            this.slideVelocity = 25
        } 
    }

    addAndRemove(){
        this.thumbs.splice(0,1)
        this.photoContainer.dataset.left = 150
        this.photoContainer.style.left = '150px'

        let randomInt = Math.floor(Math.random() * this.pictures.length)

        let newPic = document.createElement('span')
            newPic.classList.add('thumb-container')
            newPic.innerHTML =  `
            <span class="overlay">
                <div class="icon-container"><img src="./images/user.png" alt="" class="author-icon"></div>
                <h4 class="meta-heading">emerson martinez</h4>
                <div class="line"></div>
            </span>
            <img src="${this.pictures[randomInt]}" alt="" class="thumb">
            `

        this.slide()
        this.button.style.left = '152px'; 
        setTimeout(()=>{
            this.photoContainer.appendChild(newPic)
            this.button.style.left = '0px'; 
        }, 300)

        this.photoContainer.removeChild(this.photoContainer.children[0])
        this.thumbs.push(newPic)
        
    }

    addListener(){
        this.button.addEventListener('click', e => {
            this.addAndRemove()
        })
    }
}

function initSliders(){
    let i = 0
    Array.from(document.getElementsByClassName('gallery-row')).forEach(g => {
        new Slider(g, arguments[i])
        i++
    })
}