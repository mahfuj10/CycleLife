import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import AuthProvider from './Components/Context/AuthProvider/AuthProvider';
import Cycles from './Components/Cycles/Cycles/Cycles';
import Dashboard from './Components/Dashboard/Dashboard/Dashboard';
import Payment from './Components/Dashboard/Payment/Payment';
import Home from './Components/Home/Home/Home';
import LoginBox from './Components/Login/LoginBox/LoginBox';
import PrivateRoute from './Components/Login/PrivateRoute/PrivateRoute';
import RegisterBox from './Components/Login/RegisterBox/RegisterBox';
import { setProducts } from './Redux/actions/action';
import { useDispatch } from 'react-redux';
import axios from 'axios';


function App() {


  const dispacth = useDispatch();
  const fetchProducts = async () => {
    const response = await axios.get('https://cyclelifeexclusive-backend-production.up.railway.app/cycles').catch(err => console.error(err));
    dispacth(setProducts(response.data));

  }
  useEffect(() => {
    fetchProducts();
  }, [])

  return (

    <AuthProvider>
      <BrowserRouter>
        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/home">
            <Home />
          </Route>

          <Route path="/cycles">
            <Cycles />
          </Route>

          <PrivateRoute path="/dashboards">
            <Dashboard />
          </PrivateRoute>


          <Route path="/login">
            <LoginBox />
          </Route>

          <Route path="/register">
            <RegisterBox />
          </Route>

          <Route path="/payment">
            <Payment />
          </Route>

        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
