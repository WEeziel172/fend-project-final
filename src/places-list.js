import React from 'react'

const PlacesList = ({res, onClickChange}) => { 
        let listItems = []; 
        if(res === '') {
            console.log("no data")
        }
        else {
            listItems = res.map((number) => 
            <li onClick={() => onClickChange(number)} key={number.restaurant.id}>{number.restaurant.name} </li>
            );
            return (<ul className="placesList">{listItems}</ul>)
        }
}
export default PlacesList;