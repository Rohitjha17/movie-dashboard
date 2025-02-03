import React, { useState } from "react";

const ReviewForm = ({ movieId, movieTitle}) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(""); 
    setSuccessMessage(""); 

    const newReview = {
      id: Date.now(),
      movieId,
      movieTitle,
      reviewerName: name,
      rating: Number(rating),
      reviewText: text,
      date: new Date().toISOString(),
    };

    try {
      const existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];
      const updatedReviews = [...existingReviews, newReview];
      localStorage.setItem("reviews", JSON.stringify(updatedReviews));

      setSuccessMessage("Review submitted successfully!"); // displaying success message

                  // Reset form fields
      setName("");
      setRating(5);
      setText("");
      
      setIsSubmitting(false); 
    } catch (error) {
      setErrorMessage("Error submitting review. Please try again.");
      console.error("Submission error:", error);
      setIsSubmitting(false); 
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md"
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Write a Review for {movieTitle}
      </h3>

      {errorMessage && (
        <p className="mb-4 text-red-500 font-semibold">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="mb-4 text-green-500 font-semibold">{successMessage}</p>
      )}

      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 dark:bg-gray-800 dark:text-white"
        required
      />

      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 dark:bg-gray-800 dark:text-white"
        disabled={isSubmitting}
      >
        {[5, 4, 3, 2, 1].map((star) => (
          <option key={star} value={star}>
            {star} Star{star !== 1 ? "s" : ""}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Write your review..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 dark:bg-gray-800 dark:text-white"
        rows="4"
        required
        disabled={isSubmitting}
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
