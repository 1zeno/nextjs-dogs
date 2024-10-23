export const API_URL = "https://dogsapi.origamid.dev/json";

export const TOKEN_POST = () => {

    return {
        url: API_URL + "/jwt-auth/v1/token",
    }
}

export const USER_GET = () => {
    return {
        url: API_URL + "/api/user",
    }
}

export const TOKEN_VALIDATE_POST = () => {

    return {
        url: API_URL + "/jwt-auth/v1/token/validate"
    }
}

export const USER_POST = () => {
    return {
        url: API_URL + "/api/user",
    }
}

export const PHOTO_POST = () => {
    return {
        url: API_URL + "/api/photo",
    }
}

export const PHOTOS_GET = ({page, total, user}:{
    page: number,
    total: number,
    user?: string,
}) => {
    return {
        url: `${API_URL}/api/photo/?_page=${page}&_total=${total}&_user=${user}`,
    }
}

export const PHOTO_GET = (id: number) => {
    return {
        url: `${API_URL}/api/photo/${id}`,
    }
}

export const COMMENT_POST = (id: number) => {
    return {
        url: `${API_URL}/api/comment/${id}`,
    }
}

export const PHOTO_DELETE = (id: number) => {
    return {
        url: `${API_URL}/api/photo/${id}`,
    }
}

export const PASSWORD_LOST = () => {
    return {
        url: API_URL + "/api/password/lost",
    }
}

export const PASSWORD_RESET = () => {
    return {
        url: API_URL + "/api/password/reset",
    }
}

export const STATS_GET = () => {
    return {
        url: API_URL + "/api/stats",
    }
}
