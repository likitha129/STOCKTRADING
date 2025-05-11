import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Container, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, TextField } from "@mui/material";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const stocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 175, color: "#1e90ff" },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 2800, color: "#34a853" },
  { symbol: "TSLA", name: "Tesla Inc.", price: 850, color: "#ff9900" },
  { symbol: "AMZN", name: "Amazon Inc.", price: 3300, color: "#ff4500" },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 299, color: "#0078d7" },
  { symbol: "NFLX", name: "Netflix Inc.", price: 610, color: "#e50914" },
  { symbol: "NVDA", name: "Nvidia Corp.", price: 220, color: "#76b900" },
  { symbol: "FB", name: "Meta Platforms Inc.", price: 345, color: "#4267B2" },
  { symbol: "BABA", name: "Alibaba Group", price: 120, color: "#ff6f00" },
  { symbol: "V", name: "Visa Inc.", price: 210, color: "#1a1f71" },
  { symbol: "PYPL", name: "PayPal Holdings", price: 180, color: "#003087" },
  { symbol: "DIS", name: "Walt Disney Co.", price: 150, color: "#f47b20" },
  { symbol: "JPM", name: "JPMorgan Chase & Co.", price: 160, color: "#003366" },
  { symbol: "BA", name: "Boeing Co.", price: 210, color: "#0033a0" },
  { symbol: "AMD", name: "Advanced Micro Devices", price: 120, color: "#ed1c24" },
  { symbol: "INTC", name: "Intel Corp.", price: 50, color: "#0071c5" },
  { symbol: "CSCO", name: "Cisco Systems", price: 55, color: "#ff6347" },
  { symbol: "IBM", name: "IBM Corp.", price: 135, color: "#000000" },
  { symbol: "ORCL", name: "Oracle Corp.", price: 90, color: "#f80000" }
];

const Navbar = () => (
  <AppBar position="static" sx={{ background: "#2c3e50" }}>
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>SimuStock</Typography>
      <Button color="inherit" component={Link} to="/">Home</Button>
      <Button color="inherit" component={Link} to="/market">Market</Button>
      <Button color="inherit" component={Link} to="/portfolio">Portfolio</Button>
      <Button color="inherit" component={Link} to="/stocks">Stock Graph</Button>
      <Button color="inherit" component={Link} to="/profile">Profile</Button>
      <Button color="inherit" component={Link} to="/settings">Settings</Button>
      <Button color="inherit" component={Link} to="/login">Login</Button>
      <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
    </Toolbar>
  </AppBar>
);

const Home = () => (
  <Container sx={{ textAlign: "center", padding: "50px", backgroundColor: "#f4f4f4", borderRadius: "10px" }}>
    <Typography variant="h3" sx={{ fontWeight: "bold", color: "#2c3e50" }}>Welcome to Virtual Stock Trading</Typography>
    <Typography variant="h6" sx={{ color: "#7f8c8d", marginBottom: "20px" }}>Trade stocks in real-time and manage your portfolio with ease.</Typography>
    <Button variant="contained" color="primary" component={Link} to="/market">Get Started</Button>
  </Container>
);

const MyStocks = ({ portfolio }) => (
  <Container>
    <Typography variant="h4">My Stocks</Typography>
    {portfolio.length === 0 ? (
      <Typography>No stocks owned yet.</Typography>
    ) : (
      <Grid container spacing={2}>
        {portfolio.map((stock, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ backgroundColor: stock.color, color: "white" }}>
              <CardContent>
                <Typography variant="h6">{stock.name} ({stock.symbol})</Typography>
                <Typography variant="h5">${stock.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    )}
  </Container>
);

const Market = ({ buyStock }) => {
  const [chartData, setChartData] = useState({
    labels: stocks.map(stock => stock.symbol),
    datasets: [
      {
        label: "Stock Prices",
        data: stocks.map(stock => stock.price),
        borderColor: "rgb(75, 192, 192)",
        fill: false,
        tension: 0.1,
      },
    ],
  });

  return (
    <Container>
      <Typography variant="h4">Live Stock Market</Typography>
      <Line data={chartData} />
      <Grid container spacing={2}>
        {stocks.map((stock) => (
          <Grid item xs={12} sm={6} md={3} key={stock.symbol}>
            <Card sx={{ backgroundColor: stock.color, color: "white" }}>
              <CardContent>
                <Typography variant="h6">{stock.name} ({stock.symbol})</Typography>
                <Typography variant="h5">${stock.price}</Typography>
                <Button variant="contained" color="secondary" onClick={() => buyStock(stock)}>Buy</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const Portfolio = ({ portfolio, sellStock }) => (
  <Container>
    <Typography variant="h4">My Portfolio</Typography>
    {portfolio.length === 0 ? (
      <Typography>No stocks owned yet.</Typography>
    ) : (
      <Grid container spacing={2}>
        {portfolio.map((stock, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ backgroundColor: stock.color, color: "white" }}>
              <CardContent>
                <Typography variant="h6">{stock.name} ({stock.symbol})</Typography>
                <Typography variant="h5">${stock.price}</Typography>
                <Button variant="contained" color="error" onClick={() => sellStock(index)}>Sell</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    )}
  </Container>
);

const Stocks = () => (
  <Container>
    <Typography variant="h4">Stock Performance</Typography>
    <Line data={{
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: stocks.map(stock => ({
        label: stock.symbol,
        data: [stock.price, stock.price + 10, stock.price - 20, stock.price + 30, stock.price - 5],
        borderColor: stock.color,
        fill: false
      }))
    }} />
  </Container>
);

const Profile = () => (
  <Container>
    <Typography variant="h4">Profile</Typography>
    <TextField label="Full Name" fullWidth margin="normal" />
    <TextField label="Email" fullWidth margin="normal" />
    <TextField label="Phone Number" fullWidth margin="normal" />
    <TextField label="Address" fullWidth margin="normal" />
    <Button variant="contained" color="primary">Update Profile</Button>
  </Container>
);

const Settings = () => (
  <Container>
    <Typography variant="h4">Settings</Typography>
    <Button variant="contained" color="primary">Change Password</Button>
    <Button variant="contained" color="secondary" sx={{ marginLeft: 2 }}>Enable 2FA</Button>
  </Container>
);

const Login = () => (
  <Container>
    <Typography variant="h4">Login</Typography>
    <TextField label="Email" fullWidth margin="normal" />
    <TextField label="Password" fullWidth type="password" margin="normal" />
    <Button variant="contained" color="primary">Login</Button>
  </Container>
);

const Signup = () => (
  <Container>
    <Typography variant="h4">Sign Up</Typography>
    <TextField label="Full Name" fullWidth margin="normal" />
    <TextField label="Email" fullWidth margin="normal" />
    <TextField label="Password" fullWidth type="password" margin="normal" />
    <Button variant="contained" color="primary">Sign Up</Button>
  </Container>
);

const App = () => {
  const [portfolio, setPortfolio] = useState([]);

  const buyStock = (stock) => {
    setPortfolio([...portfolio, stock]);
  };

  const sellStock = (index) => {
    setPortfolio(portfolio.filter((_, i) => i !== index));
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mystocks" element={<MyStocks portfolio={portfolio} />} />
        <Route path="/market" element={<Market buyStock={buyStock} />} />
        <Route path="/portfolio" element={<Portfolio portfolio={portfolio} sellStock={sellStock} />} />
        <Route path="/stocks" element={<Stocks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;