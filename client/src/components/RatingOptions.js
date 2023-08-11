import React from "react";
const RatingOptions = ({ handleInputChange }) => {
    const ratings = [1, 2, 3, 4, 5]
    const ratingOptions = ratings.map((rating) => {
        return (
            <>
                <label htmlFor={`rating-${rating}`} className="rating-options">
                    <input
                        className="radio-button"
                        key={rating.id}
                        id={`rating-${rating}`}
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={parseInt(rating) === rating}
                        onChange={handleInputChange}
                    />
                    {rating}
                </label>
            </>
        )
    })
    return (
        <>
            {ratingOptions}
        </>
    )
}


export default RatingOptions