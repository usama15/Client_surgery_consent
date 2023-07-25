import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../images/img1.jpg'
import img2 from '../images/img2.jpg'
import img3 from '../images/img3.jpg'


const Wellcome = () => {
    const name = localStorage.getItem('bcousername');
console.log(name)
  return (
    <div className='well-home mt-5'>
        <Carousel>
            <Carousel.Item interval={1000}>
                <img
                className="slider-imgs d-block w-100"
                src={img1}
                alt="First slide"
                
                />
                <Carousel.Caption>
                <h1 style={{marginTop: '-6%'}}>Hi {name}, Well Come to Dr Import ant Surgeon</h1>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1000}>
                <img
                className="slider-imgs d-block w-100"
                src={img2}
                alt="Second slide"
                
                />
                <Carousel.Caption>
                <h1 style={{marginTop: '-6%'}}>Hi {name}, Well Come to Dr Import ant Surgeon</h1>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="slider-imgs d-block w-100"
                src={img3}
                alt="Third slide"
                
                />
                <Carousel.Caption>
                <h1 style={{marginTop: '-6%'}}>Hi {name}, Well Come to Dr Import ant Surgeon</h1>
                {/* <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                </p> */}
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        <h1 className='btm-text'>Design Surgery Procedure Agreement Document between Doctor and Patient.</h1>
    </div>
  )
}

export default Wellcome