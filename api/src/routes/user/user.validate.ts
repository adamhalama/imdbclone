const EMAIL_TEST_EXPRESSION = new RegExp('.+\@.+\..+')

export const USER_VALIDATION_ERRORS = Object.freeze({
    INVALID_USERNAME: 'Username must be between 3 and 15 characters.',
    INVALID_EMAIL: 'Email is invalid.',
    INVALID_CREDENTIALS: 'Email or password is invalid, please try again',
    INVALID_PASSWORD: 'Password must be between 8 and 50 characters',
    NOT_MATCHING_PASSWORDS: 'Passwords do not match'
})

export const deleteAccount = (email: string) => {
    if (!isValidEmail(email)) return USER_VALIDATION_ERRORS.INVALID_EMAIL
    return null
}

export const register = (username: string, email: string, password: string, confirmPassword: string): string | null => {
    if (!isValidEmail(email)) return USER_VALIDATION_ERRORS.INVALID_EMAIL
    if (!isValidUsername(username)) return USER_VALIDATION_ERRORS.INVALID_USERNAME
    if (!isValidPassword(password)) return USER_VALIDATION_ERRORS.INVALID_PASSWORD
    if (password !== confirmPassword) return USER_VALIDATION_ERRORS.NOT_MATCHING_PASSWORDS
    return null
}

export const login = (email: string): string | null => {
    if (!isValidEmail(email)) return USER_VALIDATION_ERRORS.INVALID_EMAIL
    return null    
}

export const friends = (username1: string, username2: string) => {
    if(!isValidUsername(username1) || !isValidUsername(username2)) return USER_VALIDATION_ERRORS.INVALID_USERNAME
    return null
}

export const changePassword = (email: string, previousPassword: string, newPassword: string, confirmNewPassword: string) => {
    if (!isValidEmail(email)) return USER_VALIDATION_ERRORS.INVALID_EMAIL
    if (!isValidPassword(previousPassword) || !isValidPassword(newPassword)) return USER_VALIDATION_ERRORS.INVALID_PASSWORD  
    if (newPassword !== confirmNewPassword) return USER_VALIDATION_ERRORS.NOT_MATCHING_PASSWORDS
    return null;
}

export const changeUsername = (email: string, username: string) => {
    if (!isValidEmail(email)) return USER_VALIDATION_ERRORS.INVALID_EMAIL
    if (!isValidUsername(username)) return USER_VALIDATION_ERRORS.INVALID_USERNAME
    return null;
}

export const toplist = (email: string) => {
    if (!isValidEmail) return USER_VALIDATION_ERRORS.INVALID_EMAIL
    return null;
}

const isValidUsername = (username: string) => username && username.length > 2 && username.length < 16

const isValidPassword = (password: string) => password && password.length > 7 && password.length < 51

const isValidEmail = (email?: string) => email.length < 100 && email && EMAIL_TEST_EXPRESSION.test(email)

