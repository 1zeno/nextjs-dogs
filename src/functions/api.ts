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

export const TOKEN_VALIDATE_POST = (token) => {

    return {
        url: API_URL + "/jwt-auth/v1/token/validate",
        options: {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    }
}

export const USER_POST = () => {
    return {
        url: API_URL + "/api/user",
    }
}

export const PHOTO_POST = (formData, token) => {
    return {
        url: API_URL + "/api/photo",
        options: {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        },
    }
}

export const PHOTOS_GET = ({page, total, user}:{
    page: number,
    total: number,
    user?: number,
}) => {
    return {
        url: `${API_URL}/api/photo/?_page=${page}&_total=${total}&_user=${user}`,
    }
}

export const PHOTO_GET = (id) => {
    return {
        url: `${API_URL}/api/photo/${id}`,
        options: {
            method: "GET",
        },
    }
}

export const COMMENT_POST = (id, body) => {
    return {
        url: `${API_URL}/api/comment/${id}`,
        options: {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
            body: JSON.stringify(body),
        },
    }
}

export const PHOTO_DELETE = (id, token) => {
    return {
        url: `${API_URL}/api/photo/${id}`,
        options: {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        },
    }
}

export const PASSWORD_LOST = () => {
    return {
        url: API_URL + "/api/password/lost",
    }
}

export const PASSWORD_RESET = (body) => {
    return {
        url: API_URL + "/api/password/reset",
        options: {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }
    }
}

export const STATS_GET = (token) => {
    return {
        url: API_URL + "/api/stats",
        options: {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    }
}
