import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import StarIcon from "@mui/icons-material/Star";
import '../styles/sidenav.css'

import {
  FormControlLabel,
  ListItemText,
  Radio,
  RadioGroup,
  Rating,
  Slider,
  useMediaQuery,
  useTheme
} from "@mui/material";



export default function SideNav({ handleChange ,handleSliderChange, handleReviewClick}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const drawerWidth = isMobile ? 200 : 280; 
  const marks = [
    { value: 0, label: '$0' },
    { value: 30, label: '$30' },
    { value: 60, label: '$60' },
    { value: 100, label: '$100' },
  ];
  
  function valuetext(value) {
    return `${value}`;
  }


  return (
    <>
    <Drawer 
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            paddingLeft: isMobile ? "0px" : "20px", 
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>Shlipkala</Toolbar>
        <Divider />
        <List>
          <ListItemText>Category</ListItemText>
          <ListItem className="filter" inset>
            <RadioGroup aria-label="category" name="category" onChange={handleChange}>
              <FormControlLabel
                value="Art and Craft"
                control={<Radio />}
                label="Art and Craft"
              />
              <FormControlLabel
                value="Jewelry"
                control={<Radio />}
                label="Jewelry"
              />
              <FormControlLabel
                value="Home and Living"
                control={<Radio />}
                label="Home and Living"
              />
              <FormControlLabel
                value="Beauty and Personal Care"
                control={<Radio />}
                label="Beauty and Personal Care"
              />
              <FormControlLabel
                value="Personal Accessories"
                control={<Radio />}
                label="Personal Accessories"
              />
            </RadioGroup>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItemText>Customer Reviews</ListItemText>
          <ListItem className="filter" inset onClick={() => handleReviewClick(4.0)}>
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Rating
                name="text-feedback"
                value={4.0}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <Box sx={{ ml: 2 }}>{"& up"}</Box>
            </Box>
          </ListItem>

          <ListItem className="filter" inset  onClick={() => handleReviewClick(3.0)}>
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Rating
                name="text-feedback"
                value={3.0}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <Box sx={{ ml: 2 }}>{"& up"}</Box>
            </Box>
          </ListItem>
          <ListItem className="filter" inset onClick={() => handleReviewClick(2.0)}>
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Rating
                name="text-feedback"
                value={2.0}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <Box sx={{ ml: 2 }}>{"& up"}</Box>
            </Box>
          </ListItem>

          <ListItem className="filter" inset  onClick={() => handleReviewClick(1.0)}>
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Rating
                name="text-feedback"
                value={1.0}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <Box sx={{ ml: 2 }}>{"& up"}</Box>
            </Box>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItemText>Price</ListItemText>
          <Box sx={{ width: 200 }}>
      <Slider
        aria-label="Custom marks"
        defaultValue={100}
        getAriaValueText={valuetext}
        step={10}
        valueLabelDisplay="auto"
        marks={marks}
        onChange={handleSliderChange}
        color="secondary"
      />
    </Box>
        </List>
      </Drawer>
      
    </>  
  );
}
