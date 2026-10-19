export type PhoneValidationResult =
    | { isValid: true; chatId: string; error?: never }
    | { isValid: false; chatId: null; error: string };
export function formatPhoneNumber(phone: string): PhoneValidationResult {
    let digits = phone.replace(/\D/g, "");
    if (digits.length === 11 && digits.startsWith("8")) {
        digits = digits.replace(/^8/, "7");
    }
    if (digits.length < 10 || digits.length > 15) {
        return {
            isValid: false,
            chatId: null,
            error: "Enter a valid phone number",
        };
    }
    return {
        isValid: true,
        chatId: `${digits}@c.us`,
    };
}