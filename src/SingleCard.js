import "./SingleCard.css"

export default function SingleCard( { card, handleChoice, flipped, disabled } ) {

    const handleClick = () => {
        if( !disabled ){
            handleChoice(card)
        }
    }

    return(
        <div className='card'>
            <div className={flipped ? "flipped" : ""}>
                <img className='front image-size' src={card.src} alt='front img' />
                <img 
                    className='back image-size' 
                    src='/images/00.jpg' 
                    alt='back img' 
                    onClick={handleClick}
                />
            </div>
        </div>
    )
}