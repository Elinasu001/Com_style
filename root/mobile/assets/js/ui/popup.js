$(document).ready(function(){

    /**
     *  com popup
    **/
    var popupL = (function() {

        return {
            openPopup : function(id) {
                var _target = $('#' + id);
                _target.fadeIn(200, function(){
                    $('html, body').css({'overflow': 'hidden'});
                    _target.addClass('on');
                });
            },

            closePopup : function(id){
                var _target = $('#' + id);
                _target.fadeOut(200, function() {
                    _target.removeClass('on');
                    if ($('.layerPopup.on').length === 0) {//마지막 팝업
                        $('html, body').css({ 'overflow': '' });
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