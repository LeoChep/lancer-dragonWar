
import { EasyServer } from './src/server/easyServer';
import express from 'express'
import * as WebSocket  from 'ws';
const func=()=>{
  const app = express()
  const port = 3001
  
  app.get('/*', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  const server = new WebSocket.WebSocketServer({ port: 12010 })
  const esayServerIns= new EasyServer()
  const clientsMap=new Map<String,WebSocket.WebSocket>()
  server.on('connection', (ws) => {
    console.log('client connected');

    const wsReplay=(msg: string, id: string) => {
      console.log("wsRepl",msg,id)
      // console.log(clientsMap)
     const conn= clientsMap.get(id);
      conn?.send(msg);
    };
    esayServerIns.reply=wsReplay;
    ws.on('message', (data, isBinary) => {
        console.log('Message from client ', isBinary ? data : data.toString());
        try {
          const dataObj=JSON.parse( data.toString());
          if (dataObj.isRegister&&dataObj.id){
             clientsMap.set(dataObj.id,ws);
             esayServerIns.addClint(dataObj.id);
          }
          esayServerIns.recive(dataObj.msg,dataObj.id)
        }
        catch(e){}
        setTimeout(() => {
          ws.send('delay sendback message');
        }, 2000);
      });
  });

  
}
export {func} 
