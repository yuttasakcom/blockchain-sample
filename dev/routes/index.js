const router = require('express').Router()

const uuid = require('uuid/v1')

const Blockchain = require('../blockchain')
const bitcoin = new Blockchain()
const nodeAddress = uuid()
  .split('-')
  .join('')

router.get('/', (_, res) => res.send('Welcome to Blockchain'))

router.get('/blockchain', (req, res) => {
  res.send(bitcoin)
})

router.post('/transaction', (req, res) => {
  const { amount, sender, recipient } = req.body
  bitcoin.createNewTransaction(amount, sender, recipient)
  res.json({ success: true })
})
router.get('/mine', (req, res) => {
  const lastBlock = bitcoin.getLastBlock()
  const previousBlockHash = lastBlock['hash']
  const currentBlockData = {
    transaction: bitcoin.pendingTransactions,
    index: lastBlock['index'] + 1
  }
  const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData)
  const blockHash = bitcoin.hashBlock(
    previousBlockHash,
    currentBlockData,
    nonce
  )

  bitcoin.createNewTransaction(12.5, '00', nodeAddress)

  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash)

  res.json({ success: true, data: newBlock })
})

module.exports = router
