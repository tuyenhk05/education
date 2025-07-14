import { get, post,put } from "../untils/request";
export const getData = async (id) => {
    const result = await get(id);
    return result;
}
export const postData = async (id, body) => {
    const result = await post(id, body);
    return result;
}
export const putData = async (id, body) => {
    const result = await put(id, body);
    return result;
}
