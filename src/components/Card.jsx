import Tilt from "react-parallax-tilt";

function Card({ character, isFlipped, handleCardClick }) {
  return (
    <div
      className={isFlipped ? "card flipped" : "card"}
      onClick={() => handleCardClick(character)}
    >
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.6}
        glareColor="#ffffff"
        glarePosition="bottom"
        glareBorderRadius="20px"
        className="tilt"
      >
        <div className="cardFace">
          <div
            className="characterHolder"
            style={{ backgroundImage: `url(${character.src})` }}
          />
          <div className="name">{character.name}</div>
        </div>
        
        {/* This represents the back side of the card (what is shown when
         the card is flipped over). It's an empty div since the actual 
         background (back of the card) will be styled through CSS, typically
          with a solid color or background image. */}
        <div className="cardBack"></div>
      </Tilt>
    </div>
  );
}

export default Card;
