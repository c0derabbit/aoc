const fs = require('fs');
const runTest = require('./test');
const tests = require('./tests/06.test');

runTest(distributeBlocks, tests.suite1);

fs.readFile('./inputs/06.input', 'utf8', (err, data) => {
  if (err) throw err;
  const input = data.trim();
  console.log(`Part 1 & 2: ${distributeBlocks(input)}`);
});

function distributeBlocks(input) {
  let banks = input.split('\t').map((n) => parseInt(n));
  let snapshots = [String(banks)];
  while (true) {
    const blocks = Math.max.apply(null, banks);
    const largestBankIdx = banks.indexOf(blocks);
    banks[largestBankIdx] = 0;
    for (let i = 1; i < blocks + 1; i++) {
      banks[(largestBankIdx + i) % banks.length] += 1;
    }
    if (snapshots.indexOf(String(banks)) > -1) {
      console.log(snapshots.length - snapshots.indexOf(String(banks)));
      return snapshots.length;
    }
    snapshots.push(String(banks));
  }
}
