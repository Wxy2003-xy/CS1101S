function deriv_symbolic(exp, x) {
    return is_number(exp)       // check for expression type whether contains var
    ? 0                         // deriv of const
    : is_variable(exp)      // check for the variable in the exp
        ? (is_same_variable(exp, x) ? 1 : 0)    // check for wheter exp contains the same var as the intake var
        : is_sum(exp)       // check for case1: addition operation
            ? make_sum(deriv_symbolic(addend(exp), x),
            deriv_symbolic(augend(exp), x))
            : is_product(exp)   // check for case2: multip operation
                ? make_sum(make_product(multiplier(exp),deriv_symbolic(multiplicand(exp), x)), //implementation of
                           make_product(deriv_symbolic(multiplier(exp), x),       //product rule;
                  multiplicand(exp)))
                : is_division(exp) 
                    ? make_division(make_sub(make_product(multiplier(exp), 
                                                          deriv_symbolic(multiplicand(exp), x)), 
                                             make_product(multiplicand(exp), 
                                                          deriv_symbolic(multiplier(exp), x))), 
                                    make_product(divider(exp), divider(exp)))
                    : error(exp, "unknown expression type");    //not among considered operaitons: returns error
}
// ^To build up the new data structure
//Declare constructors: supported operations:
function make_sum(a1, a2) {
    return list("+", a1, a2);
}

function make_sub(a1, a2) {
    return list("-", a1, a2);
}

function make_product(m1, m2) {
    return list("*", m1, m2);
}

function make_division(m1, m2) {
    return list("/", m1, m2);
}
// ^Declare accessors
//  head(s) is the operation, as defined per contract; 
// all lists of expression to have exactly 3 entries, operation, subject of operation
// , and the factor of operation;
function addend(s) {
    return head(tail(s));
}
function augend(s) {
    return head(tail(tail(s)));
}
function multiplier(s) {
    return head(tail(s));
}
function multiplicand(s) {
    return head(tail(tail(s)));
}
function divided(s) {
    return head(tail(s));
}
function divider(s) {
    return head(tail(tail(s)));
}

// ^Declare predicate: the collection of boolean functions that check
// whether the parameter are of the expected type;

// the pair checks for pair(operand, pair(m1, pair(m2, null))), which is the list
function is_variable(x) {
    return is_string(x);
}
function is_same_variable(v1, v2) {
    return is_variable(v1) && is_variable(v2) && v1 === v2;
}
function is_sum(x) {
    return is_pair(x) && head(x) === "+";
}
function is_sub(x) {
    return is_pair(x) && head(x) === "-";
}
function is_product(x) {
    return is_pair(x) && head(x) === "*";
}
function is_division(x) {
    return is_pair(x) && head(x) === "/";
}

//^Implementation of the quotient rule:
/*
function division1(x/y) {
    const making quotient = make_division(y*dx-x*dy, y*y);
    const making sum(diff) = make_sum(y*dx, (-1)x*dy);
    const making multiple = make_product(y, deriv_symbolic(x));
                          = make_product(x, deriv_symbolic(y));
    const making deriv = deriv_symbolic(x);
                       = deriv_symbolic(y);
    beyond are wishful thinking;
}
 */   

    
    



//test cases:
// 2 / x
const exp4 = make_division(2, "x");

// x^2 + x + 4
const exp1 = make_sum(make_product("x", "x"), make_sum("x", 4));

// 3 * x^2 + 4 * x + 5
const exp2 = make_sum(make_product(3, make_product("x", "x")),
                      make_sum(make_product(4, "x"), 5));

// x * y * (x + 3)
const exp3 = make_product(make_product("x", "y"),
                          make_sum("x", 3));

//display_list(deriv_symbolic(exp1, "x"));
//display_list(deriv_symbolic(exp2, "x"));
display_list(deriv_symbolic(exp4, "x"));

