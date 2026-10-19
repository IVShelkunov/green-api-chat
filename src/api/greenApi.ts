import { getBaseUrl } from "../lib/utils/apiUtils";
import type { Credentials, DeleteNotificationResponse, ReceiveNotificationResponse, SendMessagePayload, SendMessageResponse, StateInstanceResponse } from "../types";

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
            throw new Error('Error sending message');
        }
        return await response.json();


    },
    receiveNotification: async (credentials: Credentials): Promise<ReceiveNotificationResponse> => {
        const { idInstance, apiTokenInstance } = credentials;
        const response = await fetch(`${BASE_URL}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`);
        if (!response.ok) {
            throw new Error('Error receiving message');
        }
        const text = await response.text();
        return text ? JSON.parse(text) : null;
    },
    deleteNotification: async (credentials: Credentials, receiptId: number): Promise<DeleteNotificationResponse> => {
        const { idInstance, apiTokenInstance } = credentials;
        const response = await fetch(`${BASE_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error('Message not deleted');
        }
        return await response.json();
    },
    getStateInstance: async (credentials: Credentials): Promise<StateInstanceResponse> => {
        const { idInstance, apiTokenInstance } = credentials;
        const isntanseBaseUrl = getBaseUrl(idInstance);
        const response = await fetch(`${isntanseBaseUrl}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`);
        if (!response.ok) {
            throw new Error('Invalid idInstance or token');
        }
        return await response.json();
    }

}
