const Blockchain = require("./blockchain");

const bitcoin = new Blockchain();

// bitcoin.createNewBlock(2389, "PODIODSIOFDIO320", "3280KJLDKFJLDF80");
// bitcoin.createNewBlock(111, "PODIODS12IOFDIO320", "3280KJLD45KFJLDF80");
// bitcoin.createNewBlock(2889, "PODSADFIODSIOFDIO320", "3280KJLDKFJ0980LDF80");

bitcoin.createNewBlock(2389, "PODIODSIOFDIO320", "3280KJLDKFJLDF80");
bitcoin.createNewTransaction(100, "0xfadafsdaf", "0xfbadjflasjfpso");

console.log(bitcoin);
