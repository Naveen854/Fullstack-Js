
const longPollingRouter = require('express').Router

const data = 'initial data'

const waitingClientsList = []

longPollingRouter.get('/',(req,res)=>{
    const lastData = req.query.lastData
    if(data !== lastData){
        data = lastData
        res.send({data})
    }else{
        waitingClientsList.push(res)
    }
})

longPollingRouter.put('/',(req,res)=>{
    const data = req.query.lastData
    while(waitingClientsList.length > 0){
        const client = waitingClientsList.pop()
        client.send({data})
    }
    res.send({message:"Success"})
})

module.exports = longPollingRouter