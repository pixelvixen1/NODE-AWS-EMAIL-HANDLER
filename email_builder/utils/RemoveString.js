// String Proptotype Method - remove nth occurance of a string/word from a string
removeStr = function (str, num) {
  if (!this.includes(str)) {
    return -1;
  }
  let start = 0;
  let end = str.length;
  let occurences = 0;
  while (end < this.length) {
    if (this.substring(start, end) === str) {
      occurences += 1;
    }
    if (occurences === num) {
      return this.substring(0, start) + this.substring(end, this.length);
    }
    end += 1;
    start += 1;
  }
  return -1;
};

// eslint-disable-next-line no-extend-native
String.prototype.removeStr = removeStr;

module.exports = removeStr;
