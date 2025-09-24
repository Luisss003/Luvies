import PuzzleContainer from "./PuzzleContainer";

type PuzzleBoardProps = {
  tags: string[];
  onDrop?: (tag: string) => void; // pass down the handler
};

function PuzzleBoard({ tags, onDrop }: PuzzleBoardProps) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <PuzzleContainer tags={tags} onDrop={onDrop} />
    </div>
  );
}

export default PuzzleBoard;
