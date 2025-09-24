import { useState } from "react";
import Header from '../layout/Header.tsx';
import Footer from '../layout/Footer.tsx';
import styles from './CraftPuzzleTag.module.css';

import PuzzleBoard from '../components/PuzzleBoard.tsx';
import CustomPuzzleContainer from '../components/CustomPuzzleContainer.tsx';

export const CraftPuzzleTag = () => {
  const initialTags = [
    "Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", 
    "Thriller", "Fantasy", "Documentary", "Animation", "Adventure", 
    "Mystery", "Crime", "Musical", "War", "Western", "Biography",
  ];

  const [availableTags, setAvailableTags] = useState<string[]>(initialTags);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleDrop = (tag: string) => {
    setAvailableTags(prev => prev.filter(t => t !== tag));
    setSelectedTags(prev => [...prev, tag]);
  };

  return (
    <>
      <Header />
      <div className={styles.threeColumnLayout}>
        <div className={styles.column}>
          <h2>Explore 20 Puzzle Pieces</h2>
          <PuzzleBoard tags={availableTags} />
        </div>

        <div className={styles.column}>
          <h2>Your Filters</h2>
          <CustomPuzzleContainer pieces={selectedTags} onDrop={handleDrop} />
        </div>

        <div className={styles.column}>
          <h2>Your Matching Films...</h2>
        </div>
      </div>
      <Footer />
    </>
  );
};
