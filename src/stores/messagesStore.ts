import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
interface Message{
    content:string;
    id:number;
}
export const useMessagesStore = defineStore('messagesStore', () => {
  const messages=ref([] as Message[])
  
  function push(messageString:string) {
    let message={content:messageString} as Message
    message.id=messages.value.length;
    messages.value.push(message)
  }

  return { messages,push }
})
