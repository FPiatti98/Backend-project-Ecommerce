export default class CustomError {
    static createError({name, cause, message, code}) {
        const error = new Error(message, {cause: new Error(cause)});
        error.name= name;
        error.code= code;
        error.cause= cause
        console.error("Error detectado entrando al Error Handler");
        console.error(error.cause);
        throw error;
    };
}