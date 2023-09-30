function merge_sort_counter(xs) {
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







function graderVer1(arr) {
    // your solution here
    function middle(n) {
      return math_floor(n / 2);
    }
    function take(xs, n) {
      if (n === 0) {
        return null;
      } else {
        return pair(head(xs), take(tail(xs), n - 1));
      }
    }
    function drop(xs, n) {
      if (n === 0) {
        return xs;
      } else {
        return drop(tail(xs), n - 1);
      }
    }
    function merge(xs_and_count, ys_and_count) {
      const xs = head(xs_and_count);
      const ys = head(ys_and_count);
      const xs_inversions = tail(xs_and_count);
      const ys_inversions = tail(ys_and_count);
      const inversions = tail(xs_and_count) + tail(ys_and_count);
      function merge_helper(xs, ys, merged_list, xs_remaining, ys_remaining, total_inversions) {
        if (is_null(xs)) {
          const merged = append(merged_list, ys);
          return pair(merged, total_inversions);
        } 
        else if (is_null(ys)) {
          const merged = append(merged_list, xs);
          return pair(merged, total_inversions);
        } 
        else {
          const x = head(xs);
          const y = head(ys);
  
          if (x < y) {
            return merge_helper(
              tail(xs),
              ys,
              append(merged_list, list(x)),
              xs_remaining - 1,
              ys_remaining,
              total_inversions
            );
          } 
          else {
            return merge_helper(xs, tail(ys), append(merged_list, list(y)), xs_remaining, ys_remaining - 1, total_inversions + xs_remaining);
          }
        }
      }
      if (is_null(xs)) {
        return ys_and_count;
      } else if (is_null(ys)) {
        return xs_and_count;
      } else {
        const sorted_list_and_count = merge_helper(
          xs,
          ys,
          null,
          length(xs),
          length(ys),
          inversions
        );
        const sorted_list = head(sorted_list_and_count);
        const total_inversions = tail(sorted_list_and_count);
  
        return pair(sorted_list, total_inversions);
      }
    }
    function merge_sort_count(xs_and_count) {
      const xs = head(xs_and_count);
      const inversions = tail(xs_and_count);
      if (is_null(xs) || is_null(tail(xs))) {
        return pair(xs, 0);
      } else {
        const mid = middle(length(xs));
        const list_and_count = merge(
          merge_sort_count(pair(take(xs, mid), 0)),
          merge_sort_count(pair(drop(xs, mid), 0))
        );
        return list_and_count;
      }
    }
    return tail(merge_sort_count(pair(arr, 0)));
}
  
  const h = list(0.5, 0.4, 0.1, 0.2);
  
  graderVer1(h);