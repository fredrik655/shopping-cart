import "./App.css";
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Shop from "./Components/Shop";
import Checkout from "./Components/Checkout";
import Items from "./Components/Items";

//// https://dash.fortnite-api.com/

const App = () => {
  const [cacheTimer, setCacheTimer] = useState(0);
  const [checkoutItems, setCheckoutItems] = useState([]);

  useEffect(() => {
    //console.log(checkoutItems);
  },[checkoutItems]);

  const updateCacheTimer = newDate => {
    setCacheTimer(newDate)
  };

  const addItemToCheckout = ev => {
    const parentNode = ev.target.parentNode;
    const name = parentNode.querySelector('h2').textContent;
    const price = +parentNode.querySelector('p').textContent.slice(7);
    const id = ev.target.formAction.split("/")[4];
    const quantity = parentNode.querySelector('#buy-amount').querySelector('p').textContent;
    if(+quantity > 0){
      const newCheckoutItem = {name: name, price: price, id: id, numberOf: +quantity};
      if(checkoutItems.find(element => element.name === name)){
        const tempArr = [...checkoutItems];
        tempArr.forEach(element => {
          if(element.name === name){
            element.numberOf += (+quantity);
          }
        });
        setCheckoutItems(tempArr);
      }
      else{
        const tempArr = [...checkoutItems, newCheckoutItem];
        setCheckoutItems(tempArr);
      }
    }
    
  }

  const returnNumberOfItemsInCheckout = () => {
    let total = 0;
    checkoutItems.forEach(element => {
      total += element.numberOf;
    })
    return total;
  }
  return (
    <div className="app" >
      
      <Router>
        <NavBar numberOfCheckoutItems={returnNumberOfItemsInCheckout()}/>
        <Switch>
          <Route path={`${process.env.PUBLIC_URL}/`} exact component={Home} />
          <Route path={`${process.env.PUBLIC_URL}/Shop`} exact>
            <Shop cacheTimer={cacheTimer} timerFunc={updateCacheTimer}/>
          </Route>
          <Route path={`${process.env.PUBLIC_URL}/Shop/:id`} render={props => <Items props={props} addItemToCheckout={addItemToCheckout} />}>
          </Route>
          <Route path={`${process.env.PUBLIC_URL}/Checkout`} exact  render={props => <Checkout props={props} items={checkoutItems}/>}/>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
