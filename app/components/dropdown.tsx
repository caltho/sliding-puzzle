import { useState } from "react";

interface Dropdown {
  onGridSizeChange: (number: number) => void;
  gridSize: number;
}
const Dropdown = ({ onGridSizeChange, gridSize }: Dropdown) => {
  const [selectedNumber, setSelectedNumber] = useState(gridSize);

  const handleNumberChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const number = parseInt(event.target.value, 10);
    setSelectedNumber(number);
    onGridSizeChange(number);
    console.log(number);
  };
  console.log("hlello");

  const boardSizes = [];

  return (
    <select
      className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-semibold py-2 px-4 rounded border border-gray-400 shadow"
      value={selectedNumber}
      onChange={handleNumberChange}
    >
      {[2, 3, 4, 5, 6].map((number, index) => (
        <option key={number} value={number}>
          {number} x {number}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
