import { get, post, put } from "../untils/request";
export const getCourseById = async (body) => {
    const result = await get(`products/${body}`);
    return result;
}
export const getAllCourses = async () => {
    const result = await get(`products`);
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
