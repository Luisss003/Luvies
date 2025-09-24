// PuzzlePiece.tsx
import { useDrag } from "react-dnd";
import styles from "./PuzzlePiece.module.css";

type PuzzlePieceProps = {
  tag: string;
  onDrop?: (tag: string) => void;
};

function PuzzlePiece({ tag }: PuzzlePieceProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PUZZLE_PIECE",
    item: { tag },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      className={styles.puzzlePiece}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
      }}
    >
      <p>{tag}</p>
    </div>
  );
}

export default PuzzlePiece;
