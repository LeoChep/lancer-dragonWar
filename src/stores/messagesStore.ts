import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
interface Speaker{
  name:string
}
interface Message{
    speaker:Speaker;
    content:string;
    id:number;
    type:string;
    data:any
}
export const useMessagesStore = defineStore('messagesStore', () => {
  const messages=ref([] as Message[])
  
  function push(messageString:string,speaker?:Speaker) {
    let message={content:messageString,speaker:speaker} as Message
        console.log(message)
    message.id=messages.value.length;
    messages.value.push(message)
  }

  return { messages,push }
})
