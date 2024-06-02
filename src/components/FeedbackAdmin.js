import React, { useEffect, useState } from 'react';
import ApiService from '../service/ApiService';
import { useNavigate, useParams } from 'react-router-dom';

function FeedBack() {
    let { pizzaId } = useParams();
  const [feedbacks, setFeedBacks] = useState([]);
  const [feed, setFeed] = useState({});
  const [formData, setFormData] = useState({
    feedback: '',
    rating: 0,
    pizzaId: pizzaId
  });
  let navigate = useNavigate();

  useEffect(() => {
    new ApiService().getAllFeedback().then((res) => {
      setFeedBacks(res.data);
    }).catch(error => {
      console.error("Error fetching feedback:", error);
    });
  }, [pizzaId]);
  let deleteFeedBack = (id) => {
    new ApiService().deleteFeedback(id).then((res) => {
      setFeedBacks(prevFeedbacks => prevFeedbacks.filter(f => f.feedbackId !== id));
    }).catch(error => {
      console.error("Error deleting feedback:", error);
    });
  };
    return <div>
        {/* {feedbacks.map((f, index) => (
        <div class="container mt-5 mb-5">
    <div class="d-flex justify-content-between mb-3">
    </div>
    <div class="row g-2">
        <div class="col-md-6">
            <div class="card1 p-2 py-3 text-center">
                <div class="img mb-2">
                    <img src="https://cdn-icons-png.flaticon.com/512/8906/8906203.png" width="100" class="rounded-circle"/>   
                </div>
                <h5 class="mb-0">{f.customer.customerFirstName}</h5><br></br>
                <small>{f.feedback}</small><br></br>
                <small>{f.rating}</small>
               
            </div>
        </div>
        </div>
        </div>))} */}
        
          {feedbacks.map((f, index) => (
          <div>
          <ul>
          <i className="bi bi-trash" onClick={() => deleteFeedBack(f.feedbackId)}></i>
          <li class="list-group-item">Pizza Name : {f.pizza.pizzaName}</li>
          <li class="list-group-item">Customer Name : {f.customer.customerFirstName}</li>
          <li class="list-group-item">Mobile Number : {f.customer.mobileNumber}</li>  
              <li class="list-group-item">Feedback : {f.feedback}</li>
              <li class="list-group-item">Rating : {f.rating}</li>
             
          </ul>
          </div>
          
        ))} 
      </div>





}

export default FeedBack;
