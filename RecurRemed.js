/*
Recursion:
    1. no working from n to the base case downward
    2. play with small example and work upwards
    3. no overcomplicated iterations


Build abstraction
    1. theorems are mental abstraciton'
    2. always think at the right level of abstraction


Steps to follow to work out a recursion problem:
    0. Write down whats the expected result;
    1. find the base case, as well as invalid steps if theres any;
    2. Wishful thinking: the smaller part of the problem that can be solved;
    3. Local choice: once piece of work, that process the smaller worked out
       part of the problem, into the big problem to be solved;
    4. Write the function when everything is cleared;
*/
//&----------------------------------------------------------------------------------------------------------------
//! the key of converting recursive process to an iterative one 
//! is to have parameters that record the changes, and a counter
//^example of recur => iter: fibo
function fibo(n) {
    return n <= 1
    ? 1
    : fibo(n - 1) + fibo(n - 2);
    // tis recursive process give rise to 2^n increase in 
    // time complexity, not good
}

function fibo(n) {
    function fibo_iter(product, n, counter) {
        return counter === 1    // theres no zero th term
        ? n
        : fibo_iter(product + n, product, counter - 1);
    }       //! when the base case is reached, return the parameter that is 
            //! keeping track of the product
    return fibo_iter(1, 0, n);
    //          second first counter
    //     fibo_iter(1, 1, n - 1);
    //           third second counter
    //     fibo_iter(2, 1, n - 2);
    //           fourth third counter
    //     fibo_iter(3, 2, n - 3);
    //     fibo_iter(5, 3, n - 4);
    //     fibo_iter(8, 5, n - 5);
    //             ......           when counter === 0,
    //  there have been n iterations, 
    // eg n = 5, fibo_iter(8, 5, 0); returns 

}
//&----------------------------------------------------------------------------------------------------------------
function power(b, n) {
    return n === 0
    ? 1
    : b * power(b, n - 1);
}
//Power gives rise to a recursive process
//! this one below is wrong!
function fast_power(b, n) {
    return n === 0      // if check the base case first, checking parity becomes
    ? 1                 // pointless as total number of rounds is not changed because the   
    : b % 2 === 0       // condition n === 0 is checked every round
    ? fast_power(b, n / 2) * fast_power(b, n / 2)   //when n is even this produces an extre
    : b * fast_power(b, n - 1);                     // deferred operation
}
//! corrected:
function fast_power(b, n) {
    return n % 2 === 0      //TODO check for parity first, effectively half the problem size
    ? n === 0               //then check for the base case separately after halving the problem size
        ? 1
        : fast_power(b, n / 2) * fast_power(b, n / 2)
    : n === 0
        ? 1
        : b * fast_power(b, n - 1);
}
// This implementation gives rise to a recursive process
// iterative version
function fast_power_iter(b, n) {
    function iter(b, x, counter) {
        return counter === 1
        ? b
        : iter(b * x, x, counter - 1);
    }
    return n === 0      // check for if power === 0
        ? 1             // if so returns 1 no more eval needed
        : iter(b, b, n);    // otherwise returns iter
}
//! the advatage of iterative process in this problem is not shown as theres only one deferred operation
//! per recursion, both implementation has O(n);
//&----------------------------------------------------------------------------------------------------------------
//! Continuation-Passing Style:
// A method to convert any recursive process to an iterative one, essentially by capturing the 
// deferred operation as one addtional argument in the iter helper function
//^example of implementaiton: append
function append(xs1, xs2) {
    return is_null(xs1)
    ? xs2
    : pair(head(xs1), append(tail(xs1), xs2));
// This is a recursive process as deferred operation pair can only be done when 
// append(tail(xs1), xs2) has been evaluated;
}
//In this implementation the deferred operation is :: pair ::, we can encase this operation
// as a function parameter into the function append_iter:
//! Still keep in mind an iterative process need to have parameters that keep track of the prelimenary 
//! result as well as how many rounds of iteration have been carried out to approach towards to base case;
function append(xs1, xs2) {
    function append_iter(remaining_xs1, xs2, func) {
        return is_null(remaining_xs1)
        ? func(xs2)
        : append(tail(remaining_xs1), xs2, x => func(pair(head(remaining_xs1), x)));
    }
    return append_iter(xs1, xs2, x => x);//! use x => x identity function 
                                         //? Is this because I want to pass the pair fucntion back
                                         //? as it has arguments that have not been evaluated?
                                         //? Similar to the case of make change where only returning on combi
                                         //? wont yield as parts of both combi rely on the evaluation of each other?
    /*
    function makeup_amount(x, coins) {
    if (x === 0) {      //base case valid: returns list(null)
        return list(null);
    } else if (x < 0 || is_null(coins)) {   //base case invalid: return null
        return null;
    } else {
        const add_head = x => pair(head(coins), x);
        const combi_B = map(add_head, 
                            makeup_amount(x-head(coins), tail(coins)));
        const combi_A = makeup_amount(x, tail(coins));
        return append(combi_A, combi_B);
    }
}
    */
}
//&----------------------------------------------------------------------------------------------------------------
function length(xs) {
    return is_null(xs)
    ? 0
    : 1 + length(tail(xs));
}
//iter version
function length_iter(xs) {
    function length_iter_helper(xs, counter) {
        return is_null(xs)
        ? counter
        : length_iter_helper(tail(xs), counter + 1);
    }
    return length_iter_helper(xs, 0);           //? why is iter version slower than the recursive version?
}
// using cps
function length_iter_2(xs) {
    function length_iter_2_helper(xs, counter, f) {
        return is_null(xs) 
        ? counter
        : length_iter_2_helper(tail(xs), counter + 1, x => f());
    }
    return length_iter_2_helper(xs, 0, x => x);
}
//&----------------------------------------------------------------------------------------------------------------
function zip(xs, ys) {
    if (length(xs) !== length(ys)) {
        return null;
    }
    else {
        return is_null(xs)
        ? null
        : pair(pair(head(xs), head(ys)), zip(tail(xs), tail(ys)));
    }
}
//iter verison
function zip_iter(xs, ys) {
    function zip_iter_helper(xs, ys, f) {
        return is_null(xs)
        ? f(xs)
        : zip_iter_helper(tail(xs), tail(ys), x => f(pair(pair(head(xs), head(ys)), x)))
    }
    if (length(xs) !== length(ys)) {
        return null;
    }
    else {
        return zip_iter_helper(xs, ys, x => x);         
    }
}
//&----------------------------------------------------------------------------------------------------------------
function reverse(xs) {
    return is_null(xs) 
    ? null 
    : append(reverse(tail(xs)), list(head(xs)));
}
//iter version
function reverse_iter(xs) {
    function reverse_iter_helper(original, reversed) {
        return is_null(original)
        ? reversed
        : reverse(tail(original), pair(head(original), reversed));
    }
    return reverse_iter_helper(xs, null);
}
//iter but in cps
function reverse_iter(xs) {
    function reverse_iter_helper(xs, f) {
        return is_null(xs) 
        ? f(xs)             //? cannot put null directly, otherwise returns null
        : reverse_iter_helper(tail(xs), x => f(append(x, list(head(xs)))));
    }
    return reverse_iter_helper(xs, x => x);     //? whats the purpose of x => x here?
}
//&----------------------------------------------------------------------------------------------------------------
function multizip(ls) {
    return is_null(head(ls))
    ? null
    : pair(map(x => head(x), ls), 
           multizip(map(x => tail(x), ls)));
}
//test case:
/* const tree = list(list(1, 2, 3),
                     list(4, 5, 6),
                     list(7, 8, 9),
                     list(3, 7, 8));
*/
//iter version
function multizip_iter(ls) {
    function multizip_iter(ls, f) {
        return is_null(head(ls)) 
        ? f(ls)
        : multizip_iter(map(x => tail(x), ls), 
                        x => f(pair(map(x => head(x), ls), x)));
    } 
    return multizip_iter(ls, x => x);
}
//&----------------------------------------------------------------------------------------------------------------

