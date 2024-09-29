import { useState, useEffect } from "react";
import GamePage from "./pages/GamePage";
import Footer from "./components/Footer";
import video from "./assets/img/camp.mp4";
import backgroundMusic from "./assets/sounds/background_music.mp3";
import flipSound from "./assets/sounds/flip.mp3";
import clickSound from "./assets/sounds/click.wav";
import characters from "./characters";

function App({}) {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isSoundPlaying, setIsSoundPlaying] = useState(true);
  const [difficultyLevel, setDifficultyLevel] = useState([]);
  const [charactersToPlayWith, setCharactersToPlayWith] = useState([]);

  const goBackToStartPage = () => {
    // everytime user goes back to the start page/restarts the game, reset the difficulty level
    setDifficultyLevel([]);
    charactersToPlayWith.forEach((character) => {
      // some characters may have been clicked, i.e. clicked state = true, reset them back to unclicked state (false)
      character.clicked = false;
    });
  };

  const playFlip = () => {
    if (isSoundPlaying) {
      const audio = new Audio(flipSound);
      audio.volume = 0.2;
      audio.play();
    }
  };

  const playClick = () => {
    if (isSoundPlaying) {
      const audio = new Audio(clickSound);
      audio.volume = 0.07;
      audio.play();
    }
  };

  const getCharactersToPlayWith = () => {
    let randomCharacters = [];

    while (randomCharacters.length < difficultyLevel[0]) {
      const randNum = Math.floor(Math.random() * 10);
      if (!randomCharacters.includes(characters[randNum])) {
        randomCharacters.push(characters[randNum]);
      }
    }

    setCharactersToPlayWith(randomCharacters);
    shuffle(randomCharacters);
  };

  const shuffle = (array) => {
    let shuffledCharacters = [];
    let clicked = 0; // A counter that tracks how many characters in the shuffled result have already been clicked.

    while (shuffledCharacters.length < difficultyLevel[1]) {
      const randNum = Math.floor(Math.random() * array.length);
      const character = array[randNum];
      if (
        !shuffledCharacters.includes(character) &&
        (clicked < difficultyLevel[1] - 1 || !character.clicked)
      ) {
        shuffledCharacters.push(character);
        clicked += +character.clicked;
      }
    }
  };

  const countScore = () => {
    setScore(score + 1);
    if (score >= bestScore) {
      setBestScore(bestScore + 1);
    }
  };

  const steteRoundResult = (character) => {
    // write the logic after understanding the handleCardClick
    // and corresponding fncs that happen before this fnc in 
    // the GamePage.jsx component
  }

  return (
    <>
      <GamePage
        goBackToStartPage={goBackToStartPage}
        playClick={playClick}
        playFlip={playFlip}
        getCharactersToPlayWith={getCharactersToPlayWith}
        setCharactersToPlayWith={setCharactersToPlayWith}
        setCharactersToDisplay={setCharactersToDisplay}
        charactersToPlayWith={charactersToPlayWith}
        charactersToDisplay={charactersToDisplay}
        shuffle={shuffle}
        score={score}
        setScore={setScore}
        bestScore={bestScore}
        setBestScore={setBestScore}
        countScore={countScore}
        stateRoundResult={stateRoundResult}
      />
      <Footer
        isMusicPlaying={isMusicPlaying}
        setIsMusicPlaying={setIsMusicPlaying}
        isSoundPlaying={isSoundPlaying}
        setIsSoundPlaying={setIsSoundPlaying}
        playClick={playClick}
      />
    </>
  );
}

export default App;
