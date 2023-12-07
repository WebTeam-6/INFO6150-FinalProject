import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useState } from "react";
import axios from 'axios';
import PieChart from "./PieChart";
import BarGraph from "./BarGraph";
import PeopleIcon from '@mui/icons-material/People';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import { Rating } from "@mui/material";
import CategoryIcon from '@mui/icons-material/Category';

Chart.register(CategoryScale);

function DashBoard() {
  const [apiPieData, setPieData] = useState([]);
  const [apiBarData, setApiBarData] = useState([]);
  const [totalOrders,setTotalOrders] = useState(null);
  const [totalCustomers,setTotalCustomers] = useState(null);
  const [avgRating,setAvgRating] = useState(null);
  const [totalProducts,setTotalProducts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/admin/dashboard/getProductsByCategory');
        const barResponse = await axios.get('http://localhost:8000/admin/dashboard/getOrdersByDay');
        const orders= await axios.get("http://localhost:8000/admin/dashboard/getTotalOrders");
        const customers = await axios.get("http://localhost:8000/admin/dashboard/getTotalNoOfCustomers");
        const ratings = await axios.get("http://localhost:8000/admin/dashboard/getTotalAverageRatings");
       const products = await axios.get("http://localhost:8000/admin/dashboard/getTotalProducts");
        const apiResponseData = response.data.result;
        const barApiResponseData = barResponse.data.weeklyOrders[0];
        setPieData(apiResponseData);
        setTotalCustomers(customers.data?.totalUsers);
        setTotalOrders(orders.data?.totalOrders);
        setApiBarData(barApiResponseData);
        setAvgRating(ratings.data?.averageRating);
       setTotalProducts(products.data?.totalProducts);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  console.log(totalCustomers)
  console.log(totalOrders)

  console.log(apiPieData)
  const chartData = {
    labels: Object.keys(apiPieData),
    datasets: [
      {
        label: "Ordered",
        data: Object.values(apiPieData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)', 
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,

      },
    ],
  };


  console.log(apiBarData)

  const barChart = {
    labels: Object.keys(apiBarData),
    fill: true,
    datasets: [
      {
        label: "Orders Placed",
        data: Object.values(apiBarData),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return (
    <>
    <div className="stats">
    <div className="stat-card" id="one">
      <div className="stat-left">
        <h4>Customers</h4>
        <p>{totalCustomers}</p>
      </div>
      <div className="stat-right">
      <PeopleIcon/>
      </div>
    </div>
    <div className="stat-card" id="two">
      <div className="stat-left">
        <h4>Orders</h4>
        <p>{totalOrders}</p>
      </div>
      <div className="stat-right">
      <Inventory2Icon/>
      </div>
    </div>
    <div className="stat-card" id="three">
      <div className="stat-left">
        <h4>Products</h4>
        <p>{totalProducts}</p>
      </div>
      <div className="stat-right">
      <CategoryIcon/>
      </div>
    </div>
    </div>
     <div className="App">
      <PieChart chartData={chartData} />
      <BarGraph chartData={barChart} />
    </div>
    <div className="ratings-average">
      <div className="rating-left">
        <h2>Average Rating</h2>
      </div>
      <div className="rating-right"><Rating name="read-only" value={avgRating} precision={0.5} readOnly size="large" />
      </div>
    </div>
    </>
  );
}

export default DashBoard;



