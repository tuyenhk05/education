const isLogin = (id) => {
    return {
        type: "isLogin",
        id: id,
       
    }
}

const lockout = () => {
    return {
        type: "lockout",
       
    }
}
export { isLogin, lockout };

