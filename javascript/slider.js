// need to add a starting size (in num of pics). 

//need to make it so that it shows photos in the correct order, not randomly.  

// we only use this.container to get this.photocontainer. would be much better if we just went ahead and created a container, or just didn't take a container, 
// only a photo container. that will simplify the user's markup. right now they have to have a container element with an element called 'photocontainer' inside it.
// let's just make it so they only need one of the two. 

// Let's make the photocontainer create itself inside of the element provided by the user. 
// Maybe the button element should be added in the constructor as well. 

// the amount of photos displayed should change with the width of the photocontainer. Add a listener for window resize that will check the
// size of the container, then check if there are too many photos by multiplying the width of the photos by the number of photos and seeing 
// if it exceeds the size of the container, and taking off as many photos as needed. 

// Allow user to pass in a custom element, but also provide a default element

class Slider {
    constructor(container, pictures, startingSize){
        this.container     = container
        this.startingSize  = startingSize
        this.pictures      = pictures
        this.thumbs        = []
        this.slideVelocity = 25
        this.slideFriction = 0.85
        this.animationOffset = 0
        this.photoContainer  = container.getElementsByClassName('photo-container')[0]
        this.button          = container.getElementsByClassName('next-button')[0]
        this.addButtonListener()
        this.addPictures()
        this.addResizeListener()
    }

    addPictures(){
        this.photoContainer.dataset.left = 0;
        let i = 0
        this.pictures.forEach(p => {
            if (i < this.startingSize){let newPic = document.createElement('span')
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
            this.thumbs.push(newPic)}
            i ++ 
        })
    }

    addResizeListener(){
        window.onresize = function(){
            console.log('resized')
        }
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
        this.button.style.left = '152px'; // make this dynaimcally change with the size of the photos. should be size + 2. 
        setTimeout(()=>{
            this.photoContainer.appendChild(newPic)
            this.button.style.left = '0px'; 
        }, 300)

        this.photoContainer.removeChild(this.photoContainer.children[0])
        this.thumbs.push(newPic)
        
    }

    addButtonListener(){
        this.button.addEventListener('click', e => {
            this.addAndRemove()
        })
    }
}

function initSliders(){
    let i = 0
    Array.from(document.getElementsByClassName('sliderize')).forEach(g => {
        new Slider(g, arguments[i].pictures, arguments[i].startingSize)
        i++
    })
}