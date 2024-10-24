import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider'
import EditModal from './EditModal'; // Import the EditModal component

function Cards({ item, onDelete, onSaveEdit }) {
  const [authUser] = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedItem, setUpdatedItem] = useState({ ...item });

  console.log('Item:', item);
  console.log('Download URL:', item.downloadUrl);

  const handleImageClick = () => {
    if (item.downloadUrl) {
      const link = document.createElement('a');
      link.href = item.downloadUrl;
      link.download = item.name || 'default-filename';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.log('No download URL provided');
    }
  };
  

  const handleDeleteClick = async () => {
    console.log(`Attempting to delete book with ID: ${item._id}`);
    try {
      const response = await axios.delete(`http://localhost:8000/book/${item._id}`);
      if (response.status === 200) {
        console.log('Delete successful');
        onDelete(item._id);
      } else {
        console.error('Failed to delete the book', response.status, response.data);
      }
    } catch (error) {
      console.error('Error during deletion:', error);
    }
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedItem((prevItem) => ({ ...prevItem, [name]: value }));
  };
  
  const handleSaveEdit = async () => {
    try {
      const token = authUser.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(`http://localhost:8000/book/${item._id}`, updatedItem, config);
      onSaveEdit(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };
  

  return (
    <div className='mt-4 my-3 p-3'>
      <div className="card bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
        <figure className="w-full h-60">
          <img
            src={item.image}
            alt={item.name}
            onClick={handleImageClick}
            className="w-full h-full object-cover cursor-pointer"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-secondary">{item.category}</div>
          </h2>
          <div className="flex justify-between items-center">
            <p className="flex-grow">{item.title}</p>
            {authUser && authUser.role === 'admin' ? (
              <button
                className='btn btn-primary bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full shadow-md ml-4'
                onClick={handleEditClick}
              >
                Edit
              </button>
            ) : (
              <button
                className='btn btn-primary bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-full shadow-md ml-4'
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      <EditModal
        isOpen={isModalOpen}
        item={updatedItem}
        onClose={() => setIsModalOpen(false)}
        onSaveEdit={handleSaveEdit}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}

export default Cards;
