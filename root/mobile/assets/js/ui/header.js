$(document).ready(function(){

    /**
     * header on클래스 추가
    **/
    var headerL = (function() {

        var scrollY = 0; // 스크롤 위치 저장

        return {
            headerAni: function() {
                if (scrollY > 0) {
                    $('.headerOn').addClass('on');
                    
                } else {
                    $('.headerOn').removeClass('on');
                }
            },
            // 스크롤 처리
            scrolling: function () {

                scrollY = $(window).scrollTop();
                var documentH = $(document).height();
                var windowH = $(window).height();

                if (documentH > windowH) {
                    this.headerAni();
                }
            }
        };
    })();

    //event
    $(window).on('scroll', function() {
        headerL.scrolling();
    });
    //resize
    $(window).on('resize', function () {
        headerL.scrolling();
    });


    /**
     *  com popup
    **/
    var popupL = (function() {

        return {
            openPopup : function(id) {
                var _target = $('#' + id);
                _target.fadeIn(200, function(){
                    $('body').css({'overflow': 'hidden'});
                    _target.addClass('on');
                });
            },

            closePopup : function(id){
                var _target = $('#' + id);
                _target.fadeOut(200, function() {
                    _target.removeClass('on');
                    if ($('.layerPopup.on').length === 0) {
                        $('body').css({ 'overflow': '' });
                    }
                });
            },
            togglePopup: function(id) {
                var _target = $('#' + id);
                if (_target.hasClass('on')) {
                    this.closePopup(id);
                } else {
                    this.openPopup(id);
                }
            }
        }
    })();

    // 전역
    window.openPopup = popupL.openPopup;
    window.closePopup = popupL.closePopup;
    window.togglePopup = popupL.togglePopup;

});