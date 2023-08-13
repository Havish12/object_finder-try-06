status="";
objects=[];

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function start()
{
    video.stop();
    objectDetector.detect(gotResult);
    document.getElementById("status").innerHTML = 'Status: Detecting Objects';   
    utterThis = new SpeechSynthesisUtterance(results[0].status);
    speak(utterThis);
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status=true;
}


function draw()
{
    image(video, 0, 0, 380, 380);

    if(status !="")
    {
        objectDetector.detect(video, gotResult);

        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Objects detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects Detected are : " + objects.length;


            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" + objects[i].x + 15, objects[i].y +15);
            noFill();
            stroke("FF0000");
            rect(objects[i].x, objects[i].y, objects[i],width, objects[i].height);
        }
    }
}

function gotResult()
{
    if(error)
    {
        console.log(error);
    }
    else {console.log(results);}
    objects=results;
    document.getElementById("status").innerHTML = "The object mentioned has been located.";
    



}