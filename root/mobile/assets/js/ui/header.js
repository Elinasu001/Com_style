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

});