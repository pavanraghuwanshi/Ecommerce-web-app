

class ErrorHandler extends  Error{

    constructor(public message: string, public stateCode: number){

        super(message);
        this.stateCode = stateCode;
    }
}

export default ErrorHandler;