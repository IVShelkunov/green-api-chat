export const getBaseUrl = (idInstanse: string) => {
    const host = idInstanse.slice(0, 4);
    return `https://${host}.api.green-api.com`;
}