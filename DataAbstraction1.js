// Definition of list:
//   1. Tail has to be a list
//   2. A list of a certain data type is null, 
//      or a pair whose head is 
function list(...args) {
    let the_list = null;
    for (let i = args.length - 1; i >= 0; i--) {
      the_list = pair(args[i], the_list);
    }
    return the_list;
}
  

const listA = pair(1, pair(2, null));   // a list of num
const listB = list(true, true, false, false);   // list of booleans
const listC = list("X", "Y");  //list of string
const listD = null;   //A list of any type

function length(xs) {
    return is_null(xs)
        ? 0
        : 1 + length(tail(xs));
}

function length_iter(xs) {
    function len(ys, counted_so_far) {
    return is_null(ys)
    ? counted_so_far
    : len(tail(ys), counted_so_far + 1);
    }
    return len(xs, 0);
}

//Appending two lists tgt:
/*
function append(xs1, xs2) {
    return is_null(head(xs1))
 /       ? xs2
        : pair(head(xs1), append(tail(xs1), xs2));   
}
 utilise wishful thinking
Order of growth in time: Theta(n);
Order of growth in space: Theta(n);     -- Keep track of deferred operation
*/


function scale_list(xs, k) {// returns a list as well;
    return is_null(xs)
    ? null
    : pair(k * head(xs),
    scale_list(tail(xs), k));
    }
    scale_list(list("A", "B", "C"), 10);
    scale_list(list("A", "B", "C"), "D");
    scale_list(list(1, 2, 3), "D");
//Playground notes:
    const list1 = list(1, 4, 9, 16, 25, 36);
    const list2 = list(2, 3, 5, 7, 11, 13);
    const list3 = null;
    const list4 = list(0, null);
    const list5 = list(1, 2, pair(3, 4), 5, 6);
    const list6 = list(list(1, 2), list(3, 4), list(5, 6));
    
    
function append(xs1, xs2) {
            return is_null(xs1)
            ? xs2
            : pair(head(xs1), append(tail(xs1), xs2));   
}   // recursive process
    // How to avoid deferred operations:
    
//Continuous past style: recursion => iterative process;
function append_iter(xs1, xs2){
    function append_iter_helper(xs1, xs2, c) {
        return is_null(xs1)
            ? c(xs2)
            : append_iter_helper(tail(xs1), xs2, x => c(pair(head(xs1), x)));
        }
    return append_iter_helper(xs1, xs2, x => x);
}
    
    
display_list(append_iter(list1, list2));
//display_list(append(list1, list2));
    
function reverse(lst) {
    return is_null(lst)
        ? null 
        : append(reverse(tail(lst)), list(head(lst)));
}
    
    
function reverse1(lst) {
        if(is_null(lst)) {
            return null;
        }
        else { 
            return pair(pair(reverse1(tail(lst)), head(lst)), null);
        }        
}
    
function reverseiter(lst) {
        function rev(ori, reversed) {
            return is_null(ori)
                ? reversed
                : rev(tail(ori), pair(head(ori), reversed));
        }
        return rev(lst, null);
    }
    //display_list(reverseiter(list1));
    
    function map(f, xs) {
        return is_null(xs) 
        ? null 
        : pair(f(head(xs)), map(f, tail(xs)));
    }
    const f = x => x * x;
    //display_list(map(x => x * x, list1));
    
    function scale_list(xs, k) {
        return map(x => k * x, xs);
    }
    
    //display_list(scale_list(list2, 4));
    
    function copy(xs) {
        return map(x => x, xs);
    }
    
    //display_list(copy(list1));
    
    function even(xs) {
        return is_null(xs)
        ? null 
        : head(xs) % 2 === 0
            ? pair(head(xs), even(tail(xs)))
            : even(tail(xs));
    }
    const list9 = list(1, 2, 3, 4, 5, 6, 7, 8, 9);
    //display_list(even(list9));
    
    function filter(pred, xs) {
        return is_null(xs)
        ? null 
        : pred(head(xs))
            ? pair(head(xs), filter(pred, tail(xs)))
            : filter(pred, tail(xs));
    }
    
    const g = x => x % 2 === 0;
    //display_list(filter(g, list9));
    
    function sum(xs) {
        return is_null(xs)
        ? 0
        : head(xs) + sum(tail(xs));
    }
    //sum(list9);
    
    function mult(xs) {
        return is_null(xs)
        ? 1
        : head(xs) * mult(tail(xs));
    }
    
    function accumulate(binary_op, ini, xs) {
        return is_null(xs)
        ? ini 
        : binary_op(head(xs), accumulate(op, ini, tail(xs)));
    }
    
    //accumulate((x, y) => x + y, 0, list9);
    // (x, y) => x + y : the function that applies operation betwen xs1 and xs2
    
    //Trees
    
    function count_tree(tree) {
        return is_null(tree)
        ? 0
        : (is_list(head(tree))
            ? count_tree(head(tree))
            : 1)
            +
            count_tree(tail(tree));
    }
    const tree = list(1, list(2, list(3, 4, 5)), null, 6);
    //draw_data(tree);
    //count_tree(tree);
    //map over a tree
    
    function maptree(f, tree) {
        return map(subtree =>
        !is_list(subtree)
            ? f(subtree)
            : maptree(f, subtree)
            , tree);
    }

    function accumulate(binary_operation, initial_value, xs) {
        return is_null(xs)
            ? initial_value
            : binary_operation(head(xs), 
              accumulate(binary_operation, initial_value, tail(xs)));
    }

    function my_map(f, xs) {    //f = x => f(x)
        return accumulate((x, y) => pair(x, y), f(head(xs)), my_map(tail(xs)));
    }
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //
    
