const Arab = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const Roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"];
// Два массива используемых в переводе в римского на арабский и обратно

let Leng = false;

// Действия функции: режет строку на части чтобы получить операцию и два операнда, основываясь на отступах между символами
// и ссылается на функцию toRomanLogic
function calculator(value) {
    let start = 0;
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

            start = i;

            // console.log('Value[i] = ',value[i],'i = ', i)
        }
    }

    console.log('Переменная старт: ', start);

    console.log(toRomanLogic(variable1, operation, variable2));
    return toRomanLogic(variable1, operation, variable2);

}

/*
    Действия функции:
    1. Перебирает массивы чтобы посчитать сколько операндов соответсвует каждому языку
    2. Смотрит оба ли операнда относяться к одному языку. Если нет - возвращает ошибку
    3. Если прошлый шаг выполнен: переводит с римского если нужно и ссылается на функцию для счета
*/
function toRomanLogic(x, operation, y) {
    // 1
    let arabCount = 0;
    let romanCount = 0;
    for (let a of Arab) {
        if (x == a || y == a) arabCount++;
        if (arabCount == 1 & (x == y)) arabCount = 2;
    }
    for (let r = 0; r < Roman.length - 10; r++) {
        if (x == Roman[r] || y == Roman[r]) romanCount++;
        if (romanCount == 1 & (x == y)) romanCount = 2;
    }
    console.log("arabCount =", arabCount, "romanCount =", romanCount);
    // 2
    // 
    // // 3
    // else
    try {
        if (arabCount == romanCount || (arabCount < 2 & romanCount < 2)) throw new Error("Недостаточно переменных или синтаксическая ошибка");
        if (romanCount == 2) {
            for (let i = 0; i < Roman.length; i++) {
                if (x == Roman[i]) {
                    x = i + 1;
                }
                if (y == Roman[i]) {
                    y = i + 1;
                }
            }
            // console.log ("variable1 =",x,"variable2 =",y)
            let Leng = true;
            return mathOp(x, operation, y, Leng);
        }
        else if (arabCount == 2) {
            return mathOp(x, operation, y, Leng);
        }
    } catch (error) {
        throw error
    }
}

function div(integer) {
    return integer -= integer % 1;
}

/*
    Действия функции:
    1. Перевод строк в числа
    2. Счет
    3. Избавление от плавющей точки
    4. Перевод обратно на римский если нужно
*/
function mathOp(x, operation, y, Leng) {
    // 1
    x = parseInt(x, 10);
    y = parseInt(y, 10);
    // console.log('x =', x, 'y =', y, 'operation =', operation)
    // 2
    try {
        if (operation != "+" && operation != "-" && operation != "/" && operation != "*") throw new Error("Неверная операция");
        switch (operation) {
            case "+":
                result = x + y;
                break; 
            case "-":
                result = x - y;
                break;
            case "/":
                result = x / y;
                break;
            case "*":
                result = x * y;
                break;
            default:
                // console.log('Я работаю')
                // throw new Error("Неверная операция");
                // break;
        }
    } catch (error) {
        throw error
    }
    // console.log('result до изменения:',result)
    // 3
    result = div(result)
    // 4
    if (Leng) {
        // for (let i = 0; i < Roman.length; i++) {
        //     if (result == i + 1) {
        //         result = Roman[i];
        //     }
        // }
        if (result < 1) result = "";
        else {
            let temporaryResult = result;
            result = [];
            while (temporaryResult != 0) {
                if (temporaryResult >= 100) {
                    result.push("C");
                    temporaryResult -= 100;

                }
                else if (temporaryResult >= 50) {
                    result.push("L");
                    temporaryResult -= 50;
                }
                else if (temporaryResult >= 40) {
                    result.push("XL");
                    temporaryResult -= 40;
                }
                else if (temporaryResult >= 10) {
                    result.push("X");
                    temporaryResult -= 10;
                }
                else if (temporaryResult < 10 & temporaryResult > 0) {
                    switch (temporaryResult) {
                        case 9:
                            result.push("IX");
                            temporaryResult -= 9;
                            break;
                        case 8:
                            result.push("VIII");
                            temporaryResult -= 8;
                            break;
                        case 7:
                            result.push("VII");
                            temporaryResult -= 7;
                            break;
                        case 6:
                            result.push("VI");
                            temporaryResult -= 6;
                            break;
                        case 5:
                            result.push("V");
                            temporaryResult -= 5;
                            break;
                        case 4:
                            result.push("IV");
                            temporaryResult -= 4;
                            break;
                        case 3:
                            result.push("III");
                            temporaryResult -= 3;
                            break;
                        case 2:
                            result.push("II");
                            temporaryResult -= 2;
                            break;
                        case 1:
                            result.push("I");
                            temporaryResult -= 1;
                            break;
                    }
                }
                else {
                    return "Ошибка в переводе"
                }
            }
            result = result.join("")
        }
    }

    return result.toString();

}

calculator(prompt('Введите пример'));
