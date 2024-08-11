let answer = ["яблуко", "груша", "город", "школа", "сайт", "браузер",
    "плагін", "колір", "стиль", "язик", "узор", "сорока"];

let was = [];
let progress = 0;

let num = Math.floor(1 + Math.random() * 12);
startRebus(num);

$(document).ready(function () {
    $(".progress").knob({
        "min": 0,
        "max": 5,
        "angleOffset": -60,
        "angleArc": 120,
        "readOnly": true,
        "width": "100%",
        "lineCap": "round",
        "thickness": 0.2,
        "displayInput": false,
        "bgColor": "lightgreen",
        "fgColor": "red"

    })
    $(".btnAnswer").click(function () {
        if ($("#inputAnswer").val().toLowerCase() === answer[num - 1]) {
            alertify.success("Right answer!");
            $("#inputAnswer").val("");
            progress += 1;
            $(".progress").val(progress).trigger("change")
            was.push(num);
            if (progress < 5) {
            do{
            num = Math.floor(Math.random()* 12 + 1);
            }while(was.includes(num))
                startRebus(num);
            }else {
                $("#rebusImg, #inputAnswer, .btnAnswer").css("display", "none");
                $(".nextTask").css("display", "flex");
            }
        }else {
            alertify.error("Wrong answer!")
        }
        
    })

})

function startRebus(arg) {
    $("#rebusImg").attr("src", `rebuses/${arg}.jpg`)
}