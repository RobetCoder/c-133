
Status = "";
objects = [];
function preload(){
   
    
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

}
function draw(){
    image(video, 0, 0, 380, 380);
    if (Status != "")
    {
      r = random(255);
      g = random(255);
      b = random(255);
        objectDetector.detect(video, gotResults);
        for (i = 0; i<objects.length; i++)
        {
              document.getElementById("status").innerHTML = "Status: Object Identified";
              document.getElementById("objects").innerHTML = "Number of Objects:"+objects.length;
              fill(r,g,b);
              stroke(r,g,b)
              noFill(); 
              percent = floor(objects[i].confidence *100);
              text(objects[i].label+" "+percent+"%" ,objects[i].x, objects[i].y);
              rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

    }
}
function modelLoaded(){
console.log("Model Loaded");
Status = true;
}
function gotResults(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function Start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML ="Status: Identifying Objects";
}