const Blockchain = require('./blockchain')

const bitcoin = new Blockchain()

// bitcoin.createNewBlock(2389, "PODIODSIOFDIO320", "3280KJLDKFJLDF80");
// bitcoin.createNewBlock(111, "PODIODS12IOFDIO320", "3280KJLD45KFJLDF80");
// bitcoin.createNewBlock(2889, "PODSADFIODSIOFDIO320", "3280KJLDKFJ0980LDF80");

// bitcoin.createNewBlock(2389, "PODIODSIOFDIO320", "3280KJLDKFJLDF80");
// bitcoin.createNewTransaction(100, "0xfadafsdaf", "0xfbadjflasjfpso");

const bh = bitcoin.proofOfWork('ASDFFSJLKJL9879', [
  { amount: 10, sender: 'SADFSDF789', receipient: 'DSAFSDAF423243' },
  { amount: 30, sender: 'SADFSDF7SADF89', receipient: 'DSAFSD234AF423243' },
  {
    amount: 200,
    sender: 'SADFSDFSADF890789',
    receipient: 'DSA3248FSDAF423243'
  }
])

console.log(bh)
