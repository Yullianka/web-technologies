const BASE_URL = "http://localhost:1337";
const RESOURSE_URL = `${BASE_URL}/books`;

const baseRequest = async ({ urlPath = "", method = "GET", body = null }) => {
    try {
        const reqParams = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (body) {
            reqParams.body = JSON.stringify(body);
        }

        return await fetch(`${RESOURSE_URL}${urlPath}`, reqParams);
    } catch (error) {
        console.error("HTTP ERROR: ", error);
    }
};

export const getAllBooks = async () => {
    const rawResponse = await baseRequest({ method: "GET" });
    return await rawResponse.json();
};

export const postBook = (body) => baseRequest({ method: "POST", body });

export const updateBook = (id, body) =>
    baseRequest({ urlPath: `/${id}`, method: "PATCH", body });

export const deleteBook = (id) =>
    baseRequest({ urlPath: `/${id}`, method: "DELETE" });


export const searchBooks = async (query) => {
    const rawResponse = await baseRequest({ urlPath: `/search?query=${query}`, method: "GET" });
    return await rawResponse.json();
};


export const sortBooksByPrice = async () => {
    const rawResponse = await baseRequest({ urlPath: "/sort/price", method: "GET" });
    return await rawResponse.json();
};


export const sortBooksByPages = async () => {
    const rawResponse = await baseRequest({ urlPath: "/sort/pages", method: "GET" });
    return await rawResponse.json();
};













