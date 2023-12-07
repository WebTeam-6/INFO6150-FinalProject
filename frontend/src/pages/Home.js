import '../styles/home.css';
import Chip from "@mui/material/Chip";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NavBar from '../components/NavBar';
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Footer from '../components/Footer';

const FAQData = [
    {
      question: 'What is शिल्पकला?',
      answer: 'An online platform or website that showcases and sells handmade and artisanal products. It connects artisans and crafters with a global audience interested in unique, handmade goods. Our aim is to motivate and support small-scale businesses to stand still in the face of the storm.',
    },
    {
      question: 'What types of products can I find here?',
      answer: 'शिल्पकला offers a wide range of products, including handmade jewelry, clothing, accessories, home decor, art, pottery, woodwork, candles, soaps, and much more. The variety of items is often based on the skills and creativity of the artisans.',
    },
    {
      question: 'Are the products on here truly handmade?',
      answer: 'Yes, the products on शिल्पकला are typically handmade by artisans or crafters. Many platforms have strict guidelines to ensure that items are genuinely crafted by hand or in small, independent workshops.',
    },
    {
      question: 'Can I request custom or personalized items here?',
      answer: 'Many artisans on this site offer custom or personalized orders. You can usually contact the artisan directly to discuss your specific requirements.',
    },
    {
      question: 'How do I support local artisans and small businesses on handcraft sites?',
      answer: 'You can filter your search to find products from local artisans in your area or those that offer fair trade or ethically sourced items. Supporting small, independent artisans helps sustain traditional crafts and local economies.',
    },
  ];

function Home(){
    return(
        <>
        <AppBar
        position="fixed"
        sx={{backgroundColor: 'white',}}
      >
       <NavBar/>
      </AppBar>
             <div className="home-divide">
        <div className="home-left">
          <Chip label="Handmade Haven" />
          <h1>Handmade Wonders, One Click Away: Crafted for You, Shop with Love.</h1>
          <p className="home-desc">
          Welcome to Shlipkala, where every purchase tells a handmade story. Explore our exclusive online platform dedicated to artisanal craftsmanship. Immerse yourself in a world of unique, handmade treasures spanning fashion, decor, and more. Elevate your style with Shlipkala, where each creation is a testament to the beauty of handcrafted excellence.
          </p>
          <p className="home-desc">
            Popular Categories:
            <Chip label="Jewelry" color="primary" variant="outlined" className="chip"/>
            <Chip label="Art and Craft" color="primary" variant="outlined" className="chip" />
            <Chip label="Home and Living" color="primary" variant="outlined" className="chip"/>
          </p>
        </div>
        <div className="home-right">
          <img src="https://img.freepik.com/free-vector/ecommerce-checkout-laptop-concept-illustration_114360-8243.jpg" alt="Home" className="home-img" />
        </div>
      </div>
      <h2 className="FAQ-title">Best Sellers</h2>
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <img src="https://images.squarespace-cdn.com/content/v1/53a20827e4b0c1bc4487322a/1699299287388-RXW75MSR7JEGCE2DR6Y9/IMG_6244%2B2.jpg?format=1000w" className="card-img-top" alt="..."/>
                  <div className="card-body">
                    <h5 className="card-title">Handmade Candles</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <img src="https://www.thesprucecrafts.com/thmb/Dx5mGpkOyAhQmh_GrY1EMFU2IPA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-700713961-5a6c5c1ca18d9e0037b04811.jpg" className="card-img-top" alt="..."/>
                  <div className="card-body">
                    <h5 className="card-title">Ceramics & Pottery</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <img src="https://theneonteaparty.com/wp-content/uploads/2022/03/How-to-Crochet-with-Multiple-Strands-of-Yarn-1-scaled.jpg" className="card-img-top" alt="..."/>
                  <div className="card-body">
                    <h5 className="card-title">Crocheting & Knitting</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <img src="https://assets.vogue.in/photos/5fb6bca749cee77f06f7e22d/2:3/w_2560%2Cc_limit/Bathtub%2520Series%2520AB.jpg" className="card-img-top" alt="..."/>
                  <div className="card-body">
                    <h5 className="card-title">Traditional Handloom</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <img src="https://5.imimg.com/data5/SELLER/Default/2022/4/MX/GG/WP/146184681/img-20210926-wa0424-500x500.jpg" className="card-img-top" alt="..."/>
                  <div className="card-body">
                    <h5 className="card-title">Handmade Jewelleries</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <img src="https://latinapalace.com/cdn/shop/products/Facetune_26-07-2022-17-25-58.jpg?v=1658964192" className="card-img-top" alt="..."/>
                  <div className="card-body">
                    <h5 className="card-title">Leather Bags</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    <section className="accordion-section" aria-label="Question Accordions">
      <div className="container">
        <h2 className="FAQ-title">Frequently Asked Questions</h2>
        <div className="accordion" id="accordion">
          {FAQData.map((faq, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`collapse${index}`}
                id={`heading${index}`}
              >
                <Typography>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
    <Footer/>
        </>
    );
}

export default Home;