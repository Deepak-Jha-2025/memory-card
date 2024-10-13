import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Card from "../components/Card";
import GameOver from "../components/GameOver";
import "../styles/GamePage.scss";

function GamePage({
  goBackToStartPage,
  playClick,
  playFlip,
  shuffle,
  getCharactersToPlayWith,
  countScore,
  charactersToPlayWith,
  charactersToDisplay,
  score,
  bestScore,
  setScore,
  setBestScore,
  setCharactersToPlayWith,
  stateRoundResult,
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    getCharactersToPlayWith();

    // clean-up function that runs only when this component unmounts i.e. when the user goes back to the start page
    return () => {
      setCharactersToPlayWith([]);
      setScore(0);
      setBestScore(0);
      charactersToPlayWith.forEach((character) => {
        character.clicked = false;
      });
    };
  }, []); // Empty dependency array to ensure this runs only once when the component mounts

  const handleCardClick = (character) => {
    // 1. Click disable as flipping in progress
    // Prevents the user from multiple clicks until the card flipping process is complete
    setIsClicked(true);
    if (isClicked) return;

    // 2. Update Score
    let turnResult = stateRoundResult(character); // win or lose
    setResult(turnResult);
    character.clicked = true;

    // If the user wins or loses, stop further actions
    if (turnResult !== "") {
      if (turnResult === "win") countScore();
      setIsClicked(false); //  resets the click lock, allowing the user to click again in the next round.
      return;
    }
    countScore(); // Update score since the user has clicked correctly

    // 3. Flip the card
    setIsFlipped(true); // triggers the visual card flipping effect b/z based on the isFlipped state the class in the card component is toggled
    playFlip();

    // let's try out without the setTimeout to see the difference
    // If shuffle happens after 1,3s then some cards appear without
    //flipping affect
    setTimeout(() => {
      shuffle(charactersToPlayWith);
    }, 800);
    setTimeout(() => {
      setIsFlipped(false);
      setIsClicked(false);
      playFlip();
      turnResult = "";
    }, 1300);
  };

  const restartTheGame = () => {
    setScore(0);
    setResult(""); // clear the result from the previous round ('win' or 'loss')
    charactersToPlayWith.forEach((character) => {
      character.clicked = false;
    });
    getCharactersToPlayWith();
  };

  return (
    <>
      {/* Header Component */}
      <Header
        goBackToStartPage={goBackToStartPage}
        playClick={playClick}
        score={score}
        bestScore={bestScore}
      />

      {/* Game Board with cards */}
      <motion.div
        className="playGround"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="cardSection">
          {charactersToDisplay.map((character) => {
            return (
              <Card
                key={character.id}
                character={character}
                isFlipped={isFlipped}
                handleCardClick={handleCardClick}
              />
            );
          })}
        </div>
        <div className="remainIndicator">{`${score} / ${charactersToPlayWith.length}`}</div>
      </motion.div>
      {/* Game Over Modal */}
      <AnimatePresence>
        {result != "" && (
          <GameOver
            restartTheGame={restartTheGame}
            playClick={playClick}
            result={result}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default GamePage;
