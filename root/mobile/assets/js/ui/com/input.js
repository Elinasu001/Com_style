$(document).ready(function(){
    /*---------------------------------------------
	ready, load
    ---------------------------------------------*/
    $(document).ready(function(){
        iptFocusScrl();
    });

    /**
     * 3자리 수마다 콤마 적용
    **/
    var commaFormatter = (function() {
        
        return {
            format: function(input) {
                var value = input.value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거
                value = value.replace(/,/g, ''); // 기존 ',' 제거
                value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 3자리마다 ',' 추가
                input.value = value;
            }
        };
    })();

    // event
    $(document).on('keyup', 'input[inputmode=numeric]', function() {
        commaFormatter.format(this);
    });


    /**
     * Android 인풋 포커스 스크롤 이슈
    **/
    function iptFocusScrl() {
        if(/Android/i.test(navigator.userAgent) ) {
            window.addEventListener("resize", function(){
                if( document.activeElement.tagName=="INPUT" ){
                    window.setTimeout(function(){
                        document.activeElement.scrollIntoView({ behavior: "smooth", block: "center" });
                    },0);
                }
            });
        }
    }

});