let assert = require('assert');

/**
 * Checks the LISP string to see if all parentheses are properly closed and nested
 * @param {string} lispStr - input string of list code
 * @return {boolean} true if all parentheses are properly closed and nested, otherwise false
 */
function checkParentheses(lispStr) {
	let count = 0;
	for (let c of lispStr) {
		if (c === '(') count++;
		else if (c === ')') count--;

		// Bad nesting
		// The first time we hit a close while having no opens, then return false
		if (count < 0) return false;
	}
	// Making it here means nesting is fine, now to check the count

	// If the count is 0, then there are exactly equal ( and )
	return count === 0;
}

/**
 * Test cases
 */
// assert(checkParentheses(''), 'Expected empty string to return true.')
// assert(checkParentheses('()'), 'Expected "()" to return true.');
// assert(!checkParentheses('())'), 'Expected "())" to return false.');
// assert(!checkParentheses('())('), 'Expected "())(" to return false.');
// assert(checkParentheses('(a)'), 'Expected "(a)" to return true.');
// assert(!checkParentheses('(a('), 'Expected "(a(" to return false.');
// assert(checkParentheses('((())())'), 'Expected "((())())" to return true.');
