const Arab = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const Roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]
let Leng = false;

function calculate(value) {
    let start = 0
    let variable1 = null;
    let operation = null;
    let variable2 = null;

    console.log('Массив: ', value);

    console.log("Длинна массива", value.length)
    for (let i = 0; i < value.length; i++) {
        if (value[i] == " " || i == value.length - 1) {
            if (variable1 === null) {
                variable1 = value.slice(0, i);
                console.log('Variable1 =', variable1);
            }
            else if (operation === null) {
                operation = value.slice(start + 1, i);
                console.log('operation =', operation);
            }
            else if (variable2 === null) {
                variable2 = value.slice(start + 1, value.length);
                console.log('Variable2 =', variable2);
            }

            start = i

            // console.log('Value[i] = ',value[i],'i = ', i)
        }
    }
    console.log('Переменная старт: ', start)

    console.log(toRomanLogic(variable1, operation, variable2))

}

function toRomanLogic(x, operation, y) {
    let arabCount = 0;
    let romanCount = 0;
    for (let a of Arab) {
        if (x == a || y == a) arabCount++;
        if (arabCount == 1 & (x == y)) arabCount = 2;
    }
    for (let r of Roman) {
        if (x == r || y == r) romanCount++;
        if (romanCount == 1 & (x == y)) romanCount = 2;
    }
    console.log("arabCount =", arabCount, "romanCount =", romanCount)
    if (arabCount == romanCount || (arabCount < 2 & romanCount < 2)) return "Ошибка";
    else if (romanCount == 2) {
        for (let i = 0; i < Roman.length; i++) {
            if (x == Roman[i]) {
                x = i + 1
            }
            if (y == Roman[i]) {
                y = i + 1
            }
        }
        // console.log ("variable1 =",x,"variable2 =",y)
        let Leng = true;
        return mathOp(x, operation, y, Leng)
    }
    else if (arabCount == 2) {
        return mathOp(x, operation, y, Leng)
    }
    else {
        return "Непонятная ошибка"
    }
}

function mathOp(x, operation, y, Leng) {
    x = parseInt(x, 10)
    y = parseInt(y, 10)
    // console.log('x =', x, 'y =', y, 'operation =', operation)
    switch (operation) {
        case "+":
            result = x + y;
            break
        case "-":
            result = x - y;
            break
        case "/":
            result = x / y;
            break
        case "*":
            result = x * y;
            break
        default:
            break;
    }
    // console.log('result до изменения:',result)
    result -= result % 1
    if (Leng) {
        for (let i = 0; i < Roman.length; i++) {
            if (result == Arab[i]) {
                result = Roman[i]
            }
        }
        if (result < 1) result = "" 
    }

    return result

}

calculate(prompt('Введите пример'))
