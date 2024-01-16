import React from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./Card.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';

function Card(props) {
    const CustomPrevArrow = (props) => (
        <button {...props} className="slick-prev">
          {"<"}
        </button>
      );
    
      const CustomNextArrow = (props) => (
        <button {...props} className="slick-next">
          {">"}
        </button>
      );
    
      const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
      };
    return (
        <div>
            <div className='cards max-w-screen-xl mx-auto px-4 md:bg-blue-100'>
                <Slider {...sliderSettings}>
                    {data.map((d) => (
                        <div key={d.id} className="mt-2 flex border bg-white border-white rounded overflow-hidden">
                            <div className="mt-2 flex space-x-5 md:w-310px">
                                <div className="flex-shrink-0 items-center">
                                    <img className="w-16 h-16 object-cover mx-auto" src={d.image} alt="" />
                                </div>
                                <div className="flex-grow p-4">
                                    <p className="font-bold">{d.name}</p>
                                    <p>{d.description}</p>
                                   
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
                <div className="flex justify-start ml-2 font-bold text-30px pb-5">
                    Top 100 Cryptocurrencies by Market Cap
                </div>


                <div className="flex justify-between pb-3">
                    <div className="flex space-x-2 ml-2 hidden md:block">
                        <button className="border border-gray-200 bg-gray rounded-xl px-2 py-2">
                            <FontAwesomeIcon
                                icon={faStar}
                                style={{
                                    fontSize: '20px',
                                    padding: '0 2px',
                                    color: '#ccc',
                                }}
                            />Favourites</button>
                        <button className="border border-gray-200 rounded-xl px-4 py-2">CryptoCurrencies</button>
                        <button className="border border-gray-200 rounded-xl px-4 py-2">DeFi</button>
                        <button className="border border-gray-200 rounded-xl px-4 py-2">NFTs & Collectibles</button>
                    </div>
                    <div className="mr-2 hidden md:block">
                        <button className="border border-gray-200 rounded-xl px-4 py-2">show rows
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
}


const data = [
    {
        name: "Take a quiz!",
        image: "image.png",
        description: "Learn and earn $CKB",
       
    },
    {
        name: "Portfolio 🔥",
        image: "image1.png",
        description: "Track your trades in one place",
        
    },
    {
        name: "Portfolio",
        image: "image2.png",
        description: "Track your trades in one place",
       
    },
]
export default Card;
