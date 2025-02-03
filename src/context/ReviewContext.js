import React, { createContext, useState, useContext, useEffect } from "react";

const ReviewContext = createContext();

export const useReviews = () => {
  return useContext(ReviewContext);
};

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    setReviews(storedReviews);
  }, []);

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

 
  const addReview = (movieId, name, rating, text) => {
    const newReview = { movieId, name, rating, text, id: Date.now() };
    setReviews([...reviews, newReview]);
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview }}>
      {children}
    </ReviewContext.Provider>
  );
};
