import { Image } from 'antd'
import React from 'react'
import { WrapperSliderStyle } from './style';
// import Slider from 'react-slick'

const SliderComponent = ({ arrImages }) => {
    const settings = {
        dots: true,
        infinite: true, // true => run to 'end slider' will move 'start slide' and start loop; false => run to 'end slide' then stop
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // slider auto run
        autoplaySpeed: 1000 // speed of slider: unit is milliseconds and it's equivalent to 1 second
    };
    return (
        <WrapperSliderStyle {...settings}>
            {arrImages.map((image) => {
                return (
                    <Image src={image} alt="slider" preview={false} width="100%" height="350px"/>
                )
            })}
        </WrapperSliderStyle>
    )
}

export default SliderComponent
