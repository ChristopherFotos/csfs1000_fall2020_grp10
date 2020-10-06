class Slider {
    constructor(container, pictures){
        this.container = container
        this.pictures  = pictures
        this.thumbs    = []
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

    slide(){  
        this.photoContainer.dataset.left -= 10
        this.photoContainer.style.left = this.photoContainer.dataset.left + 'px'
        this.animationOffset += 10
        let stop = requestAnimationFrame(this.slide.bind(this))
        if(this.animationOffset > 150){
            cancelAnimationFrame(stop) 
            this.animationOffset = 0
            this.photoContainer.style.left = '0px'
            this.photoContainer.dataset.left = 0
        } 
    }

    addAndRemove(){
        slider.thumbs.splice(0,1)
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

        newPic.dataset.left = 0

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