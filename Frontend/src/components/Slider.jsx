import { useState, useEffect } from "react";

const Slider = () => {
    // List of image URLs
    const images = [
        "https://www.igp.com/blog/wp-content/uploads/2022/11/good-morning-pic.jpg",
        "https://media.istockphoto.com/id/1249041775/photo/photo-depicting-the-person-who-focuses-on-the-target.jpg?s=612x612&w=0&k=20&c=8gu2chWSKen1mRvABWhS4NvI9437yaymHXPOmzM8QyA=",
        "https://thumbs.dreamstime.com/b/man-climbing-rocky-mountain-silhouette-103330199.jpg",
        "https://thumbs.dreamstime.com/b/happiness-three-cronies-reach-goal-triumph-people-who-have-reached-challenging-peak-succeeded-166464196.jpg",
    ];

    // State for the current image index
    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to go to the next image
    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Function to go to the previous image
    const prevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    // Automatically change image every 3 seconds
    useEffect(() => {
        const interval = setInterval(nextImage, 3000);
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <div className="relative w-full max-w-screen-lg mx-auto overflow-hidden">
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                        <img
                            src={image}
                            alt={`Slide ${index}`}
                            className="w-full h-64 object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Prev button */}
            <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-75 hover:opacity-100"
                onClick={prevImage}
            >
                &#10094;
            </button>

            {/* Next button */}
            <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-75 hover:opacity-100"
                onClick={nextImage}
            >
                &#10095;
            </button>
        </div>
    );
};

export default Slider;
