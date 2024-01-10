import express from 'express'
const func=()=>{
  const app = express()
  const port = 3001
  
  app.get('/tss', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}
export {func} 
