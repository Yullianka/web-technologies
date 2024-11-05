import React, { useState } from 'react';
import './Home.css';
import CardItem from '../../components/CardItem';
import ShopImg from '../../Icons/ShopImage.jpg';
import iphone15pro from '../../Icons/15pro.jpg';
import iphone14promax from '../../Icons/14promax.jpg';
import iphone16promax from '../../Icons/16promax.jpg';
import iphone14 from '../../Icons/14.jpg';
import iphone14pro from '../../Icons/14pro.jpg';
import iphone15promax from '../../Icons/15promax.jpg';

const Home = () => {
    const cardItems = [
        { title: 'Iphone 15 pro', description: 'The iPhone 15 Pro features a titanium frame, A17 Pro chip, 6.1-inch Super Retina XDR display, and an advanced triple-camera system with 5x optical zoom. It also includes a customizable Action button and USB-C charging for enhanced performance and convenience.The device supports up to 4K video recording and offers long battery life.', price: '995', imageSrc: iphone15pro },
        { title: 'Iphone 14 pro max', description: 'The iPhone 14 Pro Max features a 6.7-inch Super Retina XDR display, the A16 Bionic chip, and a 48MP main camera. It introduced the Dynamic Island, an interactive area replacing the notch, and has an always-on display. The device supports up to 4K video recording and offers long battery life, with up to 29 hours of video playback.', price: '850', imageSrc: iphone14promax },
        { title: 'Iphone 16 pro max', description: 'The iPhone 16 Pro Max is rumored to feature a larger 6.9-inch display, enhanced A18 chip for better performance, and a more advanced camera system with up to 6x optical zoom. The design will likely continue the trend of premium materials, like titanium, and may include further advancements in display and battery technology.', price: '1799', imageSrc: iphone16promax },
        { title: 'Iphone 14', description: 'The iPhone 14 is rumored to feature a larger 6.9-inch display, enhanced A18 chip for better performance, and a more advanced camera system with up to 6x optical zoom. The design will likely continue the trend of premium materials, like titanium, and may include further advancements in display and battery technology.', price: 759, imageSrc: iphone14 },
        { title: 'Iphone 14 pro ', description: 'The iPhone 14 Pro is rumored to feature a larger 6.9-inch display, enhanced A18 chip for better performance, and a more advanced camera system with up to 6x optical zoom. The design will likely continue the trend of premium materials, like titanium, and may include further advancements in display and battery technology.', price: 899, imageSrc: iphone14pro },
        { title: 'Iphone 15 pro max', description: 'The iPhone 15 Pro Max is rumored to feature a larger 6.9-inch display, enhanced A18 chip for better performance, and a more advanced camera system with up to 6x optical zoom. The design will likely continue the trend of premium materials, like titanium, and may include further advancements in display and battery technology.', price: 1299, imageSrc: iphone15promax },
    ];

    const [visibleItems, setVisibleItems] = useState(3);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleView = () => {
        if (isExpanded) {
            setVisibleItems(3);
        } else {
            setVisibleItems(cardItems.length);
        }
        setIsExpanded(!isExpanded);
    };

    return (
        <div className='home-container'>
            <div className='top-row'>
                <div className='image-container'>
                    <img src={ShopImg} alt='Shop' className='shop-image'/>
                </div>
                <div className='text-container'>
                    <h2>Welcome to our Iphone Shop!</h2>
                    <p>Immerse yourself in the world of Apple technology and choose your own unique gadget! We choose
                        a personal approach to each client and guarantee the quality of our products. With us, you will not
                        only buy a phone but also learn the history of the creation of apple phones from the very first. Our 
                        interior will surely surprise you, and our consultants will treat you to real
                        Lviv coffee and goodies. Bring a friend and get a personalized discount. See you in the bitten apple.
                    </p>
                </div>
            </div>
            <div className='cards-container'>
                {cardItems.slice(0, visibleItems).map((item, index) => (
                    <CardItem
                        key={index}
                        title={item.title}
                        description={item.description}
                        price={item.price}
                        imageSrc={item.imageSrc} 
                    />
                ))}
            </div>
            <button onClick={handleToggleView} className="view-more-button">
                {isExpanded ? 'Show Less' : 'View More'}
            </button>
        </div>
    );
};

export default Home;
