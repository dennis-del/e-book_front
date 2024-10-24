import React, { useState } from 'react';

function Audiocards({ item, onDelete }) {
    const [isPlaying, setIsPlaying] = useState(false);

    const handleListenClick = () => {
        setIsPlaying(true);
    };

    const handleCloseClick = () => {
        setIsPlaying(false);
    };

    const handleDeleteClick = async () => {
        try {
            await fetch(`http://localhost:8000/audio/${item._id}`, {
                method: 'DELETE',
            });
            onDelete(item._id); // Notify parent component to remove the card
        } catch (error) {
            console.error('Failed to delete the audio:', error);
        }
    };

    return (
        <div className="mt-10 my-3 p-4">
            <div className="card lg:card-side bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:shadow-2xl hover:scale-105">
                <figure className="relative w-full lg:w-1/2">
                    {isPlaying ? (
                        <div className="relative">
                            <iframe
                                width="100%"
                                height="315"
                                src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="rounded-t-lg"
                            ></iframe>
                            <button
                                className="absolute top-2 right-2 p-2 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-900"
                                onClick={handleCloseClick}
                            >
                                &times;
                            </button>
                        </div>
                    ) : (
                        <img
                            src={item.image}
                            alt="Album"
                            className="w-full h-64 object-cover rounded-t-lg"
                        />
                    )}
                </figure>
                <div className="card-body p-6 bg-gray-50 text-gray-800 rounded-b-lg">
                    <h2 className="card-title text-xl font-semibold mb-3">{item.name}</h2>
                    <div className="card-actions flex justify-center">
                        <button
                            className="btn btn-primary bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-full shadow-md"
                            onClick={handleListenClick}
                        >
                            Listen
                        </button>
                        <button
                            className="btn btn-primary bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-full shadow-md ml-2"
                            onClick={handleDeleteClick}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Audiocards;
