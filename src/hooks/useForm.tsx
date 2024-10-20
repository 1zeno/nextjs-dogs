import React from "react";

const types = {
    email: {
        regex: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
        message: "Preencha um email válido",
    },
    password: {
        regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        message: "A senha precisa ter 1 caracter maiúsculo, 1 minúsculo, 1 digito e no minimo 8 caracteres.",
    },
    number: {
        regex: /^\d+$/,
        message: "Utilize apenas números",
    },
}

const useForm = (type?: any) => {

    const [value, setValue] = React.useState("");
    const [error, setError] = React.useState(null);

    const validate = (value) => {
        if(type === false){
            return true;
        }

        if(value.length === 0 ){
            setError("Preencha um valor.");
            return false;
        }

        const currentType = types[type];
        if (currentType && !currentType.regex.test(value)) {
            setError(currentType.message);
            return false;
        }

        setError(null);
        return true;
    }

    const onChange = ({target}) => {
        if(error) {
            validate(target.value);
        }
        setValue(target.value);
    }

    return {
        value,
        setValue,
        onChange,
        error,
        validate: () => validate(value),
        onBlur: () => validate(value),
    };
}

export default useForm;