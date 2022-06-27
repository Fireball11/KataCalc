function calculate(value) {
    let start = 0
    let variable1 = null;
    let operation = null;
    let variable2 = null;
    // let arr = Array.from(value)
    console.log(value.length)
    for (let i = 0; i < value.length; i++) {
        if (value[i] == " ") {
            if (variable1 === null){
                console.log(variable1 = cut(i));
                start = i+1
            }
            else if (operation === null){
                console.log(value)
                console.log(operation = cut(i));
                start = i+1
            }   
            else if (variable2 === null) {
                console.log(variable2 = cut(i));
                start = i+1
            }
            
            
            console.log(value[i], i)
        }
    }

    function cut(i) {
        return value.slice(start,value[i-1]);
    }
}

calculate(prompt('Введите пример'))

// console.log()