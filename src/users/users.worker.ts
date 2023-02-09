const { isMainThread, parentPort } = require("worker_threads");

if(isMainThread){
   
}
else{

    parentPort.once("message",(message)=>{
      const {usersBuffer , index} = message.workerData
      console.log({usersBuffer})
      let stringify
      for (let i = 0; i < 1000000; i++) {
        stringify += JSON.stringify( usersBuffer[index].username)
    }

      parentPort.postMessage({
        stringify: stringify,
        username: usersBuffer[index].username
      })
    })

}