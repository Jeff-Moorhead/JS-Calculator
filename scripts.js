var output = document.getElementById("output");
var lastOperation = "";
toEvaluate = "";
var buttons = document.getElementsByTagName("button")
initialValue = 0;

for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        var operation = this.getAttribute("operation");
        if (output.innerText.length > 16) {
            clearAll();
        }
        else {
            operate(operation);
        }
        console.log("To evaluate: " + toEvaluate);
        console.log("Last op: " + lastOperation);
    })
}

function operate(action) {
    switch (action) {
        case "CLR":
            clearAll(action);
            break;
        case "=":
            if (toEvaluate) {
                evaluate();
                lastOperation = action;
                break;
            }
            else {
                break;
            }
        case "sin":
        case "cos":
        case "tan":
            if (toEvaluate) {
                evaluateTrig(action);
                lastOperation = action;
                break;
            }
            else {
                break;
            }
        case "e":
            if (output.innerText == "0") {
                output.innerHTML = "e";
                toEvaluate = Math.E;
                lastOperation = action;
                break;
            }
            else if (["+", "-", "*", "/"].includes(toEvaluate[toEvaluate.length - 1])) {
                output.innerHTML += "e";
                toEvaluate += Math.E;
                lastOperation = action;
                break;
            }
            else if (toEvaluate[toEvaluate.length - 1] == ".") {
                break;
            }
            else {
                output.innerHTML += "e";
                toEvaluate *= Math.E;
                lastOperation = action;
                break;
            }
        case "pi":
            if (output.innerText == "0") {
                output.innerHTML = "&pi;";
                toEvaluate = Math.PI;
                lastOperation = action;
                break;
            }
            else if (["+", "-", "*", "/"].includes(toEvaluate[toEvaluate.length - 1])) {
                output.innerHTML += "&pi;";
                toEvaluate += Math.PI;
                lastOperation = action;
                break;
            }
            else if (toEvaluate[toEvaluate.length - 1] == ".") {
                break;
            }
            else {
                output.innerHTML += "&pi;";
                toEvaluate *= Math.PI;
                lastOperation = action;
                break;
            }
        case "sqrt":
            if (!toEvaluate) {
                break;
            }
            else if (["+", "-", "*", "/", "."].includes(lastOperation)) {
                break;
            }
            else if (toEvaluate.length > 0) {
                evaluate();
                if (toEvaluate > 0) {
                    toEvaluate = Math.round(Math.sqrt(toEvaluate) * 1000) / 1000;
                    output.innerHTML = toEvaluate;
                    lastOperation = action;
                    break;
                }
                else {
                    break;
                }
            }
            else {
                clearAll();
                break;
            }
        case "pow":
            if (!toEvaluate) {
                break;
            }
            else if (["+", "-", "*", "/", "pow"].includes(lastOperation)) {
                break;
            }
            else {
                lastOperation = action;
                toEvaluate
                break;
            }
        case "(-)":
            if (["+", "-", "*", "/"].includes(lastOperation)) {
                toEvaluate += "-"
                output.innerText += "-";
                lastOperation = action;
                break;
            }
            else if (toEvaluate[0] == "-") {
                toEvaluate = toEvaluate.slice(1);
                output.innerHTML = toEvaluate;
                lastOperation = action;
                break;
            }
            else if (toEvaluate.includes("+", "-", "*", "/")) {
                toEvaluate = evaluate() * -1;
                output.innerHTML = toEvaluate;
                lastOperation = action;
                break;
            }
            else {
                output.innerText = "-" + output.innerText;
                toEvaluate = "-" + toEvaluate;
                lastOperation = action;
                break;
            }
        case "DEL":
            if (!toEvaluate) {
                break;
            }
            else if (toEvaluate.length == 1) {
                toEvaluate = "";
                output.innerText = "0";
                break;
            }
            else if (["=", "sin", "cos", "tan", "sqrt", "log", "pow", "(-)"].includes(lastOperation)) {
                break;
            }
            else if (initialValue == output.innerText) {
                break;
            }
            else if (toEvaluate == "0") {
                break;
            }
            else if (toEvaluate == Math.PI || toEvaluate == Math.E) {
                toEvaluate = "";
                output.innerHTML = "0";
                break;
            }
            else if (lastOperation == "pi") {
                toEvaluate /= Math.PI;
                output.innerHTML = toEvaluate;
                lastOperation = toEvaluate;
                break;
            }
            else if (lastOperation == "e") {
                toEvaluate /= Math.E;
                output.innerHTML = toEvaluate;
                lastOperation = toEvaluate;
                break;
            }
            else if (toEvaluate == Math.E || toEvaluate == Math.PI) {
                toEvaluate = 0;
                output.innerHTML = toEvaluate;
                break;
            }
            else if (typeof(lastOperation) == "Number" && toEvaluate.length == 1) {
                toEvaluate = "0";
                output.innerHTML = toEvaluate;
            }
            else {
                output.innerText = output.innerText.substring(0, output.innerText.length - 1);
                toEvaluate = String(toEvaluate).substring(0, toEvaluate.length - 1);
                lastOperation = action;
                break;
            }
        case "7":
        case "8":
        case "9":
        case "4":
        case "5":
        case "6":
        case "1":
        case "2":
        case "3":
        case "0":
            if (lastOperation == "=") {
                clearAll();
                lastOperation = action;
            }
            else if (lastOperation == "pi" || lastOperation == "e") {
                break;
            }
            display(action);
            toEvaluate += action;
            lastOperation = action;
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            if (["+", "-", "*", "/"].includes(toEvaluate[toEvaluate.length - 1])) {
                break;
            }
            else if (!toEvaluate) {
                break;
            }
            else {
                display(action);
                toEvaluate += action;
                lastOperation = action;
                break;
            }
        case ".":
            if (toEvaluate[toEvaluate.length - 1] == ".") {
                break;
            }
            else {
                output.innerHTML += ".";
                toEvaluate += ".";
                lastOperation = action;
                break;
            }
    }
}

function display(str) {
    if (output.innerText == "0") {
        output.innerText = str;
    }
    else {
        output.innerText += str;
    }
}

function clearAll() {
    toEvaluate = "";
    output.innerText = "0";
}

function evaluate() {
    output.innerText = Math.round(Number(eval(toEvaluate)) * 1000) / 1000;
    toEvaluate = output.innerHTML;
    console.log("Result: " + output.innerText);
    initialValue = Number(toEvaluate);
    return toEvaluate;
}

function evaluateTrig(trigFunction) {
    result = Number(eval(toEvaluate));
    console.log(result);
    switch (trigFunction) {
        case "sin":
            toEvaluate = Math.round(Math.sin(result) * 1000) / 1000;
            output.innerHTML = toEvaluate;
            break;
        case "cos":
            toEvaluate = Math.round(Math.cos(result) * 1000) / 1000;
            output.innerHTML = toEvaluate;
            break;
        case "tan":
            if (Math.round(Math.cos(result)) == 0) {
                output.innerHTML = "&infin;";
                toEvaluate = 0;
            }
            else {
                toEvaluate = Math.round(Math.tan(result) * 1000) / 1000;
                output.innerHTML = toEvaluate;
            }
    }
}
