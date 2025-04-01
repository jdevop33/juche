import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
  </svg>
);

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
  </svg>
);

interface Song {
  title: string;
  artist: string;
  file: string;
}

const TraditionalMusicPlayer: React.FC = () => {
  const { t } = useTranslation('common');
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // This 'songs' array depends on the 't' function from useTranslation
  const songs: Song[] = [
    { title: t('traditionalMusic.song1.title'), artist: t('traditionalMusic.song1.artist'), file: '/audio/arirang.mp3' },
    { title: t('traditionalMusic.song2.title'), artist: t('traditionalMusic.song2.artist'), file: '/audio/doraji-taryeong.mp3' },
    { title: t('traditionalMusic.song3.title'), artist: t('traditionalMusic.song3.artist'), file: '/audio/ganggangsullae.mp3' },
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = songs[currentSongIndex].file;
      if (isPlaying) {
        // Ensure play() is called only after src is potentially updated
        audioRef.current.play().catch(error => console.error("Audio play failed:", error));
      } else {
        // Explicitly pause if isPlaying becomes false
        audioRef.current.pause();
      }
    }
    // Add 'songs' to the dependency array
  }, [currentSongIndex, isPlaying, songs]); // <-- FIX: Added 'songs' here

  const togglePlayPause = () => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    if (isPlaying) {
      audioElement.pause();
    } else {
      // Load the source if it's not loaded or has changed
      if (audioElement.currentSrc !== songs[currentSongIndex].file) {
         audioElement.src = songs[currentSongIndex].file;
      }
      audioElement.play().catch(error => console.error("Audio play failed on toggle:", error));
    }
    // Let the audio element's event handlers update state
    // setIsPlaying(!isPlaying); // Remove this, let onPlay/onPause handle it
  };

  const playNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    // Keep playing if it was playing
  };

  const playPrevSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
     // Keep playing if it was playing
  };

  // Added effect to handle isPlaying state based on audio events
  useEffect(() => {
      const audioElement = audioRef.current;
      if (!audioElement) return;

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      audioElement.addEventListener('play', handlePlay);
      audioElement.addEventListener('pause', handlePause);
      // audioElement.addEventListener('ended', playNextSong); // Use onEnded prop instead

      return () => {
          audioElement.removeEventListener('play', handlePlay);
          audioElement.removeEventListener('pause', handlePause);
         // audioElement.removeEventListener('ended', playNextSong);
      };
  }, [playNextSong]); // Re-attach if playNextSong changes (it shouldn't here, but good practice)


  return (
    <section className="my-16" aria-labelledby="traditional-music-title">
      <h2 id="traditional-music-title" className="text-3xl font-bold text-center mb-8 text-juche-blue"> {/* Ensure text-juche-blue is defined in Tailwind config */}
        {t('traditionalMusic.title')}
      </h2>
      {/* Ensure juche colors are defined */}
      <div className="max-w-md mx-auto bg-light-beige rounded-lg shadow-lg p-6"> {/* Changed bg-juche-white to bg-light-beige based on your config */}
        <div className="text-center mb-6">
          <motion.h3
            key={currentSongIndex} // Ensures animation runs on change
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} // Added transition duration
            className="text-2xl font-bold text-dancheong-red mb-2" // Changed text-juche-red to text-dancheong-red
          >
            {songs[currentSongIndex].title}
          </motion.h3>
          {/* Changed text-juche-dark-gray to text-dark-grey */}
          <p className="text-lg text-dark-grey">{songs[currentSongIndex].artist}</p>
        </div>
        <div className="flex justify-center items-center space-x-4">
          {/* Previous button needs unique text or aria-label if text is the same */}
           <button
            onClick={playPrevSong}
            className="bg-dancheong-blue text-light-beige p-3 rounded-full hover:bg-earth-yellow hover:text-dancheong-blue transition duration-300"
             aria-label={t('traditionalMusic.prevSong', 'Previous Song')} // Added aria-label
          >
             {/* SVG for Previous or use text */}
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M20.25 12a.75.75 0 0 1-.75.75H6.31l5.47 5.47a.75.75 0 1 1-1.06 1.06l-6.75-6.75a.75.75 0 0 1 0-1.06l6.75-6.75a.75.75 0 1 1 1.06 1.06l-5.47 5.47H19.5a.75.75 0 0 1 .75.75Z" clipRule="evenodd" /></svg>
          </button>
          <button
            onClick={togglePlayPause}
            className="bg-dancheong-red text-light-beige p-4 rounded-full hover:bg-earth-yellow hover:text-dancheong-blue transition duration-300"
            aria-label={isPlaying ? t('traditionalMusic.pause', 'Pause') : t('traditionalMusic.play', 'Play')}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
           <button
            onClick={playNextSong}
            className="bg-dancheong-blue text-light-beige p-3 rounded-full hover:bg-earth-yellow hover:text-dancheong-blue transition duration-300"
            aria-label={t('traditionalMusic.nextSong', 'Next Song')} // Added aria-label
          >
            {/* SVG for Next or use text */}
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M3.75 12a.75.75 0 0 1 .75-.75h13.19l-5.47-5.47a.75.75 0 0 1 1.06-1.06l6.75 6.75a.75.75 0 0 1 0 1.06l-6.75 6.75a.75.75 0 1 1-1.06-1.06l5.47-5.47H4.5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" /></svg>
          </button>
        </div>
        <audio
          ref={audioRef}
          onEnded={playNextSong} // Correctly handles song end
          // onPlay and onPause listeners are now set up in useEffect
          className="hidden" // Hide default audio player controls
        />
      </div>
    </section>
  );
};

export default TraditionalMusicPlayer;
