/*
Order of growth

Definition: 
            f(n) = Θ(g(n))   --->
            there exist n0, c1, c2 such that for all n >= n0,
            c1 * g(n) <= f(n) <= c2 * g(n)

This means :
    1. If f(n) has order of growth Θ(g(n)) then f(n) has order of growth Ω(g(n));
    2. If f(n) has order of growth Θ(g(n)) then f(n) has order of growth O(g(n));

    But not conversely true! since Θ indicates both the upper(O) and lower(Ω) bounds.




Calculation of recurrence relations:    */
function f(x) {
    function g(y) {
        return y === 0
        ? 0
        : 1 + g(y - 1);
    }
    return x === 0
    ? 0
    : 1 + f(g(x - 1));
}
// Examine function g: T(n)
// Now: "+" operation has O(1);
// Rec: g(y - 1) is T(n - 1);
// T(n) = T(n - 1) + O(1);                  (1)
// T(n - 1) = T(n - 2) + O(1);              (2)
// (2), (1) --->
// T(n) = T(n - 2) + O(1) + O(1);
// By induction, 
// T(n) = T(0) + n * O(1);
// T(n) = O(n);  #
//*----------------------------------------------
// Examine function f: T(n)
// Now: "+" operation has O(1);
// Rec: f(g(x - 1) is n * T(n - 1);
//      