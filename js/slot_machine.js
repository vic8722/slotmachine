(function($) {
    var displayPrizes = [prizeFrenchFries, prizeHamburger, prizeSoda];
    var hasBeenClicked = false;
    $('.spin').on('click', function() {
        if (hasBeenClicked) return;
        hasBeenClicked = true;
        resetGame();
        var divIds = ['#reel1', '#reel2', '#reel3'];
        var endNum = [];
        var itemDivHeight = 110;
        var finalStopPos = 421;
        var initialPos = '-91px';
        var reelCount = 3;
        function executeSpin(divId, finalPosition) {
            var $reel = $(divId + ' .inner-reel');
            var loopCount = 0;
            var speed = 500;
            // spinReel takes each reel and animates movement from one position through the list, lowering the speed each full 'spin'.
            function spinReel() {
                $reel.css('top', initialPos)
                $reel.animate({top: '-' + finalStopPos + 'px'}, speed, 'linear', function() {
                    loopCount++;
                    speed +=  speed * .2
                    $reel.css('top', initialPos)
                    if (loopCount < 4) {
                        spinReel(divId, finalPosition);
                    }
                    else {
                        $reel.animate({top: finalPosition}, speed, 'linear', declareWinner);
                    }
                });
            };
            spinReel(); // Triggering spin
        }

        function declareWinner() {
            $('#handle-joint1').removeClass('pull-handle');
            $('#handle-joint2').removeClass('pull-handle');
            hasBeenClicked = false;
            if (endNum[0] === endNum[1] && endNum[0] === endNum[2]) {
                prizeWon(displayPrizes[endNum[0]]);
            }
            else {
                $('#win-status').html('<span id = \'lost\'>You lost. Spin again.</span>');
            }
        };
        for (var i = 0; i < reelCount; i++) {
            endNum[i] = Math.floor( Math.random() * reelCount);
            var finalPositions = '-' + (finalStopPos - (itemDivHeight * endNum[i])) + 'px';
            executeSpin(divIds[i], finalPositions);
        };
    });

    function openDoor(prizeFunc) {
        $('.images').css({
            'display': 'flex',
            'height': '0px'
        });
        $('#tray-door').animate({height: '10px'}, 400, 'linear', prizeFunc)
    };

    function closeDoor() {
        $('#tray-door').animate({height: '110px'}, 400, 'linear')
    };

    function prizeWon(prizeFunc) {
        $('#win-status').addClass('winner');
        $('#win-status').html('<span id = \'winner\'>WINNER!</span>');
        $('.led-orange').addClass('blink-orange');
        $('.led-blue').addClass('blink-blue');
        openDoor(prizeFunc);
    };

    function prizeSoda() {
        $('#soda-img').animate({height: '98px'}, 800, 'linear')
    };

    function prizeFrenchFries() {
        $('#french-fries-img').animate({height: '90px'}, 800, 'linear')
    };

    function prizeHamburger() {
        $('#hamburger-img').animate({height: '82px'}, 800, 'linear')
    };

    // When the SPIN button is pushed or handle is clicked, animate the movement of the handle.
    function buttonPush() {
        $('#handle-joint1').addClass('pull-handle');
        $('#handle-joint2').addClass('pull-handle');
        $('#handle-arm').animate({
            top: '300px',
            height: '0px'
        }, 1000, 'linear', function() {
            $('#handle-arm').animate({
                top: '45px',
                height: '240px'
            }, 1000, 'linear');
        });
        $('#handle-ball').animate({
            top: '258px',
            height: '64px',
            width: '64px',
            left: '14px'
        }, 1000, 'linear', function() {
            $('#handle-ball').animate({
                top: '10px',
                height: '39px',
                width: '39px',
                left: '27px'
            }, 1000, 'linear');
        });
    }

    function resetGame() {
        buttonPush();
        closeDoor();
        $('#win-status').removeClass('winner');
        $('#win-status').html('');

        $('.led-orange').removeClass('blink-orange');
        $('.led-blue').removeClass('blink-blue');
    }

})(jQuery);

