const sort = (array) => {
  return array.sort((a, b) => a - b);
};

const removeDupes = (array) => {
  let dupesFree = [];
  array.forEach((val) => {
    if (!dupesFree.includes(val)) {
      dupesFree.push(val);
    }
  });
  return dupesFree;
};

export const handler = (array) => {
  let tempA = sort(array);
  return removeDupes(tempA);
};
