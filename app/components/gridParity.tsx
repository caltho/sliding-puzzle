export default function checkParity(grid: number[][]) {
  const countInversions = (arr: number[]) => {
    let count = 0;
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = i + 1; j < n; j++) {
        if (arr[i] > arr[j]) {
          count++;
        }
      }
    }
    return count;
  };

  const nInversions = countInversions(grid.flat());

  console.log(grid);
  console.log(grid.length % 2 === 0 ? "even-sized board" : "odd-sized board");
  console.log("Inversions", nInversions);

  if (grid.length % 2 === 0) {
    //even-sized board
    return nInversions % 2 === 0 ? true : false;
  } else {
    //odd-sized board
    return nInversions % 2 === 0 ? true : false;
  }
}
