let doubleZero = document.querySelector('.doubleZero');
let decimal = document.querySelector('.decimal');
let disPlayDetail = document.querySelector('.disPlayDetail');
let disPlayresult = document.querySelector('.disPlayresult');
let ac = document.querySelector('.ac');
let backspace = document.querySelector('.backspace');
let num_button = document.querySelectorAll('.num_button');
let operatorBtn = document.querySelectorAll('.operatorBtn');
let pendingVal;
let evalStrAry = [];
let evalStrAry_math = [];
let displayVal = '0';
let btnText;


ac.addEventListener('click', () => {
    displayVal = '0';
    pendingVal = undefined;
    evalStrAry = [];
    evalStrAry_math = [];
    disPlayresult.innerText = displayVal;
    disPlayDetail.innerText = displayVal;
}, false);

backspace.addEventListener('click', () => {
    let displayVal_length = displayVal.length;
    displayVal = displayVal.slice(0, displayVal_length - 1);
    if(displayVal === '') {
        displayVal = '0';
    }
    disPlayresult.innerText = displayVal;
    disPlayDetail.innerText = displayVal;
}, false);

decimal.addEventListener('click', () => {
    if (!displayVal.includes('.')) {
        displayVal += '.';
    }
    disPlayresult.innerText = displayVal;
    disPlayDetail.innerText = displayVal;
}, false);

doubleZero.addEventListener('click', () => {
    if(displayVal !== '0') {
        displayVal += '00';
    }
    disPlayresult.innerText = displayVal;
    disPlayDetail.innerText = displayVal;
}, false);


let updateDisplayVal = (e) => {
    btnText = e.target.dataset.num;
    if(displayVal === '0') {
        displayVal = '';
        displayVal += btnText;
    } else {
        displayVal += btnText;
    }
    disPlayresult.innerText = displayVal;
    disPlayDetail.innerText = displayVal;
}

for(let i=0; i<num_button.length; i++) {
    num_button[i].addEventListener('click',updateDisplayVal,false);
}


let performOperation = (e) => {
    let operator = e.target.dataset.math; // 實際運算 ex 6/3
    let operator_Text = e.target.innerText; //顯示畫面 ex 6÷3
    if(displayVal && operator !== '=') {
        pendingVal = displayVal;
        displayVal = '0';
        disPlayresult.innerText = displayVal;
        evalStrAry.push(pendingVal);
        evalStrAry.push(operator_Text);
        evalStrAry_math.push(pendingVal);
        evalStrAry_math.push(operator);

        let evaluation = evalStrAry.join(' ');
        let evaluation_list = evalStrAry.join(' ');
        disPlayDetail.innerText = evaluation_list;

    } else {
        evalStrAry_math.push(displayVal);
        evalStrAry.push(displayVal);

        let evaluation = evalStrAry.join(' ');
        let evaluation_list = evalStrAry.join(' ');

        let evaluation_math = eval(evalStrAry_math.join(' '));
        let evaluation_math_list = eval(evalStrAry_math).join(' ');

        disPlayresult.innerText = evaluation_math;
        disPlayDetail.innerText = evaluation_list;
        
        displayVal = '0';
        evalStrAry = [];
        evalStrAry_math = [];
    }
}

for(let i=0; i<operatorBtn.length; i++) {
    operatorBtn[i].addEventListener('click',performOperation,false);
}