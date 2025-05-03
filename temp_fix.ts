import { deleteMessagesIncludingAndAfter } from "./db/messages";

async function testFunction() {
  const chatId = "123";
  const sequenceNumber = 1;
  
  // This should take exactly two parameters
  await deleteMessagesIncludingAndAfter(chatId, sequenceNumber);
} 