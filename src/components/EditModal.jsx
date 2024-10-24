import React from 'react';

function EditModal({ isOpen, item, onClose, onSaveEdit, handleInputChange }) {
  if (!isOpen) return null;

  // Ensure item fields are never undefined
  const safeItem = {
    name: item.name || '',
    title: item.title || '',
    category: item.category || '',
    image: item.image || '',
    downloadUrl: item.downloadUrl || ''
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 edit-modal-overlay">
      <div className="bg-white p-6 rounded-md w-96 edit-modal-content">
        <h2 className="text-xl mb-4">Edit Book</h2>
        <input
          type="text"
          name="name"
          value={safeItem.name}
          onChange={handleInputChange}
          className="input input-bordered w-full mb-2"
          placeholder="Book Name"
        />
        <input
          type="text"
          name="title"
          value={safeItem.title}
          onChange={handleInputChange}
          className="input input-bordered w-full mb-2"
          placeholder="Book Title"
        />
        <input
          type="text"
          name="category"
          value={safeItem.category}
          onChange={handleInputChange}
          className="input input-bordered w-full mb-2"
          placeholder="Category"
        />
        <input
          type="text"
          name="image"
          value={safeItem.image}
          onChange={handleInputChange}
          className="input input-bordered w-full mb-2"
          placeholder="Image URL"
        />
        <input
          type="text"
          name="downloadUrl"
          value={safeItem.downloadUrl}
          onChange={handleInputChange}
          className="input input-bordered w-full mb-4"
          placeholder="Download URL"
        />
        <div className="flex justify-end">
          <button
            className="btn btn-primary mr-2"
            onClick={() => onSaveEdit(safeItem)}
          >
            Save
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
