export default (message: string, type: 'error' | 'warning' | 'info' = 'error') => {
    console.log(
        `
        type: ${type}
        message: ${message}
        `
    )
}