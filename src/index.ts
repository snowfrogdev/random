declare const d3: any

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');

ctx.translate(0, canvas.height);
ctx.scale(1, -1);
ctx.fillStyle = 'black';
/*
for (let y = 0; y < 512; y++) {
  for (let x = 0; x < 512; x++) {
    if (getRandomIntInclusive(0, 1) === 1) {
      ctx.fillRect(x, y, 1, 1);
    }
  }
}
*/

const arr: number[] = Array(1024);
arr.fill(0, 0, 1024);

function loop(i = 0) {
  if (i < 110e3) {
    const index = getRandomIntInclusiveNormal(0, 1024, 1);
    const count = arr[index]++;
    ctx.fillRect(index, count, 1, 1);
    if (i % 100 === 0) {
      setTimeout(() => loop(i + 1));
    } else {
      loop(i + 1);
    }
  }
}
loop();

function randn_bm(min: number, max: number, skew: number) {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range
  num = Math.pow(num, skew); // Skew
  num *= max - min; // Stretch to fill range
  num += min; // offset to min
  return num;
}

function getRandomIntInclusiveNormal(min: number, max: number, skew = 1) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(randn_bm(0, 1, skew) * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
