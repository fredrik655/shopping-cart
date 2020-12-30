import React, {useState, useEffect} from "react";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";

const Items = (props) => {
  const [dataFetched, setDataFetched] = useState(false);
  const [itemData, setItemData] = useState([]);
  const [buyNumber, setBuyNumber] = useState(0);

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  const fetchData = () => {
    fetch(`https://fortnite-api.com/v2/cosmetics/br/${props.props.match.params.id}`)
    .then(value => {
      return value.json();
    })
    .then(data => {
      parseItemData(data.data);
      setDataFetched(true);
    })
    .catch(response => {
      console.log(response);
    });
  };

  const parseItemData = (data) => {
    const tempArr = [];
    data = [data];
    data.forEach(element => {
      tempArr.push({
        name: element.name,
        price: props.props.history.location.state.price,
        imgUrl: element.images.icon,
        id: element.id,
      });
    });
    setItemData(tempArr);
  }

  const updateItemQuantity = ev => {
    if(ev.target.textContent === "+"){
      setBuyNumber(buyNumber + 1);
    }
    else {
      if(buyNumber > 0){
        setBuyNumber(buyNumber - 1);
      }
    }
  }


  const generateJsxContent = () => {
    if(dataFetched === false){
      return (
        <div className="item-card">
          <h2>item</h2>
          <img src="#" alt="" />
          <p>Loading</p>
          <Link to={`/Shop/${Math.random()}`}>
            <button>go to item page</button>
          </Link>
        </div>
      );
    }
    else {
      return (
        itemData.map(element => {
          return (
            <div key={element.id} className="item-card-i">
              <h2>{element.name}</h2>
              <img src={element.imgUrl} alt={element.name} />
              <p>Price: {element.price}</p>
              <button onClick={props.addItemToCheckout}>Buy item</button>
              <div id="buy-amount">
                <button className="button-increment" onClick={updateItemQuantity}>-</button>
                <p>{buyNumber}</p>
                <button className="button-increment" onClick={updateItemQuantity}>+</button>
              </div>
            </div>)
        })
      );
    }
  };


  return (
    <div className="shop-item-container">
      {generateJsxContent()}
    </div>
  );
};

export default Items;
