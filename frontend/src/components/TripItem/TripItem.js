// Author: Rahul Saliya

import './TripItem.css';
import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const TripItem = ({ trip }) => {
    const item_title = trip.title;
    const item_location = trip.location.length > 50 ? trip.location.substring(0, 50) + "..." : trip.location;
    const item_description = trip.description.length > 100 ? trip.description.substring(0, 100) + "..." : trip.description;
    const item_cost = trip.cost;
    const item_rating = trip.rating;
    trip.id = trip._id ? trip._id : (trip.id ? trip.id : "123");

    const [wishlistIcon, setWishlistIcon] = useState(false);
    const navigate = useNavigate();

    // const [localStorageData, setLocaStorageData ] = useState()
    useEffect(() => {
        // Check if the trip ID is present in the localStorage
        const list = localStorage.getItem('id') ? JSON.parse(localStorage.getItem('id')) : [];
        setWishlistIcon(list.includes(trip.id));
    }, [trip.id]);

    const handleWishlist = (e) => {
        e.stopPropagation();
        const list = localStorage.getItem('id') ? JSON.parse(localStorage.getItem('id')) : [];
        if (!wishlistIcon) {
            list.push(trip.id);
        } else {
            if (list.findIndex !== -1) {
                list.splice(list.findIndex((x) => x === trip.id), 1);
            }
        }
        localStorage.setItem('id', JSON.stringify(list));
        setWishlistIcon(!wishlistIcon);
    }



    return (
        <Card className="trip-item" onClick={() => {
            navigate(`/package-details?trip=${trip.id}`);
        }}>
            <Card.Img className='trip-item__image' variant="top" src={trip.image} />
            <div onClick={handleWishlist} className="wishlist-container">
                {wishlistIcon ? (
                    <AiFillHeart className="heart-icon" />)
                    : (<AiOutlineHeart className="heart-icon" />)
                }
            </div>

            <Card.Body>
                <Card.Title className='trip-item__title'>{item_title}</Card.Title>
                <div className="trip-item__info-container">
                    <span className='trip-item__price'>{item_cost}$</span>
                    <span className='trip-item__rating'>{item_rating}/5.0</span>
                </div>
                <Card.Subtitle className="mb-2 text-muted">{item_location}</Card.Subtitle>
                <Card.Text>
                    {item_description}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default TripItem;