//! 3 important higher order functions used in data structure organisation:
//!      1. map
//!      2. filter
//!      3. accumulate

function map(f, xs) {   //TODO takes a function that takes element of the list as argument, and a list
    return is_null(xs)  // base case when the end of list is reached(null), meaning the tail that 
    ? null              // previous recursive call left is already null, no head element to apply f;
    : pair(f(head(xs)), // applying the function f onto head element head(xs);
             map(f, tail(xs)));   // wishful thinking: each recursive call applies f to the new head, 
}                                 //passing down the tail of tail etcetc;

function filter(pred, xs) { //TODO takes a function that returns boolean value, and a list
    return is_null(xs)  // base case when the end of list is reached(null), meaning the tail that
    ? null              // previous recursive call left is already null, no head element to check on 
    : pred(head(xs))    // check pred on head element head(xs);
        ? pair(head(xs), filter(pred, tail(xs)))   // if true: allow the preservation of head by pairing
        // it with recursive call of the same function onto the tail(wishful thinking);
        : filter(pred, tail(xs));   // if false: remove head, carry on the filtering process to the tail;
}
    //TODO Takes a binary operation that operates an element unto other elements;
function accumulate(binary_operation, initial_value, xs) {
    return is_null(xs)  // base case when the end of list is reached(null), meaning the tail that
        ? initial_value // previous recursive call left is already null, the initial value that is of the 
                        // same data type as the result the binary operation on elements yield is returned
        : binary_operation(head(xs),    // application of the binary operation, Applying the head element: head(xs) onto
                           accumulate(binary_operation, initial_value, tail(xs)));
                           // the recursive call of accumulation of the tail(wishful thinking)
}

//Use filter funciton to narrow down the scope,
/*
How to apply wishful thinking:
eg: function flatten_list: 
given a tree, flatten it to one single list*/
//^example of applying accumulate: Flattening tree
function flatten_list(xs) {
    return accumulate(append, null, xs);    // null as the base case when xs is null
}
//which is the same as:   accumulate((x, y) => append(x, y), null, xs);   
function flatten_list(tree) {                   
    function accumulate(binary_operation, initial_value, xs) {  
        return is_null(xs)
            ? initial_value
            : binary_operation(head(xs),
              accumulate(binary_operation, initial_value, tail(xs)));
    }   //The binary operation, which takes 2 inputs;the operation involes only the 2 parameters input;
    function append(xs1, xs2){  
        function app_iter(xs1, xs2, c) {  // declare 
        return is_null(xs1)
            ? c(xs2)
            : app_iter(tail(xs1), xs2, x => c(pair(head(xs1), x)));
        }
        return app_iter(xs1, xs2, x => x);
    }
    return accumulate(append, null, tree)
}
//^exmaple of the applying accumulate: summing a list of squared numbers
//^                    and mapping: squaring first
function sum_square(list) {
    const sum = (x, y) => x + y;    // binary operation to be used accumulate;
    const square = x => x * x;      // unary function to be used by map;
    return accumulate(sum, 0, map(square, list));
}   // using lamda expression to simplify
function sum_square(list) {
    return accumulate((x, y) => x + y, 0, map(x => x * x, list));
}
//^example of applying accumulate:
function my_map(f, xs) {
    return accumulate((x, y) => pair(x + 1, y), f(head(xs)), xs);
}
//^example of applying mapping: postfix lists in a list;
function adding_zero(tree) {
    return map(x => append(x, 0), tree);
}
//^example of applying filtering: 
function remove_dup(list) {
    return is_null(list) 
    ? null              //base case: where the end of the list is reached
    : pair(head(list),  // pair the head of the list, the first element is not a duplicate
           remove_dup(filter(x => head(list) !== x, //remove all following elements 
           tail(list))));                                         //identical to the preserved head
    //wishful thinking: preserved head appends the rest of the list after removing duplicates.
}
//! function member, remove and enum
// member looks for a given first-argument element in a given
// second argument list. It returns the first postfix sublist
// that starts with the given element. It returns [] if the
// element does not occur in the list
function member(v, xs) {
    for (; !is_null(xs); xs = tail(xs)) {
      if (head(xs) === v) {
        return xs;
      }
    }
    return null;
}


//^using accumulate:
function remove_dup(list) {
    function check_remove(x, list) {
        return is_null(list)
        ? pair(x, list)
        : list
    }
    return accumulate(remove_dup, null, list);
}

const xs = list(1,2,3,4,4,3,2,1,2);
const xss = list(1,5,3,6,3,3,2,1,6,10);
//display_list(remove_dup(xss));

function adding_zero(tree) {
    return map(x => append(x, 0), tree);
}

const tree = list(
         list(1,8,0,0,5,2,1,1,9,8,0),
         list(6,2,3,5,8,5,7,7),
         list(0,0,8,6,1,3,7,7,0,9,5,0,0,6,1));
display_list(tree);
display_list(append(tree,list(0)));
display_list(adding_zero(tree));


//! Important motif for combination type of problems:
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
//^example of applying the combinaion motif
//display_list(makeup_amount(3, list(1, 2, 3)));
function subset(xs) {
        if (is_null(xs)){
            return list(null);
        }
        else{
            const combi = map(x => pair(head(xs), x), 
                              subset(tail(xs)));
            const no_head = subset(tail(xs));
        return append(no_head, combi);
        }
}
//tests:
//const set = list(1, 3, 4);
//display_list(subset(set));
function subset(xs) {
        if (is_null(xs)){
            return list(null);
        }
        else{
            const body = subset(tail(xs));
            const combi = map((x => pair(head(xs), x)), 
                              body);  //substituted for no_head hof;
        return append(body, combi);
        }
    }
//^example of mapping map
/* How it works:
    0. Base case: since we are gradually shortening the list as we go sorting each permutation,
       there exist the base case list(null); WARNING: null meaning literally nothing
    1. Every element can be the first one, => 
    2. when the first element is settled, the problem is reduced to:
       permutation of the remaining 3 elements => wishful thinking
    
*/
function permutation(xs) {
    return is_null(xs)
        ? list(null)
        : accumulate(append, null, 
                     map(
                        x => map(y => pair(x, y), 
                                  permutation(remove(x, xs))), //list the map2 is applied to
                                                               //wishful thinking
                        xs));   //list that map1 applies to 
}

// Data manipulation:: trees
/*
pre-declared function: 
function is_tree(ls) {
    return is_list(head(ls))
`   ? true
    : false;
}
*/

function sum_tree(tree) {
    return is_null(tree)
    ? 0
    : (is_list(head(tree))        //check if the head of the tree is a list
        ? sum_tree(head(tree))    // if so use wishful thinking, assuming this part 
                                //   is solved by using the same function
        : 1)                                    //if not a list, then its an element, element count += 1
        +
        sum_tree(tail(tree));      // wishful thinking, the same function will do the same to the tail of 
}                                  // the tree, dont care if its a list or an element, the function will take 
                                // care of it.

function scale_tree(tree, k) {
    function map_tree(tree, f) {
        return is_null(tree)
        ? null 
        : map(subtree => !is_list(subtree)//!--  If the head isnt a list, proceed as normal mapping f
                            ? f(subtree)//!----  otherwise continue go down the tree until the head is 
                            : map_tree(subtree, f), tree);  //! not a list
    }
    return map_tree(tree, x => k * x);
}
//Generalised map function for trees
function map_tree(tree, f) {
    return is_null(tree)
    ? null 
    : map(subtree => !is_list(subtree)
                        ? f(subtree) 
                        : map_tree(subtree, f), tree);  
}