const toQuarter = num => Math.round(num * 4) / 4;
const toHalf = num => Math.round(num * 2) / 2;

const round = {
  in: toQuarter,
  cm: toHalf,
  lbs: Math.round,
  kg: toHalf,
};

const conversions = {
  in: cm => round.in(cm / 2.54),
  cm: inches => round.cm(inches * 2.54),
  lbs: kg => round.lbs(kg * 2.20462),
  kg: lbs => round.kg(lbs / 2.20462),
};

const shirtSize = index => {
  const baseSizes = ['XS', 'S', 'M', 'L', 'XL'];
  const allSizes = [];
  baseSizes.forEach((size, i) => {
    allSizes.push(size);
    if (baseSizes[i + 1]) allSizes.push(`${size}-${baseSizes[i + 1]}`);
  });
  // console.log(allSizes, index * 2);
  return allSizes[index * 2];
};

export { conversions, shirtSize };
