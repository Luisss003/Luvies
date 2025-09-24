import { useDrop } from "react-dnd";
import type { DropTargetMonitor } from "react-dnd";

type CustomPuzzleContainerProps = {
  pieces: string[];
  onDrop: (tag: string) => void;
};

function CustomPuzzleContainer({ pieces, onDrop }: CustomPuzzleContainerProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PUZZLE_PIECE",
    drop: (item: { tag: string }, monitor: DropTargetMonitor) => {
      if (monitor.didDrop()) return;
      onDrop(item.tag);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const styles: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    background: isOver
      ? "radial-gradient(circle at top left, #521a25, #8b1d1d)"
      : "radial-gradient(circle at top left, #360515ff, #630f0f)",
    border: "5px solid #4b0000",
    borderRadius: "20px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.6)",
    minHeight: "600px",
    transition: "transform 0.2s, box-shadow 0.2s",
  };

  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      style={styles}
    >
      {pieces.map((tag, i) => (
        <div
          key={i}
          style={{
            padding: "10px 15px",
            background: "#fff",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          {tag}
        </div>
      ))}
    </div>
  );
}

export default CustomPuzzleContainer;
