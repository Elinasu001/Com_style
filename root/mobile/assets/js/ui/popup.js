$(document).ready(function(){

    /**
     *  com popup
    **/
    var popupL = (function() {

        return {
            openPopup : function(id) {
                var _target = $('#' + id);
                _target.addClass('on');
                _target.find('.pop-con-wrap').scrollTop(0);// 스크롤 초기화
                $('body').css({'overflow': 'hidden'});

            },
            closePopup : function(id){
                var _target = $('#' + id);
                _target.removeClass('on');
                if ($('.layerPopup.on').length === 0) {// 마지막 열린 팝업
                    $('body').css({ 'overflow': '' });
                }
                
            },
            togglePopup: function(id) {
                var _target = $('#' + id);
                if (_target.hasClass('on')) {
                    this.closePopup(id);
                } else {
                    this.openPopup(id);
                }
            },
            closePopupOnDim: function(){
                $('.layerPopup.btmSheet').on('click', function(e){
                    if(e.target === this){
                        popupL.closePopup($(this).attr('id'));
                    }
                    e.stopPropagation();
                });
            }
        }
    })();

    // 전역
    window.openPopup = popupL.openPopup;
    window.closePopup = popupL.closePopup;
    window.togglePopup = popupL.togglePopup;

    popupL.closePopupOnDim();

});