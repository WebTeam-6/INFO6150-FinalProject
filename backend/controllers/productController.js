const Product = require('../models/product.js');

const ProductController = {
    

    // get single product 
    async get_product(req, res) {

        try {
            console.log("in get_product", req.params.productId);
            const product = await Product.findById(req.params.productId);
            if(!product) {
                res.status(404).json({
                    type: "error",
                    message: "Product doesn't exists"
                })
            } else{
                res.status(200).json({
                    type: "success",
                    product
                })
            }   
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    },

    //get all products
    async get_AllProducts(req, res) {
        try {
            const product = await Product.find();
            if(!product) {
                res.status(404).json({
                    type: "error",
                    message: "Product doesn't exists"
                })
            } else{
                res.status(200).json({
                    type: "success",
                    product
                })
            }   
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    },

    // get all products with filtering
    async get_productsByFiltering(req, res) {
        try {
            console.log("in get products by");
            const { sortBy, colors, category, price, page, pageSize, sortDirection, searchByTitle, minAverageRating } = req.query;

            let query = {};

            console.log("sortBy ", sortBy);
            
            if (colors) {
                const colorArray = Array.isArray(colors) ? colors : colors.split(',');
                query.color = { $in: colorArray };
              }
        
            
            if (category) {
                const categoryArray = Array.isArray(category) ? category : category.split(',');
                query.category = { $in: categoryArray };
            }

            console.log(price);
            if (price) {
              // Assume price is in the format "min-max"
              const [min, max] = price.split('-');
              query.price = { $gte: parseFloat(min), $lte: parseFloat(max) };
            }

            console.log("minAverageRating", minAverageRating);
            if (minAverageRating) {
                query.averageRating = {$gte: parseFloat(minAverageRating) };
            }

            //search
            if (searchByTitle) {
                query.title = { $regex: new RegExp(searchByTitle, 'i') };
              }

            //sortDirection should be asc or desc
            const sortOptions = {};
            if (sortBy) {
              sortOptions[sortBy] = sortDirection === 'desc' ? -1 : 1;
            }
        
            const totalProducts = await Product.countDocuments(query);
            const totalPages = Math.ceil(totalProducts / pageSize);
            const currentPage = parseInt(page, 10) || 1;
        
            const products = await Product.find(query)
              .sort(sortOptions)
              .skip((currentPage - 1) * pageSize)
              .limit(parseInt(pageSize));
        
            res.json({
              products,
              totalPages,
              currentPage,
            });
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    },

    // create new product
    async create_product(req, res) {
        console.log(req.body);
        const { title, description, image,  price, color, owner, category, reviews } = req.body;
        const averageRating = calculateAverageRating(reviews);

        const newProduct = new Product({
            title,
            description,
            image,
            price,
            color, 
            owner, 
            category, 
            reviews, 
            averageRating, 
          });
          
        try {
            const savedProduct = await newProduct.save();
            res.status(201).json({
                type: "success",
                message: "Product created successfully",
                savedProduct
            })
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    },

    //update product 
    async update_productWhishlist(req, res) {
       const productId = req.params.productId;
       const {userId} = req.body;
       console.log(req.params)
       try{
        const product = await Product.findById(productId);
        console.log("product ", product);
        
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const index = product.wishlist.indexOf(userId);

      if (index !== -1) {
        // User ID exists in the wishlist, remove it
        product.wishlist.splice(index, 1);
      } else {
        // User ID doesn't exist in the wishlist, add it
        product.wishlist.push(userId);
      }
      console.log(product)
    
      await product.save();
      res.json({ message: 'Product updated successfully' ,product});

       }
       catch(error){
        console.log(error);
        res.status(500).json({ error: error });

       }

    },

    /* update product rating */
    async update_product(req, res) {
        const existing = await Product.findById(req.params.id);
        if(!existing){
            res.status(404).json({
                type: "error",
                message: "Product doesn't exists"
            })
        } else {
            try {
                const product = await Product.findById(req.params.id);

                product.reviews.push();
                res.status(200).json({
                    type: "success",
                    message: "Product updated successfully",
                    updatedProduct
                })
            } catch (err) {
                res.status(500).json({
                    type: "error",
                    message: "Something went wrong please try again",
                    err
                })
            }
        }
    },

    /* delete product */
    async delete_user(req, res) {
        const existing = await Product.findById(req.params.id);
        if (!existing) {
            res.status(200).json({
                type: "error",
                message: "Product doesn't exists"
            })
        } else {
            try {
                await Product.findOneAndDelete(req.params.id);
                res.status(200).json({
                    type: "success",
                    message: "Product has been deleted successfully"
                });
            } catch (err) {
                res.status(500).json({
                    type: "error",
                    message: "Something went wrong please try again",
                    err
                })
            }
        }
    }
};

function calculateAverageRating(reviews) {
    if (!reviews || reviews.length === 0) {
        return 0; 
      }
    
      const totalRating = reviews.reduce((sum, review) => sum + parseInt(review.ratingNumber), 0);
    //   console.log("totalRating" , totalRating);
      const average = Math.round(totalRating / reviews.length*100)/100;
    //   console.log(average);
      return Number.isNaN(average) ? 0 : average;
  }

module.exports = ProductController;