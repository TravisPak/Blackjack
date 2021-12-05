import React, { useState, useEffect } from 'react';
import Example from './HooksExample.jsx';
import DealerHand from './DealerHand.jsx';
import PlayerHand from './PlayerHand.jsx';
import cards from './Cards.jsx';


function App(props) {
  const [deck, updateDeck] = useState(cards);
  const [playerHand, setPlayerHand] = useState([]);
  const [playerPoints, setPlayerPoints] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [dealerPoints, setDealerPoints] = useState([]);
  const [standBeenCalled, setStandBeenCalled] = useState(false);
  const [outcome, setOutcome] = useState('')

  let removeCard = (index) => {
    let updatedDeck = deck;
    updatedDeck.splice(index, 1);
    updateDeck(updatedDeck);
  };

  let deal = () => {
    setOutcome('');
    setStandBeenCalled(false);

    let getTwoRandomCards = () => {
      let hand = [];
      let points = [];

      for (let i = 0; i < 2; i++) {
        let randomIndex = Math.floor(Math.random() * deck.length);
        let randomCard = deck[randomIndex];

        removeCard(randomIndex);
        hand.push(<img src={randomCard[0]} key={i} className='card' />);
        points.push(randomCard[1]);
      }
      return {hand: hand, points: points}
    }

    let firstHand = getTwoRandomCards();
    setPlayerHand(firstHand.hand)
    setPlayerPoints(firstHand.points)
    let secondHand = getTwoRandomCards();
    setDealerHand(secondHand.hand)
    setDealerPoints(secondHand.points)
  }

  let hit = () => {
    let randomIndex = Math.floor(Math.random() * deck.length);
    let randomCard = deck[randomIndex];

    removeCard(randomIndex);
    setPlayerPoints((oldArray) => [...oldArray, randomCard[1]]);
    setPlayerHand((oldArray) => [...oldArray, <img src={randomCard[0]} className='card' />]);
  };

  let stand = () => {
    setStandBeenCalled(true);
    let dealerTotal = dealerPoints.reduce((a, b) => a+b, 0);

    if (dealerTotal < 17) {
      let randomIndex = Math.floor(Math.random() * deck.length);
      let randomCard = deck[randomIndex];

      removeCard(randomIndex);
      setDealerPoints((oldArray) => [...oldArray, randomCard[1]]);
      setDealerHand((oldArray) => [...oldArray, <img src={randomCard[0]} className='card' />]);
    } else {
      evaluate();
    }
  };

  let evaluate = () => {
    let dealerTotal = dealerPoints.reduce((a, b) => a+b, 0);
    let playerTotal = playerPoints.reduce((a, b) => a+b, 0);

    console.log(playerTotal)
    if (playerTotal > 21) {
      setOutcome('BUST!!');
      setStandBeenCalled(true);
    }
    if (playerTotal === 21 && dealerTotal < 21) {
      setOutcome('!! 21 !!')
      setTimeout(stand, 2000);
    }
    if (dealerTotal > 21) {
      setOutcome('WINNER!!');
    }
    if ((dealerTotal >= 17) && (dealerTotal <= 21) && (standBeenCalled) && (dealerTotal > playerTotal)) {
      setOutcome('LOSE!!');
    }
    if ((dealerTotal >= 17) && (dealerTotal <= 21) && (dealerTotal < playerTotal) && (playerTotal <= 21) && (standBeenCalled)) {
      setOutcome('WINNER');
    }
    if ((dealerTotal >= 17) && (dealerTotal <= 21) && (dealerTotal === playerTotal) && (standBeenCalled)) {
      setOutcome('TIE');
    }
  }

  useEffect(() => {

    // check if Ace needs to be converted
    console.log('checking for 11...', playerPoints, playerPoints.reduce((a, b) => a+b, 0))
    if ((playerPoints.indexOf(11) >= 0) && ((playerPoints.reduce((a, b) => a+b, 0)) > 21)) {
      let tempPointsArray = playerPoints;
      tempPointsArray.splice(tempPointsArray.indexOf(11), 1, 1)
      setPlayerPoints(tempPointsArray);
    }

    // evaluate for winner
    evaluate();

    // add cards to dealer hand if under 17
    let dealerTotal = dealerPoints.reduce((a, b) => a+b, 0);
    if (standBeenCalled && dealerTotal < 17) {
      stand();
    }
  }, [playerPoints, dealerPoints, playerHand, dealerHand]);
  console.log('playerHand: ', playerHand, 'playerPoints: ', playerPoints);

  return (

    <div className="app">
      <h1 className="banner">BlackJack!</h1>
      <div className="dealer-points"> Dealer Points {dealerPoints.reduce((a, b) => a+b, 0)} </div>
      <DealerHand dealerHand={dealerHand} standBeenCalled={standBeenCalled}/>
      <div className="outcome">{outcome}</div>
      <PlayerHand playerHand={playerHand} />
      <div className="player-points"> Player Points {playerPoints.reduce((a, b) => a+b, 0)} </div>
      <span className="buttons">
        <button onClick={() => { deal(); }} className='deal'>
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
  );
}

export default App;
