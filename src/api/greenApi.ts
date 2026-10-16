import type { Credentials, DeleteNotificationResponse, ReceiveNotificationResponse, SendMessagePayload, SendMessageResponse } from "../types";

const BASE_URL = 'https://api.green-api.com';
export const greenApi = {
    sendMessage: async (credentials: Credentials, payload: SendMessagePayload): Promise<SendMessageResponse> => {
        const { idInstance, apiTokenInstance } = credentials;
        const { chatId, message } = payload;
        const response = await fetch(`${BASE_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chatId: chatId,
                message
            })
        });
        if (!response.ok) {
            throw new Error('Ошибка отправки сообщения.');
        }
        return await response.json();


    },
    receiveNotification: async (credentials: Credentials): Promise<ReceiveNotificationResponse> => {
        const { idInstance, apiTokenInstance } = credentials;
        const response = await fetch(`${BASE_URL}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`);
        if (!response.ok) {
            throw new Error('Ошиба получения сообщения');
        }
        return await response.json();
    },
    deleteNotification: async (credentials: Credentials, receiptId: number): Promise<DeleteNotificationResponse> => {
        const { idInstance, apiTokenInstance } = credentials;
        const response = await fetch(`${BASE_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error('Cooбщение не удалено');
        }
        return await response.json();
    }

}
