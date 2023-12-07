import Products from "../Products/Products";
import SideNav from "../components/SideNav";
import { AppBar, Box, CssBaseline, FormControl, MenuItem, OutlinedInput, Select, Toolbar, useMediaQuery,
    useTheme } from "@mui/material";
import Card from "../components/Card";
import { jwtDecode } from 'jwt-decode'
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Footer from "../components/Footer";
import SearchIcon from '@mui/icons-material/Search';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "white",
  '&:hover': {
    backgroundColor: "white",
    borderColor:"black",
  },
  borderColor:"#000000",
  //marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const names = [
  'Low to High',
  'High to Low',
  'Highly Rated',
  'Least Rated'
];

function getStyles(name, criteria, theme) {

  return {
    fontWeight:
      criteria.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function ProductPage(){

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const drawerWidth = isMobile ? 200 : 280; 
    const [criteria, setcriteria] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedRating,setSelectedRating] = useState(null);
    const [filteredData,setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchValue, setSearchValue] = useState(null);
  
    var productDataUrl = `http://localhost:8000/product/get?pageSize=3`;
    const [selectedFilter,setSelectedFilter] = useState(null)
    
    const handleChange = (event) => {
      setSelectedCategory(event.target.value);
      console.log(event.target.value)
    };

    const handleSliderChange = (event)=>{
      setSelectedPrice(event.target.value);
      console.log(event.target.value)
    }

    const handleInputChange = (event) => {
      const {
        target: { value },
      } = event;
      setcriteria(
        typeof value === 'string' ? value.split(',') : value,
      );
      console.log(event.target.value)
      setSelectedFilter(event.target.value)
      
    };

    const handleSearchChange = (event) =>{
      console.log("search condition ", event.target.value);
      setSearchValue(event.target.value);
    };

    const handleReviewClick = (rating) => {
      setSelectedRating(rating);
    };

    useEffect(() => {

      const fetchFilteredData = async () => {
        try {
          if (selectedCategory) {
            console.log(productDataUrl);
             productDataUrl = `${productDataUrl}&category=${selectedCategory}`;
             console.log(productDataUrl);
          }
          console.log(selectedPrice);
           if(selectedPrice!==null){
            console.log(selectedPrice);
             productDataUrl = `${productDataUrl}&price=0-${selectedPrice}`;
             console.log(productDataUrl);
          }

          if(selectedRating!== null){
            productDataUrl = `${productDataUrl}&minAverageRating=${selectedRating}`
          }

          if(searchValue !== null){
            console.log("searchValue ", searchValue);
            productDataUrl = `${productDataUrl}&searchByTitle=${searchValue}`
          }

          console.log(selectedFilter)
          if(selectedFilter !== null){
            if(selectedFilter === 'High to Low'){
              productDataUrl = `${productDataUrl}&sortBy=price&sortDirection=desc`;
            }
            if(selectedFilter === 'Low to High'){
              productDataUrl = `${productDataUrl}&sortBy=price&sortDirection=asc`;
            }
            if(selectedFilter === 'Highly Rated'){
              productDataUrl = `${productDataUrl}&sortBy=averageRating&sortDirection=desc`
            }
            if(selectedFilter === 'Least Rated'){
              productDataUrl = `${productDataUrl}&sortBy=averageRating&sortDirection=asc`
            }
          }

          if(currentPage!=null){
            productDataUrl = `${productDataUrl}&page=${currentPage}`;
          }

            const response = await axios.get(productDataUrl);
            // setFilteredData(response.data.products);
            //TODO: check if the wishlastarray in response.data.products contains the user id 2
            const token = localStorage.getItem('token');
            console.log("token", token);
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            console.log("userId ", userId);
            // Add containsUserId to the filtered data
            const filteredDataWithUserId = response.data.products.map((product) => ({
              ...product,
              containsUserId: product.wishlist.includes(userId),
            }));
            setFilteredData(filteredDataWithUserId);
            console.log(filteredData)
            console.log(response.data.products.length);
            const calculatedTotalPages = response.data.totalPages;
            console.log(calculatedTotalPages)
        setTotalPages(calculatedTotalPages);
        if(currentPage>response.data.totalPages){
          setCurrentPage(1);
        }
        } catch (error) {
          console.log(error.message);
        }
      };
  
      fetchFilteredData();
    }, [selectedCategory,selectedPrice,selectedFilter, selectedRating,currentPage, searchValue]); 
  
    const handlePageChange = (event, value) => {
      console.log(value)
      setCurrentPage(value);
      console.log(filteredData);
    };

  



    return(
        <>
        
        <Box sx={{ display: "flex"}}>
        <CssBaseline />
        <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`  ,backgroundColor: 'white',}}
      >
       <NavBar/>
      </AppBar>
      
      <SideNav handleChange={handleChange} handleSliderChange={handleSliderChange}  handleReviewClick={handleReviewClick}/>  
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />


        <div style={{display: "flex", justifyContent: "space-between"}}>
        <Search style={{ borderColor: 'black', marginTop:"35px" }}>
            {/* <SearchIconWrapper> */}
              <SearchIcon />
            {/* </SearchIconWrapper> */}
            <StyledInputBase
              placeholder="Search by Title…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              onChange={handleSearchChange}
              
            />
          </Search>
      <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
          multiple={false}
          displayEmpty
          value={criteria}
          onChange={handleInputChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>--Criteria--</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>Criteria</em>
          </MenuItem>
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, criteria, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
        <Products result={filteredData.map(({ _id, image, title, averageRating, price, reviews, containsUserId}) => {
        const count = reviews.length;
        return (
          <Card
            key={Math.random()}
            productId={_id}
            image={image}
            title={title}
            value={averageRating}
            price={price}
            count = {count}
            containsUserId = {containsUserId}
          />
        );
      })} />
      <div style={{display: "flex",justifyContent: "center",marginTop:"40px"}}>
      <Stack spacing={2}>
      <Pagination  count={totalPages}
          page={currentPage}
          color="secondary"
          onChange={handlePageChange} />
    </Stack>
      </div>
      </Box>
      
        </Box>
        <Footer/>
        </>

       
    );
}

export default ProductPage;