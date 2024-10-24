import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import AddBookModal from './AddBookModal'; // Import the AddBookModal component

function LatestBooks() {
  const [book, setBook] = useState([]);
  const [authUser] = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:8000/book");
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getBook();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = authUser.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`http://localhost:8000/book/${id}`, config);
      setBook((prevBooks) => prevBooks.filter((book) => book._id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleAddBook = async (newBook) => {
    try {
      console.log('AuthUser:', authUser); // Debugging line
      if (!authUser) {
        console.log('AuthUser is null or undefined');
        throw new Error("User is not authenticated");
      }
      const token = authUser.token;
      console.log('Token:', token);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post('http://localhost:8000/book', newBook, config);
      setBook((prevBooks) => [...prevBooks, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding book:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookToEdit((prevBook) => ({ ...prevBook, [name]: value }));
    const updatedBookIndex = book.findIndex((book) => book._id === bookToEdit._id);
    if (updatedBookIndex !== -1) {
      const updatedBook = { ...book[updatedBookIndex], [name]: value };
      setBook((prevBooks) => [...prevBooks.slice(0, updatedBookIndex), updatedBook, ...prevBooks.slice(updatedBookIndex + 1)]);
    }
  };

  const handleEdit = (book) => {
    setBookToEdit(book);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async (updatedBook) => {
    try {
      const token = authUser.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(`http://localhost:8000/book/${updatedBook._id}`, updatedBook, config);
      
      // Update the card in place
      setBook((prevBooks) => 
        prevBooks.map((book) => 
          book._id === updatedBook._id ? response.data : book
        )
      );
  
      setIsModalOpen(false);
      setBookToEdit(null);
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };
  

  return (
    <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 flex-col md:flex-row my-10'>
      <div className='align-items-center justify-content-center text-center'>
        <h1 className='text-2xl md:text-4xl mt-20'>We're delighted to have you <span className='text-pink-500'>Here! :)</span></h1>
        <p className='mt-10'>I may have a to-read list as tall as a mountain and a bookshelf already overflowing with books...</p>
        <Link to='/'><button className='mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300'>Back</button></Link>
      </div>
      {authUser && authUser.role === 'admin' && (
        <button
          className='mt-6 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300'
          onClick={() => setIsModalOpen(true)}
        >
          Add Book
        </button>
      )}
      <div className='mt-10 grid grid-cols-1 md:grid-cols-4'>
        {book.map((item) => (
          <Cards
            key={item._id}
            item={item}
            onDelete={handleDelete}
            onEdit={authUser && authUser.role === 'admin' ? handleEdit : undefined}
            onSaveEdit={handleSaveEdit}
          />
        ))}
      </div>

      {isModalOpen && (
        bookToEdit ? (
          <EditModal
            isOpen={isModalOpen}
            item={bookToEdit}
            onClose={() => setIsModalOpen(false)}
            onSaveEdit={handleSaveEdit}
            handleInputChange={(e) => {
              handleInputChange(e);
              setBookToEdit((prevBook) => ({ ...prevBook, [e.target.name]: e.target.value }));
            }}
          />
        ) : (
          <AddBookModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddBook={handleAddBook}
          />
        )
      )}
    </div>
  );
}

export default LatestBooks;
