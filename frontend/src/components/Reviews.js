import React from "react";
import { Card, ListGroup, Badge, Navbar } from 'react-bootstrap';
import '../styles/productDetailPage.css';
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";


function Reviews({reviews}){
    return (
      // <Card style={{marginRight:"30px", mar}}>
        //<Card.Body style={{alignSelf:"center"}}>
        <>
        
          <Card.Title id="reviewHeading" className=" text-2xl font-bold lg:pt-0">Product Reviews</Card.Title>
          <ListGroup style={{textAlign:'left', margin:"20px 40px"}}>
            {reviews?.map((review, index) => (
              <ListGroup.Item key={index}>
                <div>
                <Rater
              style={{ fontSize: "18px" }}
              total={5}
              interactive={false}
              rating={review.ratingNumber}
            />
                </div>
                  <strong>{review.author? review.author:"Verified Customer"}</strong>

                <p>{review.review}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>

       // </Card.Body>
      // </Card>
    );
  };
  
  export default Reviews;