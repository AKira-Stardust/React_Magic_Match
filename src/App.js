import './App.css'
import { useEffect, useState } from 'react'
import SingleCard from './SingleCard'

const cardImages = [
  {"src": "/images/1.png", matched: false},
  {"src": "/images/2.png", matched: false},
  {"src": "/images/3.png", matched: false},
  {"src": "/images/4.png", matched: false},
  {"src": "/images/5.png", matched: false},
  {"src": "/images/6.png", matched: false}
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [ ...cardImages, ...cardImages]
    .sort( () => Math.random() - 0.5)
    .map( (card) => ({ ...card, id:Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
    setChoiceOne(null)
    setChoiceTwo(null)
  
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect( () => {
    if(choiceOne && choiceTwo) {
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src) {
        //set matched True
        setCards( (prevCards) => {
          return prevCards.map( card => {
            if(card.src === choiceOne.src){
              return({...card, matched: true})
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {        
        setTimeout(() => resetTurn(), 1000)
      } 
    }
  }, [choiceOne, choiceTwo])

  // console.log(cards);
  
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  useEffect( ()=>{
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1 className='fancy'>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map( (card) => { return(
          <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        )} )}
      </div>
      <p>Count: {turns}</p>

    </div>
  );
}

export default App;
