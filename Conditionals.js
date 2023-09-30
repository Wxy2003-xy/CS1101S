//1. Nested constant declaration

function fractal(pic, n) {
    return n === 1
    ? pic
    : beside_frac(1/2, 
                  quarter_turn_left(pic), 
                  stack(fractal(pic, n-1),fractal(pic, n-1)));
}

function fractal1(pic, n) {
    return n === 1
    ? rune
    : beside(rune, stack(fractal1(rune, n - 1), 
                         fractal1(rune, n - 1)));
}
//Nested constant declaration prevent repeated evaluation 
//of same block in recursive processes.

function fractal1(pic, n) {
    return n === 1
    //const smaller_frac = fractal1(rune, n - 1);
    ? rune
    : beside(rune, stack(fractal1(rune, n - 1), 
                         fractal1(rune, n - 1)));
}
//This wont work because cannot declare new stuff within a 
//ternary conditional.

//-----Introduction of If else----------
if(predicate) {
    //consequent block
}
else
{
    //alternative block
}
//Apply if else
function fractal_3(rune, n) { 
    if (n === 1) {
        return rune; 
    } 
    else {
        const f = fractal_3(rune, n - 1);
        return beside(rune, stack(f, f)); 
    }
}
//iterative also works.


//Example: Rick the rabbit

/*
1. Chang coin prob

2. Lexical naming scope,
*/




//Lamda expression
//(x1, x2) => x1 + x2;
//x1 => x1 + 1;


function sumskipcube(a, b) {
    ( x ) => x + 2;
    return sum (x => x * x * x, a, x => x + 2, b);
}

sumskipcube(4, 9);



/*

---------Scope of names-----------
1. Declaration mandatory: 
    all names in Source must be declare.
2. Four forms of declaration
- Predecalred
- constand
- parameter and lamda
- function name of function declaraion
3. Scope rule
    a name occurrence refers to the closest 
    declaration (within the same block)
    (can only be accessed within the same block)

*/