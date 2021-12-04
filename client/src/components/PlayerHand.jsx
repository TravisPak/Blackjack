import { useState, useEffect } from 'react';
import React from 'react';

function PlayerHand(props) {
  const [playerPoints, setPlayerPoints] = useState(0);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerPoints, setDealerPoints] = useState(0);
  const [dealerHand, setDealerHand] = useState([]);
  const [standBeenCalled, setStandBeenCalled] = useState(false);

  let dealDealer = () => {
    let hand = [];
    let points = 0;

    for (let i = 0; i < 2; i++) {
      let randomIndex = Math.floor(Math.random() * props.deck.length);
      let randomCard = props.deck[randomIndex];

      points += randomCard[1];
      props.removeCard(randomIndex);
      hand.push(<img src={randomCard[0]} key={i} className='card' />);
    }
    setDealerPoints(points);
    setDealerHand(hand);
  };

  let dealPlayer = () => {
    setStandBeenCalled(false);
    let hand = [];
    let points = 0;

    for (let i = 0; i < 2; i++) {
      let randomIndex = Math.floor(Math.random() * props.deck.length);
      let randomCard = props.deck[randomIndex];

      points += randomCard[1];
      props.removeCard(randomIndex);
      hand.push(<img src={randomCard[0]} key={i} className='card' />);
    }

    setPlayerPoints(points);
    setPlayerHand(hand);
  };

  // let dealPlayer = () => {
  //   setPlayerHand([]);
  //   setPlayerPoints(0);
  //   // hit();
  //   // hit();
  // }

  // on hit, add new card, update parent info
  let hit = () => {
    let randomIndex = Math.floor(Math.random() * props.deck.length);
    let randomCard = props.deck[randomIndex];

    setPlayerPoints(playerPoints + randomCard[1]);
    props.removeCard(randomIndex);
    setPlayerHand((oldArray) => [...oldArray, <img src={randomCard[0]} className='card' />]);
  };

  let stand = () => {
    setStandBeenCalled(true);

    if (dealerPoints < 17) {
      let randomIndex = Math.floor(Math.random() * props.deck.length);
      let randomCard = props.deck[randomIndex];

      setDealerPoints(dealerPoints + randomCard[1]);
      props.removeCard(randomIndex);
      setDealerHand((oldArray) => [...oldArray, <img src={randomCard[0]} className='card' />]);
    }
  };

  // on update, send point total to parent
  useEffect(() => {
    // console.log('playerHand: ', playerHand, '\nplayerPoints: ', playerPoints)
    console.log('dealerHand: ', dealerHand, '\ndealerPoints: ', dealerPoints);

    props.getPlayerPoints(playerPoints);
    props.getDealerPoints(dealerPoints);

    if (standBeenCalled && dealerPoints < 17) {
      stand();
    }
  }, [playerPoints, dealerPoints]);

  return (
    <div className='table'>
      <div className='dealer-area'>
        <span className='dealer-cards'>{dealerHand}</span>
      </div>
      <div className='player-area'>
        <span className='player-cards'>{playerHand}</span>
        <span className='buttons'>
          <button
            onClick={() => {
              dealPlayer();
              dealDealer();
            }}
            className='deal'
          >
            DEAL
          </button>
          <button onClick={hit} className='hit'>
            HIT
          </button>
          <button onClick={stand} className='stand'>
            STAND
          </button>
        </span>
      </div>
    </div>
  );
}

export default PlayerHand;
