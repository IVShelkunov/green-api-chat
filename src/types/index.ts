export interface Credentials {
    idInstance: string;
    apiTokenInstance: string;
}
export interface SendMessagePayload {
    chatId: string;
    message: string;
}
export interface SendMessageResponse {
    idMessage: string;
}
interface IncomingMessage {
    typeWebhook: string;
    instanceData: {
        idInstance: number;
        wid: string;
        typeInstance: string;
    };
    timestamp: number;
    idMessage: string;
    senderData: {
        chatId: string;
        chatName: string;
        chatType: string;
        sender: string;
        senderName: string;
        senderType: string;
        senderContactName: string;
        senderPhoneNumber: number;
    };
    messageData: {
        typeMessage: string;
        textMessageData: {
            textMessage: string;
        };
    };
}

export interface NotificationPayload {
    receiptId: number;
    body: IncomingMessage;
}

export type ReceiveNotificationResponse = NotificationPayload | null;
export interface DeleteNotificationResponse {
    result: boolean;
    reason?: string;
}

