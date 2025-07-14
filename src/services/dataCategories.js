import { get, post, put } from "../untils/request";
export const getCategories = async (body) => {
    const result = await get(`categories/${body}`);
    return result;
}
export const getAllCategories = async () => {
    const result = await get(`categories`);
    return result;
}
export const postUser = async (body) => {
    const result = await post(`users`, body);
    return result;
}
export const putData = async (id, body) => {
    const result = await put(id, body);
    return result;
}
