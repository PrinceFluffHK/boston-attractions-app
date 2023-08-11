import React from "react";

const RatingOptions = ({ setNewReview, newReview }) => {
    const ratings = [1, 2, 3, 4, 5];

    const handleInputChange = (event) => {
        setNewReview({
            ...newReview,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const ratingOptions = ratings.map((rating) => {
        return (
            <label key={rating} htmlFor={`rating-${rating}`} className="rating-options container__col-md-1">
                <input
                    className="radio-button"
                    id={`rating-${rating}`}
                    type="radio"
                    name="rating"
                    value={rating}
                    onChange={handleInputChange}
                />
                {rating}
            </label>
        );
    });
    return(
        <div className="container__row">
            {ratingOptions}
        </div>
    ) 
};

export default RatingOptions;
