import React, { useEffect, useState } from 'react';
import Audiocards from './Audiocards';
import axios from 'axios';
import AddAudioModal from './AddAudioModal'; // Import the new modal component

function AudioBooks() {
    const [audio, setAudio] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const getAudio = async () => {
            try {
                const res = await axios.get('http://localhost:8000/audio');
                console.log(res.data);
                setAudio(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getAudio();
    }, []);

    const handleDelete = (id) => {
        setAudio(audio.filter(item => item._id !== id));
    };

    const handleAddAudio = async (newAudio) => {
        try {
            const response = await axios.post('http://localhost:8000/audio', newAudio);
            setAudio([...audio, response.data]);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Failed to add audio:', error);
        }
    };

    return (
        <>
            <div className='max-w-screen-2xl container mx-auto md:px-20 px-4'>
                <button
                    className='mt-40 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300'
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Audio
                </button>
                <div className='mt-10 grid grid-cols-1 md:grid-cols-3'>
                    {audio.map((item) => (
                        <Audiocards key={item._id} item={item} onDelete={handleDelete} />
                    ))}
                </div>
            </div>

            <AddAudioModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddAudio={handleAddAudio}
            />
        </>
    );
}

export default AudioBooks;
