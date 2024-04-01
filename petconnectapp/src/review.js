import React, { useState, useEffect } from 'react';

const ViewReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [overall_rating, setrating] = useState(0.00)
    
    useEffect(() => {
        const fetchReviews = async () => {
            const userObjectString = localStorage.getItem('userObject');
            if (userObjectString) {
                const userObject = JSON.parse(userObjectString);
                const userid = userObject.user.id;
                
                try {
                    const response = await fetch(`http://localhost:5000/review/${userid}`, {
                        method: 'GET', 
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data)
                        setReviews(data);
                    } else {
                        const errorData = await response.json();
                        console.error("Failed to fetch Reviews:", errorData.message);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };
        
        fetchReviews();
    }, []); 
    if(reviews.length >0){
        return(
            <div>
                <ul>
                    {reviews.map((review) => (
                        <li key={review.id} id='review_'>
                            review author: {review.username} review rating:  {review.starRating} review: {review.reviewDetails}
                        </li>
                    ))}
                </ul>
            </div>
        )

    }


}

const Reviews = () =>{
    return(
        <div id='reviews'>
            <ViewReviews />
        </div>
    )
}
export default Reviews;