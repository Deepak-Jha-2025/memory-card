import { useState, useEffect, useRef } from "react";
import LoadingPage from "./pages/LoadingPage";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import Footer from "./components/Footer";
import video from "./assets/img/camp.mp4";
import backgroundMusic from "./assets/sounds/background_music.mp3";
import flipSound from "./assets/sounds/flip.mp3";
import clickSound from "./assets/sounds/click.wav";
import characters from "./characters";
import "./styles/normalize.css";
import "./styles/App.scss";

function App() {
  const [isLoadingOver, setIsLoadingOver] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isSoundPlaying, setIsSoundPlaying] = useState(true);
  const [difficultyLevel, setDifficultyLevel] = useState([]);
  const [charactersToPlayWith, setCharactersToPlayWith] = useState([]);
  const [charactersToDisplay, setCharactersToDisplay] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  // Create a reference for the audion object
  const backgroundMusicRef = useRef(null);

  useEffect(() => {
    // Initialize the background music with loop enabled
    backgroundMusicRef.current = new Audio(backgroundMusic);
    backgroundMusicRef.current.loop = true;
    backgroundMusicRef.current.volume = 0.15;
  }, []);

  // Control the background music based on the isMusicPlaying state
  useEffect(() => {
    if (isMusicPlaying) {
      backgroundMusicRef.current.play();
    } else {
      backgroundMusicRef.current.pause();
    }
  }, [isMusicPlaying]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingOver(true);
    }, 3700);
  }, []);

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
      audio.volume = 0.6;
      audio.play();
    }
  };

  const playClick = () => {
    if (isSoundPlaying) {
      const audio = new Audio(clickSound);
      audio.volume = 0.35;
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

    setCharactersToPlayWith(randomCharacters); // only after shuffling, the characters are set to play with
    shuffle(randomCharacters); // 1st shuffle will happen
  };

  const shuffle = (array) => {
    let shuffledCharacters = [];
    let clicked = 0; // A counter that tracks how many characters in the shuffled result/displayed result have already been clicked.

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
      setCharactersToDisplay(shuffledCharacters);
    }
  };

  const countScore = () => {
    setScore(score + 1);
    if (score >= bestScore) {
      setBestScore(bestScore + 1);
    }
  };

  const stateRoundResult = (character) => {
    if (character.clicked) {
      return "lose";
    }
    if (score === difficultyLevel[0] - 1) {
      return "win";
    } else {
      return "";
    }
  };

  return (
    <>
      {!isLoadingOver ? (
        <LoadingPage />
      ) : (
        <>
          {!difficultyLevel[0] ? (
            <StartPage
              setDifficultyLevel={setDifficultyLevel}
              playClick={playClick}
            />
          ) : (
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
          )}

          <Footer
            isMusicPlaying={isMusicPlaying}
            setIsMusicPlaying={setIsMusicPlaying}
            isSoundPlaying={isSoundPlaying}
            setIsSoundPlaying={setIsSoundPlaying}
            playClick={playClick}
          />
        </>
      )}

      <video autoPlay muted loop id="myVideo">
        <source src={video} type="video/mp4"/>
      </video>
    </>
  );
}

export default App;
