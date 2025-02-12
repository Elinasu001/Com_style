$(document).ready(function(){
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

});