(function($){
    var displayPrizes = [prizeTea, prizeCoffee, prizeEspresso];
    var reelDiv = "<div class='reel' id='reel1'><div class='inner-reel'><div>coffee maker</div><div>teapot</div><div>espresso machine</div><div>coffee maker</div><div>teapot</div><div>espresso machine</div></div></div><div class='reel' id='reel2'><div class='inner-reel'><div>coffee filter</div><div>tea strainer</div><div>espresso tamper</div><div>coffee filter</div><div>tea strainer</div><div>espresso tamper</div></div></div><div class='reel' id='reel3'><div class='inner-reel'><div>coffee grounds</div><div>loose tea</div><div>ground espresso beans</div><div>coffee grounds</div><div>loose tea</div><div>ground espresso beans</div></div></div>";
    var hasBeenClicked = false;

    $('#slot-machine').html(reelDiv);
    $('.spin').on('click',function(){
        if (hasBeenClicked) return;
        hasBeenClicked = true;
        resetGame();
        var divIds = ['#reel1','#reel2','#reel3'];
        var endNum = [];
        var itemDivHeight = 110;
        var finalStopPos = 421;
        var initialPos = '-91px';
        var reelCount = 3;
        function executeSpin(divId, finalPosition){
            var $reel = $(divId + ' .inner-reel');
            var loopCount = 0;
            var speed = 500;
            spinReel();
            function spinReel(){
                $reel.css('top', initialPos)
                $reel.animate( {
                    top: "-" + finalStopPos + "px"
                }, speed, 'linear',function(){
                    loopCount++;
                    speed += speed * .2
                    $reel.css('top', initialPos)
                    if (loopCount < 4) {
                        spinReel(divId, finalPosition);
                    }
                    else {
                        $reel.animate( {
                            top: finalPosition
                        }, speed, 'linear',declareWinner);

                    }
                });
            };
        }
        for (var i = 0; i < reelCount; i++){
            endNum[i] = Math.floor( Math.random() * reelCount);
            var finalPositions = "-" + (finalStopPos - (itemDivHeight * endNum[i])) + "px";
            executeSpin(divIds[i],finalPositions);
        };
        function declareWinner(){
            $("#handle-joint1").removeClass("pullHandle");
            $("#handle-joint2").removeClass("pullHandle");
            hasBeenClicked = false;
            if (endNum[0]===endNum[1] && endNum[0]===endNum[2]) {
                prizeWon(displayPrizes[endNum[0]]);
            }
            else {
                $("#win-status").html('<span id="lost">You lost. Spin again.</span>');
            }
        };
    });


})(jQuery);


var openDoor = function(prizeFunc){
    $(".images").css({
        'display': 'flex',
        'height': '0px'
    });
    $("#tray-door").animate( {
        height: "10px"
        }, 400, 'linear',function(){
            prizeFunc();
        })
};

var closeDoor = function(){
    $("#tray-door").animate( {
        height: "110px"
        }, 400, 'linear')
};

var prizeWon = function(prizeFunc){
    $("#win-status").addClass('winner');
    $("#win-status").html('<span id="lost">WINNER!</span>');
    $(".led-orange").addClass('blink-orange');
    $(".led-blue").addClass('blink-blue');
    openDoor(prizeFunc);
};

function prizeTea(){
    $("#tea-img").animate({height: "72px"},800,'linear')
};

function prizeEspresso(){
    $("#espresso-img").animate({height: "50px"},800,'linear')
};

function prizeCoffee(){
    $("#coffee-img").animate({height: "82px"},800,'linear')
};

function buttonPush(){
    $("#handle-joint1").addClass("pullHandle");
    $("#handle-joint2").addClass("pullHandle");
    $("#handle-arm").animate({top: "300px",
        height: "0px"
    },1000,'linear',function(){
        $("#handle-arm").animate({
            top: "45px",
            height: "240px"
        },1000,'linear');
    });
    $("#handle-ball").animate({
        top: "258px",
        height: "64px",
        width: "64px",
        left: "14px"
    },1000,'linear',function(){
        $("#handle-ball").animate({
        top: "10px",
        height: "39px",
        width: "39px",
        left: "27px"
    },1000,'linear');
    });
}

function resetGame(){
    buttonPush();
    closeDoor();
    $("#win-status").removeClass('winner');
    $("#win-status").html('');

    $(".led-orange").removeClass('blink-orange');
    $(".led-blue").removeClass('blink-blue');
}