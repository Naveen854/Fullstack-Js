
const shortPollingRouter = require('express').Router

const data = 'initial data'

shortPollingRouter.get('/',(req,res)=>{
    const lastData = req.query.lastData
    if(data !== lastData){
        data = lastData
        res.send({data})
    }else{
        waitingClientsList.push(res)
    }
})

shortPollingRouter.put('/',(req,res)=>{
    const data = req.query.lastData
    while(waitingClientsList.length > 0){
        const client = waitingClientsList.pop()
        client.send({data})
    }
    res.send({message:"Success"})
})

module.exports = shortPollingRouter