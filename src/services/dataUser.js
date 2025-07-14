import { get, post,put,patch } from "../untils/request";
export const getUser = async (body) => {
    const result = await get(`users/${body}`);
    return result;
}
export const postUser = async (body) => {
    const result = await post(`users`, body);
    return result;
}
export const putUser = async (id, body) => {
    const result = await put(`users/${id}`, body);
    return result;
}
export const patchUser = async (id, body) => {
    const result = await patch(`users/${id}`, body);
    return result;
}