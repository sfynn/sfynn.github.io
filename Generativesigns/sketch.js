var textTyped = "X";
var textTypedB = "A";
var font;
var inputA = 1;
let tempIndexAdd = 1;
let sample = 1;
let rndBW;

let transX = 0;

let xMove = 0;
let rotation = [0, 90, 180, 270];


//Output ml5js
let video; //this is: webcam via createCapture
let poseNet; //this is:
let poses = []; //this is :
let skeletons = []; //this is:

let xLeftWrist;
let yLeftWrist;

let xLeftWristLerped;
let yLeftWristLerped;

let xRightWrist;
let yRightWrist;





function setup() {
    createCanvas(800, 600);
    video = createCapture(VIDEO); 
    video.size(800, 600);
    //video.hide();
        
    angleMode(DEGREES);

    // Create a new poseNet method with a single detection
    poseNet = ml5.poseNet(video, 'single', gotPoses); //single = single detection, gotPoses = callback

    
    setInterval(handStop, 2000);
    setInterval(handStart, 4000);
    
    background(0);
    noLoop();
    frameRate(20);
    
    opentype.load('assets/Lack-Regular.otf', function(err, f) {
    if (err) {
      console.log(err);
    } else {
      font = f;
      loop();
    }
  });
    
}

function draw() {
        
    
    fill(255);
    background(0);
    
    
    
    drawFirstSign();
    drawSecondSign();
    //drawKeypoints();
    
    xLeftWristLerped = lerp(width/2, xLeftWrist, 0.001);
    yLeftWristLerped = lerp(height/2, yLeftWrist, 0.001);
    
    fill(255,0,0);
    ellipse(xLeftWristLerped, yLeftWrist, 20, 20);
    
    fill(0,0,255);
    ellipse(xRightWrist, yRightWrist, 20, 20);
    
    var sampleMap = map(yLeftWrist, 200, height, 1, 200);
    sample = sampleMap;
    
    
    
    
    }

function makeID() {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    //var possible = "ABDOPQRabdegijopq04689";
    //var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    textTyped = possible.charAt(Math.floor(Math.random() * possible.length));
    textTypedB = possible.charAt(Math.floor(Math.random() * possible.length));
    
    //return textTyped;
}

function makeBW() {
    if (random(1) > 0.5){
        rndBW = 0;
    }
    else {
        rndBW = 255;
    }
}






function drawFirstSign() {
    if (!font) return;

    
    //line(width/2, 0, width/2, height);
    noStroke();

  // margin border
  

    // get a path from OpenType.js
    var fontPath = font.getPath(textTyped, xLeftWrist, 400, 400);
    // convert it to a g.Path object, which is editable in p5js
    var path = new g.Path(fontPath.commands);
      
      // resample it with equidistant points
      path = g.resampleByLength(path, sample);
    
    

      // Drawing character 1
      for (var i = 0; i < path.commands.length; i++) {
        var pnt = path.commands[i];

        if (path.commands[i].type == "M") {
            //console.log("M");
            beginShape();
        }            
        vertex(pnt.x, pnt.y);
        //bezierVertex( width/2, height/2, width/2, height/2, xLeftWrist, yLeftWrist);  
        //console.log(path.commands[i].type);

        if (path.commands[i].type == "Z") {
            //console.log("Z");
            endShape(CLOSE);
            makeBW();
            fill(rndBW);

            //console.log(rndBW);
        }  
    } //character 1 loop
    
}


function drawSecondSign() {
    if (!font) return;
    
        // get a path from OpenType.js
    var fontPath = font.getPath(textTypedB, xRightWrist, 400, 400);
    // convert it to a g.Path object, which is editable in p5js
    var path = new g.Path(fontPath.commands);
      
      // Path explaination : https://www.w3schools.com/graphics/svg_path.asp
      //console.log(path);
      // resample it with equidistant points
      path = g.resampleByLength(path, sample);

      // Drawing character 2
      for (var i = 0; i < path.commands.length; i++) {
        var pnt = path.commands[i];
        //var tempIndex = i + tempIndexAdd;
        //var pntB = path.commands[tempIndex];
          
          
        if (path.commands[i].type == "M") {
            //console.log("M");
            beginShape();
        }    
        vertex(pnt.x, pnt.y);
        //bezierVertex(0.1 * mouseY, 20, 80, 75, 30, 75);  
          
        
        //console.log(path.commands[i].type);
        
        if (path.commands[i].type == "Z") {
            //console.log("Z");
            endShape(CLOSE);
            makeBW();
            fill(rndBW);
            makeID();
            

        }       
  }//character 2 loop
}


function handStop() {
  noLoop();
}

function handStart() {
  loop();
}

function gotPoses(results) {

    poses = results;
    //console.log(results);
    
    xLeftWrist = results[0].pose.keypoints[9].position.x;
    yLeftWrist = results[0].pose.keypoints[9].position.y;
    
     
    
    xRightWrist = results[0].pose.keypoints[10].position.x;
    yRightWrist = results[0].pose.keypoints[10].position.y;
    
    
    
}
/*
function drawKeypoints()  {

  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = poses[i].pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}*/


