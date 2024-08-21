/* enum Role {
    ADMIN = 'admin',
    USER = 'user'
} */

// для самого юзера
export interface User {
    id: string,
    username: string,
    avatar?: string
}
// для стейта
export interface UserSchema {
    authData?: User,

    _mounted?: boolean
}
