let messageIdCounter = 0;
export const generateMessageId = () => `msg-${++messageIdCounter}`;