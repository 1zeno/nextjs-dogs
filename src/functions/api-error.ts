export default function apiError(error: unknown): {
    data: null;
    ok: false;
    error: string;
} {
    if(error instanceof Error){
        return {
            data: null,
            ok: false,
            error: error.message,
        };
    }
    return {
        data: null,
        ok: false,
        error: "Erro desconhecido.",
    };
}