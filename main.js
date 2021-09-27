var prediction1 = " ";
var prediction2 = " ";

Webcam.set({
     height: 300,
     width: 350,
     img_format: 'png',
     png_quality: 100
});

Webcam.attach("#webcam_div");

function capture_img(){
     Webcam.snap(function(data_uri){
          document.getElementById("snap_div").innerHTML = '<img id="img_snap" src="' + data_uri + '">';
     });
}

console.log("ml5 ver is " , ml5.version);

var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/gNC_PMXyR/model.json", modelloaded);

function modelloaded(){
     console.log("Model Loaded");
}

function speak(){
     var synth = window.speechSynthesis;
     var spik1 = "First prediction is " + prediction1;
     var spik2 = "And second prediction is " + prediction2;
     var utter = new SpeechSynthesisUtterance(spik1+ spik2);
     synth.speak(utter);
}

function identify_img(){
     var img = document.getElementById("img_snap");

     classifier.classify(img, gotResult);
}

function gotResult(error, result){
     try {
          console.log(result);
          document.getElementById("pre1").innerHTML = result[0].label;
          document.getElementById("pre2").innerHTML = result[1].label;

          prediction1 =  result[0].label;
          prediction2 = result[1].label;

          speak();

          if ( result[0].label == "Happy") {
               document.getElementById("emo_pre1").innerHTML = "😁";
          } else if( result[0].label == "Sad"){
               document.getElementById("emo_pre1").innerHTML = "😔";
          }else if( result[0].label == "Grim"){
               document.getElementById("emo_pre1").innerHTML = "😐";
          }

          if ( result[1].label == "Happy") {
               document.getElementById("emo_pre2").innerHTML = "😁";
          } else if( result[1].label == "Sad"){
               document.getElementById("emo_pre2").innerHTML = "😔";
          }else if( result[1].label == "Grim"){
               document.getElementById("emo_pre2").innerHTML = "😐";
          }

     } catch (error) {
               console.error("There has been a error. Properties are " + error);

     }
}