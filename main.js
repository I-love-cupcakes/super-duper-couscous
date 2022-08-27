img = "";
status = "";
objects = [];

function preload()
{}

function setup()
{
    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();
}
function start()
{ 
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results)
{
    if (error) 
    {
        console.log(error);
    }

    console.log(results);
    objects = results;
}

function draw()
{
    image(video, 0, 0, 400, 400);
    if(status !="")
    {
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;
            fill("#DE3C4B");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#216869");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects > 0)
            {
                document.getElementById("status").innerHTML = "Baby Detected";
            }

            else
            {
                document.getElementById("status").innerHTML = "Baby not Detected";
            }
        }
    }
    

}