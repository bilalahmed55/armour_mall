import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ProductDetail = () => {
  const location = useLocation();
  const product = location.state?.product; // Safely access product

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  const handleReviewChange = (e) => {
    setNewReview(e.target.value);
  };
  
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview) {
      setReviews([...reviews, newReview]);
      setNewReview("");
    }
  };

  if (!product) {
    return <p className="text-center text-gray-700 dark:text-gray-300">Product not found.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 mt-20">
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0">
        {/* Left Column: Product Details and Review Form */}
        <div className="w-full md:w-2/3 space-y-4">
          {/* Product Details */}
          <div className="space-y-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg"
            />
            <h2 className="text-3xl font-semibold">{product.title}</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">{product.description}</p>
            <div className="flex items-center space-x-4">
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                {`$${product.price}`}
              </span>
              <span className="text-lg font-semibold text-yellow-500">
                ⭐⭐⭐⭐⭐ {/* Placeholder for dynamic rating */}
              </span>
            </div>
          </div>

          {/* Review Form */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-white">Add a Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <textarea
                value={newReview}
                onChange={handleReviewChange}
                className="w-full p-4 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Write a review..."
                rows="4"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Reviews List */}
        <div className="w-full md:w-1/3 space-y-4 ml-5">
          <h3 className="text-2xl font-semibold text-white">Product Reviews</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto p-4 border border-gray-200 rounded-lg dark:border-gray-600">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg dark:border-gray-600">
                  <p className="text-gray-700 dark:text-gray-300">{review}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-700 dark:text-gray-300">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
