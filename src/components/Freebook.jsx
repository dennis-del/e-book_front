import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from './Cards';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';

function Freebook() {
  const [book, setBook] = useState([]);
  const [authUser] = useAuth();

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:8000/book");
        const data = res.data.filter((data) => data.category === "Free");
        setBook(data);
      } catch (error) {
        console.log(error);
      }
    }
    getBook();
  }, []);

  const handleDelete = (id) => {
    setBook((prevBooks) => prevBooks.filter((item) => item._id !== id));
  };

  const handleSaveEdit = (updatedItem) => {
    setBook((prevBooks) => prevBooks.map((item) => item._id === updatedItem._id ? updatedItem : item));
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className='max-w-screen-2xl container mx-auto md:px-20 px-4'>
      <div>
        <h1 className='font-semibold text-xl pb-2'>Free Offered Books</h1>
        <p>Free reading books refer to books that are available at no cost to the reader...</p>
      </div>

      <div>
        <Slider {...settings}>
          {book.map((item) => (
            <Cards
              item={item}
              key={item._id}
              onDelete={handleDelete}
              onSaveEdit={handleSaveEdit}
            />
          ))}
        </Slider>
      </div>

    </div>
  );
}

export default Freebook;