import MabelInfo from "./MabelInfo";
import Volume from "../assets/img/volume.svg?react";
import VolumeOff from "../assets/img/volume_off.svg?react";
import Music from "../assets/img/music_sign.svg?react";
import MusicOff from "../assets/img/music_off.svg?react";
import QuestionMark from "../assets/img/question_mark.svg?react";
import Cross from "../assets/img/cross.svg?react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import "../styles/Footer.scss";

function Footer({
  isMusicPlaying,
  setIsMusicPlaying,
  isSoundPlaying,
  setIsSoundPlaying,
  playClick,
}) {

  // It tracks whether the "info" (likely a help section or additional information) needs to be shown.
  const [isInfoNeeded, setIsInfoNeeded] = useState(false);

  return (
    <motion.footer
      initial={{opacity: 0, y: 100}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.7}}
    >
      <div className="footerContainer">
        <div className="soundSection">
          <button onClick={() => {
            // setIsSoundPlaying(!isSoundPlaying);
            setIsSoundPlaying((prevSoundPlayingState) => !prevSoundPlayingState); // Better practice
            playClick();
          }}>
            {isSoundPlaying
              ? <Volume className='svg'/>
              : <VolumeOff className='svg'/>}
          </button>
          
          <button onClick={() => {
            // setIsMusicPlaying(!isMusicPlaying);
            setIsMusicPlaying((prevMusicPlayingState) => !prevMusicPlayingState);
            playClick();
          }}>
            {isMusicPlaying
              ? <Music className='svg'/>
              : <MusicOff className='svg'/>}
          </button>
        </div>
        <button onClick={() => {
          // setIsInfoNeeded(!isInfoNeeded);
          setIsInfoNeeded((prevInfoNeededState) => !prevInfoNeededState);
          playClick();
        }}>
              {isInfoNeeded
                ? <Cross className='svg'/>
                : <QuestionMark className='svg'/>}
        </button>
        <AnimatePresence>
                {isInfoNeeded && (
                  <MabelInfo />
                )}
        </AnimatePresence>
      </div>
    </motion.footer>
  );
}

export default Footer;
