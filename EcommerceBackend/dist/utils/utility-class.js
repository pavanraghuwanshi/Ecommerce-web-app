class ErrorHandler extends Error {
    constructor(message, stateCode) {
        super(message);
        this.message = message;
        this.stateCode = stateCode;
        this.stateCode = stateCode;
    }
}
export default ErrorHandler;
