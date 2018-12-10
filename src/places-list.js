import React from 'react'

const PlacesList = ({res, onClickChange}) => { 
        let listItems = []; 
        if(res === undefined) {
            listItems =  
            <li tabIndex='5'>No Results</li>
            
        }
        else if (res !== undefined) {
            listItems = res.map((number) => 
            <li tabIndex='5' onClick={() => onClickChange(number)} key={number.restaurant.id}>{number.restaurant.name} </li>
            );
        }
        return (<ul aria-label="Restaurant List" tabIndex='3' className="placesList">{listItems}</ul>)

}
export default PlacesList;