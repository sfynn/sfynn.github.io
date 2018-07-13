 var r = 0;
    var g = 0;
    var b = 0;
    
    

var myText; //Your text
var wghtValue = 0; //Variable for controlling the wght parameter of your font
var italValue = 0; //Variable for controlling the wght parameter of your font

var maxWght = 700;
var minWght = 100;

var maxItal = 700;
var minItal = 100;


//hand interaction
let rightHandX = 0;
let rightHandY = 0;
var x = 0;
var y = 0;
var smoothValue = 0.5;

//let myFontSizeLerped = 0;


//posenet
var video;
var poseNet;
let poses = [];
let skeletons = [];





function setup() { 
    myText = document.getElementById("text");
    
    createCanvas(640,480);
    
    //posenet
    video = createCapture(VIDEO);
  video.size(width, height);
    poseNet = ml5.poseNet(video, 'single', gotPoses);
  video.hide();
    
    
    
}

function draw() { 
   // background(255,0,0);
  image(video, 0, 0, width, height);
    //background(0,255,0);
    //The variable wghtValue controls the wght of your font.
    //Drag and drop it onto https://www.axis-praxis.org/ to see its boundaries
        drawKeypoints();
  drawSkeleton();
    
    //adding hand control
     //let myFontSize = leftHandX/2 - rightHandX/2;
    //myFontSizeLerped = lerp(myFontSizeLerped, myFontSize, 0.05);
    
   x = lerp(x, rightHandX, smoothValue);
    y = lerp(y, rightHandY, smoothValue)
    
    wghtValue = round(map(x, 0, width, minWght, maxWght));
    italValue = round(map(x, 0, width, minItal, maxItal));
    
   
    
    var c = map(rightHandY, 0, width, 0, 255)
    
    var settings = "font-variation-settings: " + '"' + "SKLA" + '" ' + wghtValue + "," + '"' + "WMX2" + '" ' + italValue + ";color: rgb("+r+", "+c+", "+b+");";
    
    
    myText.setAttribute("style", settings);
    
    text("wghtValue: " + wghtValue +"   italValue: " + italValue, 10, 10);
}

function drawKeypoints()  {
  for (let i = 0; i < poses.length; i++) {
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      let keypoint = poses[i].pose.keypoints[10];
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

function drawSkeleton() {
  for (let i = 0; i < poses.length; i++) {
    for (let j = 0; j < poses[i].skeleton.length; j++) {
      let partA = poses[i].skeleton[j][0];
      let partB = poses[i].skeleton[j][1];
      stroke(255, 0, 0);
      //line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
} 

function gotPoses(results) {
   rightHandX = results[0].pose.keypoints[10].position.x;
    rightHandY = results[0].pose.keypoints[10].position.y;
    poses = results;
}
