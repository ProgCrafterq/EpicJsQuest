let timeStorage = localStorage;
let time;

if (timeStorage.getItem("time") != null) {
    time = parseInt(timeStorage.getItem("time"));
} else {
    time = 300;
    timeStorage.setItem("time", time);
}
let answer = [
    "garry potter", "sponge bob","minecraft", "simpsons", "star wars", "king lion", "frozen heart",
    "shrek", "shrek", "rocky", "indiana johns", "home alone", "terminator", "back to future", "ghost busters"
];
let progress = 0;

let was = [];

let num = Math.floor(Math.random() * 15 + 1);
StartSong(num);

function StartSong(arg) {
    $("#melody").attr("src", `sound/${arg}.mp3`);

}
$(document).ready(function () {
    $(".time").knob({
        "min": 0,
        "max": 300,
        "angleOffset": 0,
        "readOnly": true,
        "width": "100%",
        "thickness": 0.2,
        "displayInput": false,
        "bgColor": "lightblue",
        "fgColor": "orange",
        "lineCap": "round"
    });
    $(".progress").knob({
        "min": 0,
        "max": 10,
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
    $(".slideRules").click(function () {
        $("#rules").slideToggle();
    })
    $("#start").click(function () {
        $(this).css("display", "none");
        $(".sound").css("display", "block")
        startTime();
    })
    $("#btnTask").click(function () {
        if ($("#inputTask").val().toLowerCase() === answer[num - 1]) {
            alertify.success("Right Answer!");
            progress++;
            $(".progress").val(progress).trigger("change");
            $("#inputTask").val("");
            was.push(num);
            if (progress < 10) {
                do {
                    num = Math.floor(Math.random() * 15 + 1);
                } while (was.includes(num))
                StartSong(num);
            } else {
                $(".sound, #btnTask, #inputTask").css("display", "none");
                $("#nextTask").css("display", "flex");
                localStorage.removeItem("time");
            }
        } else {
            alertify.error("Wrong answer!")
        }

    
    })
})
function startTime() {
    setInterval(function() {
        time = parseInt(localStorage.getItem("time")) - 1;
        $(".time").val(time).trigger("change");
        if (time > 0) {
            localStorage.setItem("time", time);
        } else if (time == 0) {
            alertify.error("Time is out!");
            setTimeout(() => window.open("task1.html", "_self"), 2000);
            localStorage.removeItem("time");
        }
    }, 1000);
}

