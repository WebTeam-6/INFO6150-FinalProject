import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import AdminNav from '../components/AdminNav';
import { Box, CssBaseline } from "@mui/material";
const drawerWidth = 240;

function AddProductPage(){
    const [product, setProduct] = useState({
        title: '',
        description: '',
        image: '',
        category: '',
        color: '',
        price: 0,
        owner: '',
        averageRating: 0,
        reviews: '',
      });

      const colors = ['Red', 'Green', 'Blue', 'Yellow', 'Other']; // List of available colors

    const createProductUrl = 'http://localhost:8000/product/create';
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            // If the input is a checkbox, handle multiple selected colors
            const updatedColors = checked
              ? [...product.color, value]
              : product.color.filter((color) => color !== value);
      
            setProduct({ ...product, [name]: updatedColors });
          } else {
            // For other input types, handle as usual
            setProduct({ ...product, [name]: value });
          }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(createProductUrl, product);
          console.log('Product added successfully:', response.data);
          alert("Product added successfully");
        } catch (error) {
          console.error('Error adding product:', error.message);
        }
      };

    return(
    <>
         <Box sx={{ display: "flex"}}>
            <CssBaseline />
          <AdminNav/>
        <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
 <div className="container mt-5">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input type="text" className="form-control" name="title" value={product.title} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea className="form-control" name="description" value={product.description} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL:</label>
          <input type="text" className="form-control" name="image" value={product.image} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Category:</label>
          <input type="text" className="form-control" name="category" value={product.category} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Colors:</label>
          {colors.map((color) => (
            <div key={color} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                name="color"
                value={color}
                checked={product.color.includes(color)}
                onChange={handleChange}
              />
              <label className="form-check-label">{color}</label>
            </div>
          ))}
        </div>

        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input type="number" className="form-control" name="price" value={product.price} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Owner:</label>
          <input type="text" className="form-control" name="owner" value={product.owner} onChange={handleChange} />
        </div>

        {/* <div className="mb-3">
          <label className="form-label">Average Rating:</label>
          <input type="number" className="form-control" name="averageRating" value={product.averageRating} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Reviews:</label>
          <textarea className="form-control" name="reviews" value={product.reviews} onChange={handleChange} />
        </div> */}

        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
      </Box>
      </Box>
    </>
    );
}


export default AddProductPage;