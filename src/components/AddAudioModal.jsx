import React, { useState } from 'react';

function AddAudioModal({ isOpen, onClose, onAddAudio }) {
    const [newAudio, setNewAudio] = useState({
        name: '',
        image: '',
        videoId: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewAudio(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSave = () => {
        onAddAudio(newAudio);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md w-96 dark:text-black">
                <h2 className="text-xl mb-4">Add New Audio</h2>
                <input
                    type="text"
                    name="name"
                    value={newAudio.name}
                    onChange={handleInputChange}
                    className="input input-bordered w-full mb-2"
                    placeholder="Audio Name"
                />
                <input
                    type="text"
                    name="image"
                    value={newAudio.image}
                    onChange={handleInputChange}
                    className="input input-bordered w-full mb-2"
                    placeholder="Image URL"
                />
                <input
                    type="text"
                    name="videoId"
                    value={newAudio.videoId}
                    onChange={handleInputChange}
                    className="input input-bordered w-full mb-4"
                    placeholder="YouTube Video ID"
                />
                <div className="flex justify-end">
                    <button
                        className="btn btn-primary mr-2"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddAudioModal;
