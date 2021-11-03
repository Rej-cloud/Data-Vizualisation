console.log('Loading data...');

let table;

var col = {
  r: 0,
  g: 0,
  b: 0
}

const canvasWidth = window.innerWidth;
const canvasHeight = 2500; // ⚠️ size limit if too long

let randomPosX;
let randomPosX2;
let randomPosX3;

// https://p5js.org/reference/#/p5/loadTable
function preload() {
  table = loadTable('future_cities_data_truncated.csv', 'csv', 'header');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  const barMargin = 10;
  const barHeight = 30;
 

  print(table.getRowCount() + ' total rows in table');
  print(table.getColumnCount() + ' total columns in table');
  print('All cities:', table.getColumn('current_city'));

  for (let i = 0; i < table.getRowCount(); i++) {
    const city = table.get(i, 'current_city');
    const meanTemp = table.get(i, 'Annual_Mean_Temperature');
    const futureMeanTemp = table.get(i, 'future_Annual_Mean_Temperature');
    const maxTemp = table.get(i,'Max_Temperature_of_Warmest_Month');
    

    position = i*150 +150;
    durchmesser = convertDegreesToDurchmesser(meanTemp);
    durchmesser2 = convertDegreesToDurchmesser(futureMeanTemp);
    durchmesser3= convertDegreesToDurchmesser(maxTemp);

    futurePosition = i*150 +150;
    drawTempFuture(futurePosition);
    drawLabelFuture(futurePosition, city, futureMeanTemp);

    drawTempToday(position);
    drawLabelToday(position, city, meanTemp);

    drawTempMax(position);
    drawLabelMax(position, city, maxTemp);  
  }
}

function convertDegreesToDurchmesser(temp) {
const durchmesser = map(temp, 0, 15, 10, 160);
return durchmesser;
}


function convertDegreesToDurchmesser2(temp) {
  const durchmesser2 = map(temp, 0, 15, 10, 160);
  return durchmesser2;
  }

function convertDegreesToDurchmesser3(temp) {
  const durchmesser3 = map(temp, 0, 15, 10, 160);
  return durchmesser3;
  }

function drawTempToday(pos) {
  col.r = random(0-100);
  col.g = random(0-100);
  col.b = random(200,255);
  fill(col.r, col.g, col.b);
  randomPosX = random(0,width/5);
  circle(randomPosX, pos, durchmesser);
}

function drawTempFuture(pos) {
  col.r = random(200,255);
  col.g = 0;
  col.b = random(0,200);
  fill(col.r, col.g, col.b);
  noStroke();
  randomPosX2 = width/2+random(-200,50);
  circle(randomPosX2, pos, durchmesser2);
}

function drawTempMax(pos) {
  col.r = 0;
  col.g = random(200,255);
  col.b = random(0,200);
  fill(col.r, col.g, col.b);
  noStroke();
  randomPosX3 = width/2+random(350,600);
  circle(randomPosX3, pos, durchmesser3);
}

function drawLabelToday(pos, city, temp) {
  fill(0, 255, 250);
  stroke(255);  
  const label = `${city}: ${temp}°C`;
  textSize(20);
  text(label, randomPosX, pos + 5);
}

function drawLabelFuture(pos, city, temp) {
  fill('blue');
  const label = `${city}: ${temp}°C`;
  textSize(25);
  text(label, randomPosX2, pos + 5);
}

function drawLabelMax(pos, city, temp) {
  fill('red');
  const label = `${city}: ${temp}°C`;
  textSize(30);
  text(label, randomPosX3, pos + 5);
}
