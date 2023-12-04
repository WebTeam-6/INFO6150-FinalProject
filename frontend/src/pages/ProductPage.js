import Products from "../Products/Products";
import SideNav from "../components/SideNav";
import { AppBar, Box, CssBaseline, FormControl, MenuItem, OutlinedInput, Select, Toolbar, useMediaQuery,
    useTheme } from "@mui/material";
import Card from "../components/Card";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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
    const [filteredData,setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
  
    var productDataUrl = `http://localhost:8000/product/get?pageSize=2`;
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
          console.log(selectedFilter)
          if(selectedFilter !== null){
            if(selectedFilter === 'High to Low'){
              productDataUrl = `${productDataUrl}&sortBy=price&sortDirection=desc`;
            }
            if(selectedFilter === 'Low to High'){
              productDataUrl = `${productDataUrl}&sortBy=price&sortDirection=asc`;
            }
          }

          if(currentPage!=null){
            productDataUrl = `${productDataUrl}&page=${currentPage}`;
          }

            const response = await axios.get(productDataUrl);
            setFilteredData(response.data.products);
            console.log(response.data.products.length);
            const calculatedTotalPages = response.data.totalPages;
            console.log(calculatedTotalPages)
        setTotalPages(calculatedTotalPages);
        } catch (error) {
          console.log(error.message);
        }
      };
  
      fetchFilteredData();
    }, [selectedCategory,selectedPrice,selectedFilter, currentPage]); 
  
    const handlePageChange = (event, value) => {
      console.log(value)
      setCurrentPage(value);
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
      <SideNav handleChange={handleChange} handleSliderChange={handleSliderChange} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <div style={{display: "flex", justifyContent: "flex-end"}}>
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
        <Products result={filteredData.map(({ _id, image, title, averageRating, price, reviews }) => {
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
        </>
    );
}

export default ProductPage;