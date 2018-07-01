var res = document.getElementById("res");

function isValid() {
    if(res.innerHTML.endsWith('+') || res.innerHTML.endsWith('-') ||
       res.innerHTML.endsWith('*') || res.innerHTML.endsWith('/')) {
        return false;
    }
    return true;
}

function clickDigit(e) {
    var src = e.target || e.srcElement;
    var btn = document.getElementById(src.id);    
    res.innerHTML += btn.innerHTML;
}

function clearInput() {
    res.innerHTML = '';
}

function clickOperator(e) {
    var src = e.target || e.srcElement;
    var btn = document.getElementById(src.id);
    if(res.innerHTML.length != 0 && isValid())
        res.innerHTML += btn.innerHTML;
}

function calculate() {
    if(isValid()){
        let reg1 = /\d+/g;
        let reg2 = /[\+\-\*\/]+/g;
        let oprands = res.innerHTML.match(reg1);
        console.log(oprands);
        let operators = res.innerHTML.match(reg2);
        console.log(operators);
        while(operators.length > 0){
            if(operators.includes('*')) {
                let indexMul = operators.indexOf('*');
                let mul = parseInt(oprands[indexMul],2) 
                        * parseInt(oprands[indexMul + 1],2);
                oprands.splice(indexMul,2);
                oprands.splice(indexMul,0,mul.toString(2));
                operators.splice(indexMul,1);
            }
            else if(operators.includes('/')) {
                let indexDiv = operators.indexOf('/');
                let div = parseInt(oprands[indexDiv],2) 
                        / parseInt(oprands[indexDiv + 1],2);
                div = Math.floor(div);
                oprands.splice(indexDiv,2);
                oprands.splice(indexDiv,0,div.toString(2));
                operators.splice(indexDiv,1);
            }
            else if(operators.includes('+')) {
                let indexAdd = operators.indexOf('+');
                let add = parseInt(oprands[indexAdd],2) 
                        + parseInt(oprands[indexAdd + 1],2);
                oprands.splice(indexAdd,2);
                oprands.splice(indexAdd,0,add.toString(2));
                operators.splice(indexAdd,1);
            }
            else {
                let indexSub = operators.indexOf('-');
                let sub = parseInt(oprands[indexSub],2) 
                        + parseInt(oprands[indexSub + 1],2);
                oprands.splice(indexSub,2);
                oprands.splice(indexSub,0,sub.toString(2));
                operators.splice(indexSub,1);
            }
        }
        res.innerHTML = oprands[0];
    }        
    else {
        alert("Expression must end with number.")
    }
}

document.getElementById("btn0").onclick = clickDigit;
document.getElementById("btn1").onclick = clickDigit;
document.getElementById("btnClr").onclick = clearInput;
document.getElementById("btnSum").onclick = clickOperator;
document.getElementById("btnSub").onclick = clickOperator;
document.getElementById("btnMul").onclick = clickOperator;
document.getElementById("btnDiv").onclick = clickOperator;
document.getElementById("btnEql").onclick = calculate;
