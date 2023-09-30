//Binary search:

function guess_secret_num(start, end) {
    if (start === end) {
        return start;
    } else {
    const guess = math_floor((start + end) / 2);
    const check = check_guess(guess);
    return check === "correct"
    ? guess
    : check === "too low"
        ? guess_secret_num(guess + 1, end)    // when "too low"
        : guess_secret_num(start, guess - 1); // when "too high"
        }
    }
guess_secret_num(a, b);
//Run time of binary search algorithm:
/*
    1. At each step, the size of the problem is halved;
    2. takes k steps to reach size 1 for a problem of size 2^k
    3. => run time O(log(n));

*/

//Binary search for entries in a collection:
// Property of entries should have a total order === compariable: tricotomy
// Efficiency: need to reach the destination in O(1) time;
//          ::may need special data structure::
//!========== Binary tree ==============
/*
    either:
    - an empty tree
    - or each subtree has at most 2 branches

    Binary search tree:
    - a binary tree
    - All entries in left subtree are smaller than target
    - ALl entries in right subtrees are larger 

    ------ A binary tree is an abstration for binary tree;
*/
/*
Other than bogo and bitonic, sorting in general utilises wishful thinking:
which is: i can sort the rest of the list 


*/

//
function selection_sort(xs) {
    function smallest(xs) {
        return accumulate((x, y) => x < y ? x : y, 
        head(xs), tail(xs));
    }
    if (is_null(xs)) {
        return xs;
    } 
    else {
        const x = smallest(xs);
        return pair(x, selection_sort(remove(x, xs)));
    }
}
// insert the head, into the supposedly sorted tail
function insertion_sort(xs) {
    function insert(x, xs) {
        return is_null(xs) 
            ? list(x)
            : x <= head(xs) 
                ? pair(x, xs)
                : pair(head(xs), insert(x, tail(xs)));
    }
    return is_null(xs) 
        ? xs
        : insert(head(xs), insertion_sort(tail(xs)));
}
// Implementation of merge sort 1: separate cases wishful thinking
function merge_sort(xs) {
    const mid1 = math_floor(length(xs) / 2);
    const mid2 = math_ceil(length(xs) / 2);
    function merge(xs1, xs2) {
            return is_null(xs1) 
                ? xs2
                : is_null(xs2)
                ? xs1
                : head(xs1) >= head(xs2)
                ? pair(head(xs2), merge(xs1, tail(xs2)))
                : pair(head(xs1), merge(xs2, tail(xs1)));
    }
    function first_list(xs, p) {
        return p === 0
        ? null 
        : pair(head(xs), first_list(tail(xs), p - 1));
    }
    function second_list(xs, p) {
        return p === 0
        ? xs 
        : pair(head(reverse(xs)), first_list(tail(reverse(xs)), p - 1));
    }
    return is_null(xs) || is_null(tail(xs))
    ? xs 
    : merge(merge_sort(first_list(xs, mid1)), 
                 merge_sort(second_list(xs, mid2)));
}

// bubble sort
function bubble_sort(xs) {
        const length = length(xs);
        function compare(x, y) {
            return x > y 
                ? list(y, x)
                : list(x, y);
        }
        return n === 0
            ? list(null)
            : is_null(tail(xs)) 
            ? null 
            : append(compare(head(xs), head(tail(xs))), 
                             bubble_sort(tail(tail(xs))));
}

    
    //! Finding the implementation that checks for sorting status

//test
const xs = list(3,2,6,3,1,4,2,0,9);

display_list(bubble_sort(xs));



// quick sort
function quick_sort(xs) {
    
}
    