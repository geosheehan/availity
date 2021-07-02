function fizzbuzz(n, keywords) {
	// If n % 3 == 0 return fizz
	// if n % 5 == 0 return buzz
	// if n % both == 0 return fizzbuzz

	for (let i = 1; i <= n; i++) {
		let output = '';

		for (const num in keywords) {
			if (i % num === 0) output += keywords[num];
		}

		// if (i % 3 === 0) output = 'Fizz';
		// if (i % 5 === 0) output += 'Buzz';
		// if (i % 8 === 0) output += 'Bang';

		console.log(`${i}: ${output}`);
	}
}

fizzbuzz(16, { 3: 'Fizz', 5: 'Buzz', 8: 'Bang' });
