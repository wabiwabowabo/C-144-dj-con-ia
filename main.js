song = "";

scoreRightWrist = 0; 
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function preload(){
    song = loadSound("music.mp3")
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded(){
    console.log("listo para el codigo")
}

function gotPoses(results){
    console.log(results);

scoreRightWrist = results[0].pose.keypoints[10].score; 
scoreLeftWrist = results[0].pose.keypoints[9].score;

rightWristX = results[0].pose.rightWrist.x - 50;
rightWristY = results[0].pose.rightWrist.y;

leftWristX = results[0].pose.leftWrist.x;
leftWristY = results[0].pose.leftWrist.y;


}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.2)
	{ 
		circle(rightWristX,rightWristY,20);


		if(rightWristY >0 && rightWristY <= 100)
		{
			document.getElementById("speed").innerHTML = "Velocidad = 0.5x";		
			song.rate(0.5);
		}
		else if(rightWristY >100 && rightWristY <= 200)
		{
			document.getElementById("speed").innerHTML = "Velocidad = 1x";		
			song.rate(1);
		}
		else if(rightWristY >200 && rightWristY <= 300)
		{
			document.getElementById("speed").innerHTML = "Velocidad = 1.5x";		
			song.rate(1.5);
		}
		else if(rightWristY >300 && rightWristY <= 400)
		{
			document.getElementById("speed").innerHTML = "Velocidad = 2x";		
			song.rate(2);
		}
		else if(rightWristY >400)
		{
			document.getElementById("speed").innerHTML = "Velocidad = 2.5x";		
			song.rate(2.5);
		}
	}

	if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);
		InNumberleftWristY = Number(leftWristY);
		new_leftWristY = floor(InNumberleftWristY *2);
		leftWristY_divide_1000 = new_leftWristY/1000;
		document.getElementById("volume").innerHTML = "Volumen = " + leftWristY_divide_1000;		
		song.setVolume(leftWristY_divide_1000);	
	}
}
 


function play(){
    song.play();
}

