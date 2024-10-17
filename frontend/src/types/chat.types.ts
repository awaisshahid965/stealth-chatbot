export interface IChatMessage {
  isUser: boolean;
  text: string;
  failedProcessing?: boolean;
}

export type ChatMessages = Array<IChatMessage>
