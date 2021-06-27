const fs = require('fs');
const readline = require('readline');

const input = './data/';
const output = './output/';

fs.readdir(input, handleFiles);

async function handleFiles(err, files) {
   if (err) {
      return console.log(err);
   }
   const data = await readData(files);
   writeData(data);
}

async function readData(files) {
   // Loop through the files found in the input directory
   const readFiles = async () => {
      const data = {};

      for (let file of files) {
         if (!file.endsWith('.csv')) return; // ignore non csv files

         // Open a file stream
         const fileStream = fs.createReadStream(`${input}${file}`);
         const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity, // Ignores empty lines
         });

         // Read the file line by line
         for await (const line of rl) {
            const [id, first, last, version, company] = line.split(',');

            if (!(company in data)) data[company] = {};

            if (!(id in data[company]) || (data[company][id].version < version)) {
               data[company][id] = {
                  first,
                  last,
                  version: parseInt(version),
               }
            }
         }

      }

      return data;
   }

   return await readFiles();
}

async function writeData(data) {
   const sortedData = {}
   for (let company in data) {
      sortedData[company] = [];
      for (let id in data[company]) {
         sortedData[company].push({
            id,
            ...data[company][id]
         });
      }
      sortedData[company].sort((a, b) => {
         // sort by last name
         if (a.last < b.last) return -1;
         if (b.last < a.last) return 1;
         // then by first name
         if (a.first < b.first) return -1;
         if (b.first < a.first) return 1;
         return 0;
      });

   }
   console.log(sortedData);
}