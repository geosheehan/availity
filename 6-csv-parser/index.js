let fs = require('fs');

const input = './data/';
const output = './output/';

const files = fs.readdirSync(input);
const parsed = parseFiles(files.filter((file) => file.endsWith('.csv')));
writeFiles(parsed);

function parseFiles(files) {
	const data = {};
	for (const file of files) {
		const contents = fs.readFileSync(`${input}${file}`, 'utf8');

		contents.split('\r\n').forEach((line) => {
			if (!line.length) return;

			const [id, first, last, version, company] = line.split(',');
			if (!(company in data)) data[company] = {};

			if (
				!(id in data[company]) ||
				data[company][id].version < parseInt(version)
			) {
				data[company][id] = {
					first,
					last,
					version: parseInt(version),
				};
			}
		});
	}
	return data;
}

function writeFiles(parsed) {
	for (const company in parsed) {
		const sorted = [];

		// Put the IDs back into the data rows
		for (const id in parsed[company]) {
			sorted.push({
				id,
				...parsed[company][id],
			});
		}

		// Sort by last, first ASC
		const content = sorted
			.sort((a, b) => {
				if (a.last < b.last) return -1;
				if (b.last < a.last) return 1;

				if (a.first < b.first) return -1;
				if (b.first < a.first) return 1;
				return 0;
			})
			.map((line) => `${Object.values(line).join(',')}\r\n`)
			.join('');

		fs.writeFileSync(`${output}${company}.csv`, content);
	}
}
