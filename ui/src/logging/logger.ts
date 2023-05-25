import isDevelopment from "../isDevelopment"

export default (message: unknown) => {
    if (isDevelopment()) console.log(message)
} 