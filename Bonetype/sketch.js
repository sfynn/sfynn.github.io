// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video; //this is: webcam via createCapture
let poseNet; //this is:
let poses = []; //this is :
let skeletons = []; //this is:



let strokeWght = 40;
let weightArr = [20, 40, 60];
let weightArrIndex;

let directionArr = ["continuously", "vertical", "horisontal", "random"];


let lerpVal;

function setup() {
    myCanvas = createCanvas(640, 480);
    myCanvas.parent("thisCanvas");
    video = createCapture(VIDEO); 
    video.size(width, height);
    angleMode(DEGREES);
    ellipseMode(CENTER);
    
    //frameRate(20);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, 'single', gotPoses); //single = single detection, gotPoses = callback

  // Hide the video element, and just show the canvas
  video.hide();
    
    //sliders creation
    
    sSlider = createSlider(0, 2, 1);
    sSlider.parent("sSliderID");
    
    VHslider = createSlider(0, 3, 0);
    VHslider.parent("VHsliderID");
    
    VidSlider = createSlider(0, 1, 1);
    VidSlider.parent("VidSliderID");
}

function draw() {
    if (VidSlider.value() == 0 ){
        image(video, 0, 0, width, height); //paints the video as images
    }
    else {
        background(255);    
    }
    
    
    

    weightArrIndex = sSlider.value();
    // We can call both functions to draw all keypoints and the skeletons
    drawKeypoints();
    //drawSkeleton();
    
    /*
    noFill();
    stroke(255);
    strokeWeight(2);
    ellipse(width/2, height/2, eyeDistX, eyeDistX);
    
    //ellipse(width/2, height/2, yNose, yNose);
    
    translate(width/2, height/2);
    rotate(eyeDistX);
    line(-eyeDistX/2, 0, eyeDistX/2, 0);*/
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {

  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
        let k = j + 1;
        //console.log(k);
        
        let keypoint = poses[i].pose.keypoints[j];
        
        
        let keypointB = poses[i].pose.keypoints[k];
            
            
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        
          
          

        stroke(0);
        strokeCap(PROJECT);
          
          
        var keypointBXLerped = lerp(keypoint.position.x, keypointB.position.x, 0.8);
        var keypointBYLerped = lerp(keypoint.position.y, keypointB.position.y, 0.8);  
        
        if (directionArr[VHslider.value()] == "vertical"){
            keypointBXLerped = keypoint.position.x;
        }  
        
        if (directionArr[VHslider.value()] == "horisontal"){
            keypointBYLerped = keypoint.position.y;
        } 
          
        if (directionArr[VHslider.value()] == "random"){
            keypointBXLerped = random(keypoint.position.x);
            keypointBYLerped = random(keypoint.position.y);
        } 
          
          
          
        //turn straight    
        strokeWeight(weightArr[weightArrIndex]);
        line(keypoint.position.x, keypoint.position.y, keypointBXLerped, keypointBYLerped);
      }
    }
  }
    
    //text(xPos, 10, 30);
    
}

function drawSkeleton() {
    
    /*
  for (let i = 0; i < poses.length; i++) {
    for (let j = 0; j < poses[i].skeleton.length; j++) {
        rndSkelNum = poses[i].skeleton.length;
        

        
        
        let partA = poses[i].skeleton[j][0];
        let partB = poses[i].skeleton[j][1];
        stroke(0);
        strokeCap(PROJECT);
        strokeWeight(40);
      
        if (random(1) > 0.5){
            line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        } */   
            
    }
  


// The callback that gets called every time there's an update from the model
function gotPoses(results) {

    poses = results;
    
    
    /*xNose = results[0].pose.keypoints[0].position.x;
    yNose = results[0].pose.keypoints[0].position.y;
    
    xLeftEye = results[0].pose.keypoints[1].position.x;
    yLeftEye = results[0].pose.keypoints[1].position.y;
    
    xRightEye = results[0].pose.keypoints[2].position.x;
    yRightEye = results[0].pose.keypoints[2].position.y;
    
    eyeDistX = xLeftEye - xRightEye;
    eyeDistY = yLeftEye - yRightEye;
    
    leftHandX = results[0].pose.keypoints[9].position.x;
    leftHandY = results[0].pose.keypoints[9].position.y;
    
    rightHandX = results[0].pose.keypoints[10].position.x;
    rightHandY = results[0].pose.keypoints[10].position.y;*/
    
    
    //console.log("leftHandX" + leftHandX);
    //console.log("leftHandY" + leftHandY);
}


function keyPressed() {
    console.log("keypressed");
    saveCanvas(myCanvas, 'myCanvas', 'jpg');
}











