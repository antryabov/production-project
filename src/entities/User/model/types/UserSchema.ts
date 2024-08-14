// для самого юзера
export interface User {
    id: string,
    username: string
}
// для стейта
export interface UserSchema {
    authData?: User,

    _mounted?: boolean
}
