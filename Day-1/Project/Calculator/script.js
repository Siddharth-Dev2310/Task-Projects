class Calculator{
    constructor () {
        this.currentInput = '',
        this.prevInput = '',
        this.operation = undefined
    }

    appendNumber(number){

        if( number === '.' && this.currentInput.includes('.') ) return;

        this.currentInput = this.currentInput.toString() + number.toString();

    }

    chooesOperation(operation){
        if(this.currentInput === '') return

        if(this.prevInput !== ''){
            this.calculate();
        }

        this.operation = operation;
        this.prevInput = this.currentInput;
        this.currentInput = ''
    }

    calculate(){
        let computation;
        const prev = parseFloat(this.prevInput);
        const current = parseFloat(this.currentInput);

        if(isNaN(prev)  && isNaN(current)) {
            console.log("Please Enter The Values");
            return;
        }

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            
            case '-':
                computation = prev - current;
                break;

            case '*':
                computation = prev * current;
                break;

            case '/':
                computation = prev / current;
                break;

            case '%':
                computation = prev % current;
                break;
        
            default:
                return
        }

        this.currentInput = computation;
        this.operation = undefined;
        this.prevInput = '';
    }

    clearInput(){
        this.currentInput = '';
        this.prevInput = '';
        this.operation = undefined;
    }
}

const calculator = new Calculator;

calculator.appendNumber(20);
calculator.chooesOperation('+');
calculator.appendNumber(20);
calculator.calculate();