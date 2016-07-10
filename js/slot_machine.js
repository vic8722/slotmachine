(function($){
    var prizes = ['a tea', 'a coffee', 'an espresso'];
    var displayPrizes = [prizeTea, prizeEspresso, prizeCoffee];
    var reelDiv = "<div class='reel' id='reelOne'><div class='innerReel'><div>coffee maker</div><div>teapot</div><div>espresso machine</div><div>coffee maker</div><div>teapot</div><div>espresso machine</div></div></div><div class='reel' id='reelTwo'><div class='innerReel'><div>coffee filter</div><div>tea strainer</div><div>espresso tamper</div><div>coffee filter</div><div>tea strainer</div><div>espresso tamper</div></div></div><div class='reel' id='reelThree'><div class='innerReel'><div>coffee grounds</div><div>loose tea</div><div>ground espresso beans</div><div>coffee grounds</div><div>loose tea</div><div>ground espresso beans</div></div></div>";

    $('#slotMachine').html(reelDiv);
    $('#playFancy').on('click',function(){
        closeDoor();
        $("#winner").removeClass('winner');
        $("#winner").html('');

        $(".led-orange").removeClass('blink-orange');
        $(".led-blue").removeClass('blink-blue');
        console.log("i'm clicked")
        $('#winnerStatus').html('');
        var divIds = ['#reelOne','#reelTwo','#reelThree'];
        var endNum = [];
        var itemDivHeight = 60;
        var finalStopPos = 230;
        var initialPos = '-50px';
        var reelCount = 3;
        function executeSpin(divId, finalPosition){
            var $reel = $(divId + ' .innerReel');
            var loopCount = 0;
            var speed = 500;
            spinReel();
            function spinReel(){
                $reel.css('top', initialPos)
                $reel.animate( {
                    top: "-230px"
                }, speed, 'linear',function(){
                    loopCount++;
                    speed += speed * .2
                    $reel.css('top', initialPos)
                    if (loopCount < 4) {
                        spinReel(divId, finalPosition);
                    }
                    else {
                        console.log(speed + 'is speed - div is' + divId)
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
            executeSpin(divIds[i],finalPositions,declareWinner);
        };
        endNum = [endNum[0],endNum[0],endNum[0]]; // just for testing... always make a win.
        function declareWinner(){
            var message;
            if (endNum[0]===endNum[1] && endNum[0]===endNum[2]) {
                message = 'Congratulations you won '+ prizes[endNum[0]] + '!!';
                prizeWon(displayPrizes[endNum[0]]);
            }
            else {
                message = 'Rats! Try again?';
            }
            $('#winnerStatus').html(message);
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
            console.log(prizeFunc);
            prizeTea();
            prizeFunc();
        })
};

var closeDoor = function(){
    $("#tray-door").animate( {
        height: "110px"
        }, 400, 'linear',function(){

        })
};

var prizeWon = function(prizeFunc){
    $("#winner").addClass('winner');
    $("#winner").html('WINNER!');
    $(".led-orange").addClass('blink-orange');
    $(".led-blue").addClass('blink-blue');

    openDoor(prizeFunc);
};

var prizeTea = function(){
    $("#tea-img").animate({height: "72px"},800,'linear')
};

var prizeEspresso = function(){
    $("#tea-img").animate({height: "50px"},800,'linear')
};

var prizeCoffee = function(){
    $("#tea-img").animate({height: "82px"},800,'linear')
};