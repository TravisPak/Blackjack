import { useState, useEffect } from 'react';
import React from 'react';
import dealerBack from '../cards/2B.svg';


function DealerHand(props) {
  return (
    <div className='table'>
      <div className='dealer-area'>
        <img src={dealerBack} className={props.standBeenCalled ?"dealer-back hidden" :  "dealer-back" }/>
        <span className='dealer-cards'>{props.dealerHand}</span>
      </div>
    </div>
  )
}

export default DealerHand;
