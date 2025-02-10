$(document).ready(function(){

    /**
     *  com popup
    **/
    var popupL = (function() {

        return {
            openPopup : function(id) {
                var _target = $('#' + id);
                _target.addClass('on');
                $('body').css({'overflow': 'hidden'});
                $('.pop-con-wrap').scrollTop(0);
            },

            closePopup : function(id){
                var _target = $('#' + id);
                _target.removeClass('on');
                if ($('.layerPopup.on').length === 0) {//마지막 팝업
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
            }
        }
    })();

    // 전역
    window.openPopup = popupL.openPopup;
    window.closePopup = popupL.closePopup;
    window.togglePopup = popupL.togglePopup;

});