import React, { useEffect, useState } from 'react';
import ApiService from '../service/ApiService';
import { useNavigate, useParams } from 'react-router-dom';

function AddFeedBack() {
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
    new ApiService().getFeedBack(pizzaId).then((res) => {
      setFeedBacks(res.data);
    }).catch(error => {
      console.error("Error fetching feedback:", error);
    });
  }, [pizzaId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    
      new ApiService().addFeedBack(formData).then((res) => {
        setFormData(res.data);
        setFeed(prevFeed => ({ ...prevFeed, ...res.data }));
        alert("Feedback Added");
        navigate("/menu");
      }).catch(error => {
        console.error("Error adding feedback:", error);
      });
    
  };

  

  return (<div>
    <div className="login-box2">
      <h2>FEEDBACK</h2>&ensp;
      <div className="body2"></div>
      <form>
        <label class="rating-label">Ratings</label>
&nbsp;
<div class="rating">
<input class="form-check-input" type="radio" name="rating" id="inlineRadio1" value="1" onChange={handleChange}></input>
<label class="form-check-label" for="inlineRadio1">1</label>
</div>
<div class="rating">
<input class="form-check-input" type="radio" name="rating" id="inlineRadio2" value="2"onChange={handleChange}></input>
<label class="form-check-label" for="inlineRadio2">2</label>
</div>
<div class="rating">
<input class="form-check-input" type="radio" name="rating" id="inlineRadio3" value="3" onChange={handleChange}></input>
<label class="form-check-label" for="inlineRadio3">3</label>
</div>
<div class="rating">
<input class="form-check-input" type="radio" name="rating" id="inlineRadio3" value="4" onChange={handleChange}></input>
<label class="form-check-label" for="inlineRadio3">4</label>
</div>
<div class="rating">
<input class="form-check-input" type="radio" name="rating" id="inlineRadio3" value="5" onChange={handleChange}></input>
<label class="form-check-label" for="inlineRadio3">5</label>
</div>
        <br/><br/>&ensp;
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Feedback</label>
          <textarea className="form-control" id="feedback" rows="3" name="feedback" value={formData.feedback} onChange={handleChange} required></textarea>
        </div>
        &ensp;
        <button onClick={handleSubmit}>
          <span></span>
          SUBMIT
          
        </button>
      </form>
      
    </div>
  </div>
    // <div className="feedback-form-container">
    //   <h2>Doctor Feedback</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div className="form-group">
    //       <label htmlFor="feedback">Feedback:</label>
    //       <textarea
    //         id="feedback"
    //         name="feedback"
    //         value={formData.feedback}
    //         onChange={handleChange}
    //         required />
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="rating">Rating:</label>
    //       <input
    //         type="number"
    //         id="rating"
    //         name="rating"
    //         min="1"
    //         max="5"
    //         value={formData.rating}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>
    //     <button type="submit" className="submit-button">Submit</button>
    //   </form>
    //   <div>
    //     {feedbacks.map((f, index) => (
    //       <div className="card" key={index}>
    //         <ul className="list-group list-group-flush">
    //           <i className="bi bi-trash" onClick={() => deleteFeedBack(f.feedbackId)}></i>
    //           <li className="list-group-item">{f.patient.patientName}</li>
    //           <li className="list-group-item">{f.feedback}</li>
    //           <li className="list-group-item">{f.rating}</li>
    //         </ul>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
}

export default AddFeedBack;

