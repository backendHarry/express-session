const {
  uniqueNamesGenerator,
  NumberDictionary,
  adjectives,
} = require("unique-names-generator");

const usernameGenerator = (initialUsername) => {
  const number = NumberDictionary.generate({ min: 100, max: 999 });
  return `Suggested username of ${initialUsername}${uniqueNamesGenerator({
    dictionaries: [adjectives, number],
    length: 2,
    seperator: "",
    style: "capital",
  })}`;
};

module.exports = usernameGenerator;
