$(document).ready(function(){
    /*---------------------------------------------
	ready, load, init
    ---------------------------------------------*/
    $(document).ready(function(){
        iptFocusScrl();
        fileUploader.init();
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
     * 파일 업로드
     */
    var fileUploader = (function () {
        return {
            init: function () {
                var $uploadInput = $('.uploadInput');
                var $fileInput = $('#files');
                var $fileLabel = $('.fileLabel');
    
                $uploadInput.on('click', function () {
                    $fileInput.trigger('click');
                });
    
                $uploadInput.on('keydown', function (e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        $fileInput.trigger('click');
                    }
                });
    
                // 파일명 표시
                $fileInput.on('change', function () {
                    var fileName = this.files.length > 0 ? this.files[0].name : '';
                    $uploadInput.val(fileName).text(fileName).addClass('up');
                    $fileLabel.text('선택된 파일: ' + fileName);
                });
            }
        };
    })();

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