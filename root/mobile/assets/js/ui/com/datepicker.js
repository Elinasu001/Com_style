$(document).ready(function () {
    var datepickerL = {
        init: function () {
            $(".datepicker").each(function () {
                $(this).datepicker({
                    minDate:0,
                    dateFormat: "yy-mm-dd",
                    showButtonPanel: true,
                    beforeShow: datepickerL.beforeShowHandler,
                    onClose: datepickerL.onCloseHandler
                });
            });

            this.bindKeyboardNavigation();
        },

        beforeShowHandler: function (input, inst) {
            var $input = $(input);
            setTimeout(function () {
                let widget = $(inst.dpDiv);
                widget.attr("role", "dialog");
                widget.attr("aria-label", "날짜 선택 창");

                widget.find(".ui-datepicker-prev, .ui-datepicker-next")
                    .attr("tabindex", "0")
                    .attr("role", "button");

                widget.find(".ui-datepicker-close").attr("role", "button");
                widget.find("table").attr("role", "grid");
                widget.find("thead").attr("role", "rowgroup");
                widget.find("tbody").attr("role", "rowgroup");
                widget.find("tr").attr("role", "row");
                widget.find("td").attr("role", "gridcell");

                // 현재 선택된 날짜에 포커스
                let selected = widget.find(".ui-state-highlight, .ui-state-active");
                if (selected.length) {
                    selected.attr("tabindex", "0").focus();
                } else {
                    widget.find("td:first a").attr("tabindex", "0").focus();
                }
            }, 0);

            $input.attr("aria-expanded", "true");
        },

        onCloseHandler: function (input) {
            $(input).attr("aria-expanded", "false");
        },

        bindKeyboardNavigation: function () {
            $(document).on("keydown", ".ui-datepicker", function (event) {
                let focusElement = $(document.activeElement);
                let activeDatepicker = $(".datepicker").filter(function () {
                    return $(this).attr("aria-expanded") === "true";
                });

                if (event.key === "Tab") {
                    if (event.shiftKey && focusElement.hasClass("ui-datepicker-close")) {
                        $(".ui-datepicker-prev").focus();
                        event.preventDefault();
                    } else if (!event.shiftKey && focusElement.hasClass("ui-datepicker-prev")) {
                        $(".ui-datepicker-close").focus();
                        event.preventDefault();
                    }
                }
                if (event.key === "Escape") {
                    activeDatepicker.datepicker("hide").focus();
                }
            });

            // 날짜 선택 후 포커스 이동
            $(document).on("click", ".ui-datepicker-calendar td a", function () {
                let activeDatepicker = $(".datepicker").filter(function () {
                    return $(this).attr("aria-expanded") === "true";
                });

                setTimeout(function () {
                    activeDatepicker.focus();
                }, 0);
            });
        }
    };

    datepickerL.init();
});
