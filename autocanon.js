'use strict'

const autocannon = require('autocannon')

async function foo () {
    const result = await autocannon({
      url: 'http://localhost/api/v1/users',
      connections: 10, //default
      pipelining: 1, // default
      duration: 50 // default
    })
    console.log(result)
}

async function bar () {
  const result = await autocannon({
    requests: [
      {
        headers:{
          "content-type":"application/json"
        },
        path: '/api/v1/users/transfer',
        method: "POST",
        body: JSON.stringify({
          "senderId": 13,
          "receiverId": 14,
          "amount": 100
        }),
      }
    ],
    connections: 30,
    pipelining: 1,
    duration: 5 // default
    ,
    url: 'http://localhost:3002'
  })
  console.log(result)
}
bar()
// foo()