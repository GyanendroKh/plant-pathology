const fs = require('fs/promises');
const fsSync = require('fs');
const path = require('path');
const join = path.join;

(async () => {
  const datasetDir = 'dataset';
  const dataDir = 'data';

  const trainRaw = (await fs.readFile(join(dataDir, 'train.csv')))
    .toString()
    .split('\n');
  const trainHeaders = trainRaw[0].split(',');
  const trainData = trainRaw
    .slice(1)
    .map((r) => r.split(','))
    .filter((r) => r.length === 5);

  const trainDataset = new Map();

  trainData.forEach((d) => {
    const name = d[0];
    const healthIndex = d.findIndex((c) => c === '1');
    const health = trainHeaders[healthIndex];

    trainDataset.set(name, health);
  });

  const testRaw = (await fs.readFile(join(dataDir, 'test.csv')))
    .toString()
    .split('\n');
  const testDataset = testRaw
    .slice(1)
    .map((t) => t.trim())
    .filter((t) => t !== '');

  const trainDir = 'train';
  const validationDir = 'validation';

  // Creating directories...
  trainHeaders.slice(1).forEach((h) => {
    [trainDir, validationDir].forEach((d) => {
      const p = join(datasetDir, d, h);

      if (!fsSync.existsSync(p)) {
        fsSync.mkdirSync(path.join(datasetDir, d, h), {
          recursive: true,
        });
      }
    });
  });

  if (!fsSync.existsSync(join(datasetDir, 'test'))) {
    await fs.mkdir(join(datasetDir, 'test'));
  }

  console.log('Training Dataset...');
  Array.from(trainDataset).forEach(([d, h], i) => {
    console.log(d, h);
    const fileName = `${d}.jpg`;
    const src = join(dataDir, 'images', fileName);
    let type = 'train';

    if (i > 1100) {
      type = 'validation';
    }

    const dest = join(datasetDir, type, h, fileName);
    fsSync.copyFileSync(src, dest);
  });

  console.log('Testing Dataset...');
  Array.from(testDataset).forEach((d) => {
    console.log(d);
    const fileName = `${d}.jpg`;
    const src = join(dataDir, 'images', fileName);
    const dest = join(datasetDir, 'test', fileName);
    fsSync.copyFileSync(src, dest);
  });
})();
