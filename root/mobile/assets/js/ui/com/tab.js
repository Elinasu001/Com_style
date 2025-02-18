
$(document).ready(function(){

    /**
     *   TAB
    **/
    var Tabs = (function () {
        return {
            init: function (container) {
                var $tabContainer = $(container);
                var $tabs = $tabContainer.find('.tab-item, .nested-tab-item');
                // var $panels = $tabContainer.find('.tab-panel, .nested-tab-panel');

                // 초기 활성 탭
                $tabs.each(function () {
                    var $tab = $(this);
                    var targetId = $tab.attr('data-tab');
                    var $panel = $('#' + targetId);

                    if ($tab.hasClass('active')) {
                        $tab.attr('title', '선택됨');
                        $panel.show();
                    } else {
                        $tab.removeAttr('title');
                        $panel.hide();
                    }
                });

                // event binding
                $tabs.on('click', function () {
                    Tabs.switchTab($(this), $tabContainer);
                });
            },

            switchTab: function ($clickedTab, $tabContainer) {
                var targetId = $clickedTab.attr('data-tab');
                var $targetPanel = $('#' + targetId);
                var isNested = $clickedTab.hasClass('nested-tab-item');

                // 같은 그룹의 탭 찾기
                var $allTabs = isNested ? $tabContainer.find('.nested-tab-item') : $tabContainer.find('.tab-item');
                var $allPanels = isNested ? $tabContainer.find('.nested-tab-panel') : $tabContainer.find('.tab-panel');

                // 기존 탭 초기화
                $allTabs.removeClass('active').removeAttr('title');
                $allPanels.hide();

                // 새 탭 활성화
                $clickedTab.addClass('active').attr('title', '선택됨');
                $targetPanel.show();
            }
        };
    })();

    // 모든 탭 초기화
    $('.jsTab, .nestedJsTab').each(function () {
        Tabs.init(this);
    });

    /**
     *   TAB Swiper
    **/
    var tabSwiperL = (function () {
        var pager = ['영역', '영역2', '영역3', '영역4'];

        var tabSwiper = new Swiper('.tabs.tab-area.swiper', {
            spaceBetween: 20,
            autoHeight: true,
            pagination: {
                el: '.tabs ul',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<li class="tab-item ' + className + '">' + pager[index] + '</li>';
                }
            }
        });

        return tabSwiper;
    })();


});