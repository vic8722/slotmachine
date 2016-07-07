(function($){
    var prizes = ['a tea', 'a coffee', 'an espresso'];
    var reelDiv = "<div class='reel' id='reelOne'><div class='innerReel'><div>coffee maker</div><div>teapot</div><div>espresso machine</div><div>coffee maker</div><div>teapot</div><div>espresso machine</div></div></div><div class='reel' id='reelTwo'><div class='innerReel'><div>coffee filter</div><div>tea strainer</div><div>espresso tamper</div><div>coffee filter</div><div>tea strainer</div><div>espresso tamper</div></div></div><div class='reel' id='reelThree'><div class='innerReel'><div>coffee grounds</div><div>loose tea</div><div>ground espresso beans</div><div>coffee grounds</div><div>loose tea</div><div>ground espresso beans</div></div></div>";

    $('#slotMachine').html(reelDiv);
    $('#playFancy').on('click',function(){
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
        function declareWinner(){
            var message;
            if (endNum[0]===endNum[1] && endNum[0]===endNum[2]) {
                message = 'Congratulations you won '+ prizes[endNum[0]] + '!!';
            }
            else {
                message = 'Rats! Try again?';
            }
            $('#winnerStatus').html(message);
        };
        // function finalRotation(){

        // }
    });


    // var base = $('#slot')
    // base.setup = function() {

    //         // set sizes

    //         var $list = this;

    //         base.liHeight = 25;
    //         base.liWidth = 25;

    //         base.liCount = 3;

    //         base.listHeight = base.liHeight * base.liCount;

    //         base.increment = (7000 / 3) / 3;

    //         $list.css('position', 'relative');

    //         base.$wrapper = $list.wrap('<div class="jSlots-wrapper"></div>').parent();

    //         // remove original, so it can be recreated as a Slot
    //         base.$el.remove();

    //         // clone lists
    //         for (var i = base.options.number - 1; i >= 0; i--){
    //             base.allSlots.push( new base.Slot() );
    //         }

    //     };

    //     base.bindEvents = function() {
    //         $(base.options.spinner).bind(base.options.spinEvent, function(event) {
    //             if (!base.isSpinning) {
    //                 base.playSlots();
    //             }
    //         });
    //     };

    // // Slot contstructor
    //     base.Slot = function() {

    //         this.spinSpeed = 0;
    //         this.el = base.$el.clone().appendTo(base.$wrapper)[0];
    //         this.$el = $(this.el);
    //         this.loopCount = 0;
    //         this.number = 0;

    //     };


    //     base.Slot.prototype = {

    //         // do one rotation
    //         spinEm : function() {

    //             var that = this;

    //             that.$el
    //                 .css( 'top', -base.listHeight )
    //                 .animate( { 'top' : '0px' }, that.spinSpeed, 'linear', function() {
    //                     that.lowerSpeed();
    //                 });

    //         },

    //         lowerSpeed : function() {

    //             this.spinSpeed += base.increment;
    //             this.loopCount++;

    //             if ( this.loopCount < base.options.loops ) {

    //                 this.spinEm();

    //             } else {

    //                 this.finish();

    //             }
    //         },

    //         // final rotation
    //         finish : function() {

    //             var that = this;

    //             var endNum = base.randomRange( 1, base.liCount );

    //             var finalPos = - ( (base.$liHeight * endNum) - base.$liHeight );
    //             var finalSpeed = ( (this.spinSpeed * 0.5) * (base.liCount) ) / endNum;

    //             that.$el
    //                 .css( 'top', -base.listHeight )
    //                 .animate( {'top': finalPos}, finalSpeed, base.options.easing, function() {
    //                     base.checkWinner(endNum, that);
    //                 });

    //         }

    //     };

    //     base.checkWinner = function(endNum, slot) {

    //         base.doneCount++;
    //         // set the slot number to whatever it ended on
    //         slot.number = endNum;

    //         // if its in the winners array
    //         if (
    //             ( $.isArray( base.options.winnerNumber ) && base.options.winnerNumber.indexOf(endNum) > -1 ) ||
    //             endNum === base.options.winnerNumber
    //             ) {

    //             // its a winner!
    //             base.winCount++;
    //             base.winners.push(slot.$el);

    //         }

    //         if (base.doneCount === base.options.number) {

    //             var finalNumbers = [];

    //             $.each(base.allSlots, function(index, val) {
    //                 finalNumbers[index] = val.number;
    //             });

    //             if ( $.isFunction( base.options.onEnd ) ) {
    //                 base.options.onEnd(finalNumbers);
    //             }

    //             if ( base.winCount && $.isFunction(base.options.onWin) ) {
    //                 base.options.onWin(base.winCount, base.winners, finalNumbers);
    //             }
    //             base.isSpinning = false;
    //         }
    //     };


    //     base.playSlots = function() {

    //         base.isSpinning = true;
    //         base.winCount = 0;
    //         base.doneCount = 0;
    //         base.winners = [];

    //         if ( $.isFunction(base.options.onStart) ) {
    //             base.options.onStart();
    //         }

    //         $.each(base.allSlots, function(index, val) {
    //             this.spinSpeed = 0;
    //             this.loopCount = 0;
    //             this.spinEm();
    //         });

    //     };


    //     base.onWin = function() {
    //         if ( $.isFunction(base.options.onWin) ) {
    //             base.options.onWin();
    //         }
    //     };

})(jQuery);