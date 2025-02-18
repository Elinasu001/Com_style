$(document).ready(function(){

    /**
     * accortion
     **/
    var accordionToggle = (function() {
        return {
            open: function(target) {
                target.addClass("on");
                target.attr("title", "닫기");
            },
            close: function(target) {
                target.removeClass("on");
                target.attr("title", "열기");
            },
            toggle: function(target) {
                if (target.hasClass("on")) {
                    this.close(target);
                } else {
                    this.open(target);
                }
            }
        };
    })();

    /**
     * event
     */
    $(document).on("click", ".accordionToggle .accordion-item > .tit", function() {
        var $currentAccordion = $(this).closest(".accordion-item");
        accordionToggle.toggle($currentAccordion);
    });

    
});