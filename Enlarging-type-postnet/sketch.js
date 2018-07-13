let video;
let poseNet;
let poses = [];
let skeletons = [];

let leftHandX = 0;
let rightHandX = 0;

let myFontSizeLerped = 0;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  poseNet = ml5.poseNet(video, 'single', gotPoses);
  video.hide();
}

function draw() {
  image(video, 0, 0, width, height);
  drawKeypoints();
//  drawSkeleton();
    
  let myFontSize = leftHandX/2 - rightHandX/2;

    myFontSizeLerped = lerp(myFontSizeLerped, myFontSize, 0.1);
    
  textAlign(CENTER);
  textSize(myFontSizeLerped/2);
    text("Size", width/2, height/2);
}

function drawKeypoints()  {
  
    for (let i = 0; i < poses.length; i++) {
    
      
      for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      let keypoint = poses[i].pose.keypoints[j];
      
        if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
          
    }
  }
}

//function drawSkeleton() {
  //for (let i = 0; i < poses.length; i++) {
    //for (let j = 0; j < poses[i].skeleton.length; j++) {
      //let partA = poses[i].skeleton[j][0];
      //let partB = poses[i].skeleton[j][1];
      //stroke(255, 0, 0);
      //line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    //}
  //}
//}

function gotPoses(results) {
       //variables holding x,y coordinates for right and left hand
    leftHandX = results[0].pose.keypoints[9].position.x;
    //leftHandY = results[0].pose.keypoints[9].position.y;
    
    rightHandX = results[0].pose.keypoints[10].position.x;
    //rightHandY = results[0].pose.keypoints[10].position.y;
    //goes in the gotPoses() function
    
    
   // console.log("leftHandX" + leftHandX);
  //    console.log("leftHandY" + leftHandY);
    
 //    console.log("rightHandX" + rightHandX);
 //    console.log("rightHandY" + rightHandY);
  poses = results;
}
