import React, { useState, useEffect } from 'react';
import Example from './HooksExample.jsx';
import PlayerHand from './PlayerHand.jsx';
import cards from './Cards.jsx';

function App(props) {
  const [deck, updateDeck] = useState(cards);
  const [playerPoints, setPlayerPoints] = useState(0);
  const [dealerPoints, setDealerPoints] = useState(0);
  const [inUse, setInUse] = useState([]);

  let removeCard = (index) => {

    let updatedDeck = deck;
    let removed = updatedDeck.splice(index, 1);
    setInUse(inUse.concat([removed]));

    updateDeck(updatedDeck);
  };

  let getPlayerPoints = (points) => {
    setPlayerPoints(points)
  };

  let getDealerPoints = (points) => {
    setDealerPoints(points);
  }

  useEffect(() => {
    // console.log('deck: ', deck, '\nplayerPoints: ', playerPoints,'\ninUse: ', inUse);
    // console.log(playerPoints);

  });

  return (
    <div className="app">
      <h1>BlackJack!</h1>
      <div> Dealer Points {dealerPoints} </div>
      <PlayerHand deck={deck} removeCard={removeCard} getPlayerPoints={getPlayerPoints} getDealerPoints={getDealerPoints} />
      <div> Player Points {playerPoints} </div>
    </div>
  );
}

export default App;
