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

foo()