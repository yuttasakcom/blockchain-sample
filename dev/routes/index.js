const router = require('express').Router()

const uuid = require('uuid/v1')
const axios = require('axios')

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

router.post('/register-and-broadcast-node', (req, res) => {
  const { newNodeUrl } = req.body

  if (bitcoin.netWorkNodes.indexOf(newNodeUrl) === -1) {
    bitcoin.netWorkNodes.push(newNodeUrl)
  }

  const regNodePromises = []
  bitcoin.networkNodes.forEach(networkNodeUrl => {
    regNodePromises.push(
      axios.post(networkNodeUrl + '/register-node', { newNodeUrl })
    )
  })

  Promise.all(regNodePromises)
    .then(() => {
      return axios.post(newNodeUrl + '/register-nodes-bulk', {
        allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl]
      })
    })
    .then(() => {
      res.json({ success: true })
    })
    .catch()
})

router.post('/register-node', (req, res) => {
  const { newNodeUrl } = req.body
  const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) === -1
  const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl

  if (nodeNotAlreadyPresent && notCurrentNode) {
    bitcoin.networkNodes.push(newNodeUrl)
  }

  res.json({ success: true })
})

router.post('/register-nodes-bulk', (req, res) => {})

module.exports = router
