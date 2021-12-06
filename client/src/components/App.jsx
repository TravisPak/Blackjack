import React, { useState, useEffect } from 'react';
import Example from './HooksExample.jsx';
import DealerHand from './DealerHand.jsx';
import PlayerHand from './PlayerHand.jsx';
import Form from './Form.jsx';
import cards from './Cards.jsx';


function App(props) {
  const [deck, updateDeck] = useState(cards);
  const [playerHand, setPlayerHand] = useState([]);
  const [playerPoints, setPlayerPoints] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [dealerPoints, setDealerPoints] = useState([]);
  const [standBeenCalled, setStandBeenCalled] = useState(false);
  const [foundEleven, setFoundEleven] = useState(false)
  const [outcome, setOutcome] = useState('')

  let removeCard = (index) => {
    let updatedDeck = deck;
    updatedDeck.splice(index, 1);
    updateDeck(updatedDeck);
  };

  let deal = () => {
    setOutcome('');
    setStandBeenCalled(false);
    setFoundEleven(false);

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
    }

  };

  let evaluate = () => {
    let dealerTotal = dealerPoints.reduce((a, b) => a+b, 0);
    let playerTotal = playerPoints.reduce((a, b) => a+b, 0);

    console.log('EVALUATING PLAYER TOTAL: ', playerTotal, ' VS DEALER: ', dealerTotal, 'standbeencalled?:', standBeenCalled)
    if (playerTotal > 21) {
      setOutcome('BUST!!');
      setStandBeenCalled(true);
    }
    if (playerTotal === 21 && (!standBeenCalled)) {
      setOutcome('!! 21 !!');
      setStandBeenCalled(true);
    }
    if ((dealerTotal > 21) && (playerTotal <= 21)) {
      setOutcome('WINNER!!');
    }
    if ((dealerTotal >= 17) && (dealerTotal <= 21) && (dealerTotal > playerTotal) && (standBeenCalled)) {
      setOutcome('LOSER!!');
    }
    if ((dealerTotal >= 17) && (dealerTotal <= 21) && (dealerTotal < playerTotal) && (playerTotal <= 21) && (standBeenCalled)) {
      setOutcome('WINNER!!');
    }
    if ((dealerTotal >= 17) && (dealerTotal <= 21) && (dealerTotal === playerTotal) && (standBeenCalled)) {
      setOutcome('DRAW');
    }
  }

  useEffect(() => {
    // check if Ace needs to be converted
    console.log('checking for 11...', playerPoints, '=' , playerPoints.reduce((a, b) => a+b, 0))
    if ((playerPoints.indexOf(11) >= 0) && ((playerPoints.reduce((a, b) => a+b, 0)) > 21)) {
      console.log('Found an 11 that needs to be resolved for PLAYER')
      let tempPointsArray = playerPoints;
      tempPointsArray.splice(tempPointsArray.indexOf(11), 1, 1)
      setPlayerPoints(tempPointsArray);
      setFoundEleven(true);
    }

    if ((dealerPoints.indexOf(11) >= 0) && ((dealerPoints.reduce((a, b) => a+b, 0)) > 21)) {
      console.log('Found an 11 that needs to be resolved for DEALER')
      let tempPointsArray = dealerPoints;
      tempPointsArray.splice(tempPointsArray.indexOf(11), 1, 1)
      setDealerPoints(tempPointsArray);
      setFoundEleven(true);
    }
  })

  useEffect(() => {

    // evaluate for winner
    setTimeout(evaluate, 1000);

    // add cards to dealer hand if under 17
    let dealerTotal = dealerPoints.reduce((a, b) => a+b, 0);
    if (standBeenCalled && dealerTotal < 17) {
      stand()
    }
  }, [playerPoints, dealerPoints, playerHand, dealerHand, standBeenCalled, foundEleven]);
  // console.log('playerHand: ', playerHand, 'playerPoints: ', playerPoints, '=', playerPoints.reduce((a, b) => a+b, 0));

  return (
    <div className="app">
        <h1 className="banner">Blackjack!</h1>
        <div className={standBeenCalled ? "dealer-points" : "dealer-points hidden"}> Dealer Points {dealerPoints.reduce((a, b) => a+b, 0)} </div>
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
        <Form/>

      </div>
  );
}

export default App;
