import { useEffect, useState } from "react";

interface Shuffle {
  shuffle: () => void;
}
const ShuffleButton = ({ shuffle }: Shuffle) => {
  return (
    <div>
      <button
        onClick={shuffle}
        className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-semibold py-2 px-4 rounded border border-gray-400 shadow"
      >
        Shuffle Tiles
      </button>
    </div>
  );
};

export default ShuffleButton;
