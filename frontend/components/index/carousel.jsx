import React from 'react';

export default class Carousel extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.state ={
            button1: "active",
            button2: "",
            slide1: "active-slide",
            slide2: ""
        }
    }

    componentDidMount(){
        this.button1 = document.getElementsByClassName("slide-1-button")[0]
        this.button2 = document.getElementsByClassName("slide-2-button")[0]
        this.slide1 = document.getElementById("slide-1")
        this.slide2 = document.getElementById("slide-2")
        this.slideInterval1 = null;
        this.slideInterval2 = null;

        this.randomInterval = setInterval(()=>{
            if (this.state.button1 === "active"){
                this.button2.click()
            }else{
                this.button1.click()
            }
        }, 4000)
    }
    componentWillUnmount(){
        clearInterval(this.randomInterval)
    }



    handleClick(e) {
        let that = this
        if(!this.slideInterval2 && !this.slideInterval1){
            if (e.currentTarget === this.button1) {
                if (this.state.slide1 !== "active-slide") {
                    let counter1 = 0
                    this.slideInterval1 = setInterval(() => {
                        if (counter1 < 1240) {
                            counter1 += 10;
                            that.slide2.style.left = `${counter1}px`;
                        } else {
                            clearInterval(this.slideInterval1)
                            this.slideInterval1 = null;
                        }
                    }, 5)
                    let counter2 = 1240

                    this.slideInterval2 = setInterval(() => {
                        if (counter2 > 0) {
                            counter2 -= 10;
                            that.slide1.style.left = `-${counter2}px`;
                        } else {
                            clearInterval(this.slideInterval2)
                            this.slideInterval2 = null;
                        }
                    }, 5)

                    this.setState({
                        button1: "active",
                        button2: "",
                        slide1: "active-slide",
                        slide2: ""
                    })

                }

            } else {
                if (this.state.slide2 !== "active-slide") {
                    let counter1 = 0
                    this.slideInterval1 = setInterval(() => {
                        if (counter1 < 1240) {
                            counter1 += 10;
                            that.slide1.style.left = `-${counter1}px`;

                        } else {
                            clearInterval(this.slideInterval1)
                            this.slideInterval1 = null;
                        }
                    }, 5)
                    let counter2 = 1240

                    this.slideInterval2 = setInterval(() => {
                        if (counter2 > 0) {
                            counter2 -= 10;
                            that.slide2.style.left = `${counter2}px`;

                        } else {
                            clearInterval(this.slideInterval2)
                            this.slideInterval2 = null;
                        }
                    }, 5)


                    this.setState({
                        button1: "",
                        button2: "active",
                        slide1: "",
                        slide2: "active-slide"
                    })

                }
            }
        }
        
    }
    render() {
        return (
            <div className="index-carousel">

                <div className="carousel-buttons">
                    <div onClick={this.handleClick} className={`slide-1-button carousel-button ${this.state.button1}`}></div>
                    <div onClick={this.handleClick} className={`slide-2-button carousel-button ${this.state.button2}`}></div>
                </div>


                <div className="carousel">
                    <div id="slide-1" className={`carousel-item ${this.state.slide1}`}>
                        <img src={window.party1} className="carousel-images" alt="party1" />
                        <div className="carousel-text">
                            <h3>The music you love and enjoy</h3>
                            <p>Listen to the best songs from around the globe!
                                        <br />Upload your own and share with friends!
                                        <br />Just chill and feel the vibe.
                                    </p>
                            <button className="carousel-text-button">Start listening</button>
                        </div>
                    </div>

                    <div id="slide-2" className={`carousel-item ${this.state.slide2}`}>
                        <img src={window.party2} className="carousel-images" alt="party2" />
                        <div className="carousel-text git">
                            <h3>This project is the clone of SoundCloud</h3>
                            <p>My name is <span className="name">Dias Iskrayev</span>.
                                        <br />I am a creator of this fun little project.
                                        <br />Link to GitHub repo for this project is down below!
                                    </p>
                            <button className="carousel-text-button"><a href="https://github.com/iskraev/WaveSky"
                                className="github">GitHub</a></button>
                        </div>
                    </div>
                </div>





            </div>
        )
    }
}



