export enum placements {
    TOP = "top",
    RIGHT = "right",
    BOTTOM = "bottom",
    LEFT = "left",
}

export enum roles {
    USER = "ROLE_USER",
    MANAGER = "ROLE_MANAGER",
    ADMIN = "ROLE_ADMIN"
}

export type SpringResponseType<T> = {
    data: T
}

export type ResponseMessageType = {
    message: string
    status: string
}