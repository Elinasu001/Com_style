$(document).ready(function(){

    /**
     *  공통 팝업
     *  openPopup :: full 팝업, btmSheet 팝업
     *  openModal :: modal
     *  openMenu :: 전체 메뉴
    **/
    var popupL = (function() {

        // 헬퍼 fn
        function initPopup(id) {
            var _target = $('#' + id);
            _target.addClass('on');
            _target.find('.pop-con-wrap').scrollTop(0);
            $('body').css({'overflow': 'hidden'});
            return _target;
        }

        return {
            openPopup : function(id) {
                var _target = initPopup(id);
            },
            openModal: function(id, msg) {
                var _target = initPopup(id);
                if(msg) {
                    _target.find('.modal').html(msg);
                }
            },
            openMenu: function(id, menu){
                var _target = initPopup(id);
                if(menu){
                    _target.find('.allMenu').html(menu);
                }
            },
            closePopup : function(id){
                var _target = $('#' + id);
                _target.removeClass('on');
                if ($('.layerPopup.on').length === 0) { // 마지막 열린 팝업
                    $('body').css({ 'overflow': '' });
                }
                
            },
            togglePopup: function(id, msg, menu) {
                var _target = $('#' + id);
                if (_target.hasClass('on')) {
                    this.closePopup(id);
                } else {
                    if(msg){
                        this.openModal(id, msg);
                    }else if(menu){
                        this.openMenu(id, menu);
                    }else{
                        this.openPopup(id);
                    }
                    
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
    window.openModal = popupL.openModal;
    window.openMenu = popupL.openMenu;
    window.closePopup = popupL.closePopup;
    window.togglePopup = popupL.togglePopup;

    popupL.closePopupOnDim();

});