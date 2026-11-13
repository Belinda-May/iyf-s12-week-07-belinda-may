
function removeDuplicates(numbers) {
  return [...new Set(numbers)];
}

const numbers = [1, 2, 2, 3, 4, 4, 5];

console.log(removeDuplicates(numbers));
