import React, { useState, useEffect } from 'react';
import './Home.css';
import CardItem from '../../components/CardItem';

const Home = () => {
    const [visibleItems, setVisibleItems] = useState(3);
    const [isExpanded, setIsExpanded] = useState(false);
    const [cardItems, setCardItems] = useState([]);
    const [loading, setLoading] = useState(true);  

  
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/iphones');
                const data = await response.json();
                setCardItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchItems();
    }, []);

    const handleToggleView = () => {
        setVisibleItems(isExpanded ? 3 : cardItems.length);
        setIsExpanded(!isExpanded);
    };

    if (loading) {
        return <div>Loading...</div>;  
    }

    return (
        <div className='home-container'>
            <div className='top-row'>
                <div className='image-container'>
                    <img src='http://localhost:5000/static/Icons/ShopImage.jpg' alt='Shop' className='shop-image' />
                </div>
                <div className='text-container'>
                    <h2>Welcome to our Iphone Shop!</h2>
                    <p>Immerse yourself in the world of Apple technology and choose your own unique gadget!...</p>
                </div>
            </div>
            <div className='cards-container'>
                {cardItems.slice(0, visibleItems).map(item => (
                    <CardItem
                        key={item.id}
                        title={item.title}
                        description={item.description}
                        price={item.price}
                        imageSrc={item.imageSrc}
                        iphoneID={item.id}
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
