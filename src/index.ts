// Import stylesheets
import './style.css';

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');

ctx.fillStyle = 'black';

for (let y = 0; y < 2048; y++) {
  for (let x = 0; x < 2048; x++) {
    if (getRandomIntInclusive(0, 1) === 1) {
      ctx.fillRect(x, y, 1, 1)
    }
  }
}


function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}


