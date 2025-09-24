import PuzzlePiece from "./PuzzlePiece";
import styles from "./PuzzleContainer.module.css";

export type PuzzleContainerProps = {
  tags: string[];
  onDrop?: (tag: string) => void; // ✅ add this here
};

function PuzzleContainer({ tags, onDrop }: PuzzleContainerProps) {
  return (
    <div className={styles.puzzleContainer}>
      {tags.map((tag, index) => (
        <div key={index} className="puzzlePieceWrapper">
          <PuzzlePiece tag={tag} onDrop={onDrop} />
        </div>
      ))}
    </div>
  );
}

export default PuzzleContainer;
