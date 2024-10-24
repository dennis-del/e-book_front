import React, { useState } from 'react';

function AddBookModal({ isOpen, onClose, onAddBook }) {
    const [newBook, setNewBook] = useState({
        name: '',
        title: '',
        category: '',
        image: '',
        downloadUrl: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
    };

    const handleAddBook = () => {
        onAddBook(newBook);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md w-96 dark:text-black">
                <h2 className="text-xl mb-4">Add New Book</h2>
                <input
                    type="text"
                    name="name"
                    value={newBook.name}
                    onChange={handleInputChange}
                    className="input input-bordered w-full mb-2"
                    placeholder="Book Name"
                />
                <input
                    type="text"
                    name="title"
                    value={newBook.title}
                    onChange={handleInputChange}
                    className="input input-bordered w-full mb-2"
                    placeholder="Book Title"
                />
                <input
                    type="text"
                    name="category"
                    value={newBook.category}
                    onChange={handleInputChange}
                    className="input input-bordered w-full mb-2"
                    placeholder="Category"
                />
                <input
                    type="text"
                    name="image"
                    value={newBook.image}
                    onChange={handleInputChange}
                    className="input input-bordered w-full mb-2"
                    placeholder="Image URL"
                />
                <input
                    type="text"
                    name="downloadUrl"
                    value={newBook.downloadUrl}
                    onChange={handleInputChange}
                    className="input input-bordered w-full mb-4"
                    placeholder="Download URL"
                />
                <div className="flex justify-end">
                    <button
                        className="btn btn-primary mr-2"
                        onClick={handleAddBook}
                    >
                        Add
                    </button>
                    <button className="btn btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddBookModal;
