import { describe, expect, test } from "vitest";
import { formatPhoneNumber } from "./phone";

describe('Тест утилиты formatPhoneNumber:', () => {

    test('Очистка от пробелов и скобок:', () => {
        const result = formatPhoneNumber("+7 (995) 123-45-67");
        expect(result.chatId).toBe("79951234567@c.us");
    });
    test('Замена 8 на 7:', () => {
        const result = formatPhoneNumber("89991234567");
        expect(result.chatId).toBe("79991234567@c.us");
    });
    test('Слишком короткий:', () => {
        const result = formatPhoneNumber("123");
        expect(result.isValid).toBe(false);
    });
    test('Слишком длинный:', () => {
        const result = formatPhoneNumber("899912345673092092333");
        expect(result.isValid).toBe(false);
    });

});