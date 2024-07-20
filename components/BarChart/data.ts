export const data = [
  {
    department: 'FinTech',
    Fruits: getRandomNumber(),
    NonVeg: getRandomNumber(),
    Veg: getRandomNumber(),
  },
  {
    department: 'Daphe',
    Fruits: getRandomNumber(),
    NonVeg: getRandomNumber(),
    Veg: getRandomNumber(),
  },
  {
    department: 'Operation',
    Fruits: getRandomNumber(),
    NonVeg: getRandomNumber(),
    Veg: getRandomNumber(),
  },
  {
    department: 'Finance',
    Fruits: getRandomNumber(),
    NonVeg: getRandomNumber(),
    Veg: getRandomNumber(),
  },
  {
    department: 'Business',
    Fruits: getRandomNumber(),
    NonVeg: getRandomNumber(),
    Veg: getRandomNumber(),
  },
  {
    department: 'Hardware',
    Fruits: getRandomNumber(),
    NonVeg: getRandomNumber(),
    Veg: getRandomNumber(),
  },
  {
    department: 'Mugu',
    Fruits: getRandomNumber(),
    NonVeg: getRandomNumber(),
    Veg: getRandomNumber(),
  },
  {
    department: 'Other',
    Fruits: getRandomNumber(),
    NonVeg: getRandomNumber(),
    Veg: getRandomNumber(),
  },
];

function getRandomNumber() {
  return Math.floor(Math.random() * 20) + 1; // Generates a random number between 1 and 1000
}
