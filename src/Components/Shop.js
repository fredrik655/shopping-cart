import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {intervalToDuration} from 'date-fns';

const Shop = (props) => {
  const [dataFetched, setDataFetched] = useState(false);
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = () => {
    if(checkIfCacheTimerIsReady()) {
      caches.open('api-data')
      .then((value) => {
        value.add("https://fortnite-api.com/v2/shop/br");
      });
      readApiCache();
    }
    else {
      readApiCache();
    }
  };

  const checkIfCacheTimerIsReady = () => {
    if(props.cacheTimer === 0){
      props.timerFunc(new Date());
      return true;
    }
    else {
      const timeDiff = intervalToDuration({start: props.cacheTimer, end: new Date()});
      if(timeDiff.minutes > 5){
        props.timerFunc(new Date());
        return true;
      }
      else {
        return false;
      }
    }
    
  };

  const readApiCache = async () => {
    const newCache = await caches.open('api-data');
    newCache.match("https://fortnite-api.com/v2/shop/br")
    .then(value => {
      return value.json();
    })
    .then(data => {
      parseItemData(data.data.featured.entries);
      setDataFetched(true);
    });
  }

  const parseItemData = (data) => {
    const tempArr = [];
    data.forEach(element => {
      tempArr.push({
        name: element.items[0].name,
        price: element.finalPrice,
        imgUrl: element.items[0].images.icon,
        id: element.items[0].id,
      });
    });
    setItemData(tempArr);
  }
  
  const generateJsxContent = () => {
    if(dataFetched === false){
      return (
        <div className="item-card">
          <h2>item</h2>
          <img src="#" alt="" />
          <p>Loading</p>
          <Link to={`/Shop/Error`}>
            <button>go to item page</button>
          </Link>
        </div>
      );
    }
    else {
      return (
        itemData.map(element => {
          return (
            <div key={element.id} className="item-card">
              <h2>{element.name}</h2>
              <img src={element.imgUrl} alt={element.name} />
              <p>Price: {element.price}</p>
              <Link to={{
                pathname: `${process.env.PUBLIC_URL}/Shop/${element.id}`,
                state: {price: element.price}
              }}>
                <button >go to item page</button>
              </Link>
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

export default Shop;
