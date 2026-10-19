import { describe, expect, test } from "vitest";
import { getBaseUrl } from "./apiUtils";

describe('Тест утилиты getBaseUrl:', () => {
    test('Возвращает правильный API URL:', () => {
        const result = getBaseUrl("710722771507");
        expect(result).toBe("https://7107.api.green-api.com");
    });
});