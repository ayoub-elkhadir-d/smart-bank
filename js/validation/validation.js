
function validateRequired(value) {
    
    if (value === undefined || value === null) {
        return false;
    }

    if (String(value).trim() === "") {
        return false;
    }

    return true;
}


function validateEmail(email) {
    
    if (typeof email !== "string" || validateRequired(email) === false) {
        return false;
    }

    
    const emailParts = email.trim().split("@");

    if (emailParts.length !== 2) {
        return false;
    }

    if (emailParts[0] === "" || emailParts[1].includes(".") === false) {
        return false;
    }

    return true;
}


function validatePassword(password) {
    if (typeof password !== "string" || validateRequired(password) === false) {
        return false;
    }

    if (password.length < 8) {
        return false;
    }

    return true;
}


function validatePhone(phone) {
    if (typeof phone !== "string" || validateRequired(phone) === false) {
        return false;
    }

    
    const phoneWithoutSpaces = phone.replace(/[\s-]/g, "");
    const phoneWithoutPlus = phoneWithoutSpaces.replace("+", "");

    
    if (phoneWithoutPlus === "" || /^\d+$/.test(phoneWithoutPlus) === false) {
        return false;
    }

    
    if (phoneWithoutPlus.length < 9 || phoneWithoutPlus.length > 15) {
        return false;
    }

    return true;
}


function validateRegisterForm(formData) {
    if (formData === undefined || formData === null) {
        return false;
    }

    if (validateRequired(formData.firstName) === false) {
        return false;
    }

    if (validateRequired(formData.lastName) === false) {
        return false;
    }

    if (validateEmail(formData.email) === false) {
        return false;
    }

    if (validatePhone(formData.phone) === false) {
        return false;
    }

    if (validatePassword(formData.password) === false) {
        return false;
    }

    if (formData.password !== formData.confirmPassword) {
        return false;
    }

    return true;
}


function validateLoginForm(formData) {
    if (formData === undefined || formData === null) {
        return false;
    }

    if (validateEmail(formData.email) === false) {
        return false;
    }

    if (validateRequired(formData.password) === false) {
        return false;
    }

    return true;
}

export {
    validateEmail,
    validatePassword,
    validatePhone,
    validateRequired,
    validateRegisterForm,
    validateLoginForm
};
