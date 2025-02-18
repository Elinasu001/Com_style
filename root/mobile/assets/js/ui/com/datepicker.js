$(document).ready(function () {
    $.datepicker.setDefaults({
        closeText: "닫기",
        prevText: "이전달",
        nextText: "다음달",
        currentText: "오늘",
        monthNames: ["1월", "2월", "3월", "4월", "5월", "6월",
            "7월", "8월", "9월", "10월", "11월", "12월"
        ],
        monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월",
            "7월", "8월", "9월", "10월", "11월", "12월"
        ],
        dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
        dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
        dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
        weekHeader: "주",
        dateFormat: "yy.m.d",
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: true,
        yearSuffix: "년"
    });

    $("#datepicker").datepicker({
        minDate: 0,
        showAnim: "fadeIn",
        dateFormat: "yy-mm-dd",
        showButtonPanel: true,
        buttonText: "날짜 선택",
        buttonImageOnly: true,
        beforeShow: function (input, inst) {
            setTimeout(() => {
                let highlight = $(".ui-datepicker-calendar .ui-state-highlight");
                if (highlight.length) {
                    highlight.first().focus();
                } else {
                    $(".ui-datepicker-calendar a").first().focus();
                }
                $(".ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-close").attr("tabindex", "0");
            }, 10);
        },
        onChangeMonthYear: function (year, month, inst) {
            setTimeout(() => {
                $(".ui-datepicker-calendar a").first().focus();
            }, 10);
        },
        onClose: function () {
            setTimeout(() => {
                $("#datepicker").blur();
            }, 10);
        }
    });

    $(document).on("keydown", ".ui-datepicker", function (e) {
        const key = e.key;
        const activeElement = document.activeElement;

        if (key === "Escape") {
            $(".ui-datepicker-close").trigger("click");
        } else if (key === "Enter" && $(activeElement).is(".ui-datepicker-prev, .ui-datepicker-next")) {
            $(activeElement).trigger("click");
            setTimeout(() => {
                $(".ui-datepicker-calendar a").first().focus();
            }, 300);
        } else if (key === "Tab") {
            const focusable = $(".ui-datepicker:visible").find("a, button, input");
            const firstFocusable = focusable.first();
            const lastFocusable = focusable.last();

            if (e.shiftKey && activeElement === firstFocusable[0]) {
                lastFocusable.focus();
                e.preventDefault();
            } else if (!e.shiftKey && activeElement === lastFocusable[0]) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    });

    $(document).on("click", ".ui-datepicker-calendar a", function () {
        let selectedDate = $(this).text();
        $(".ui-datepicker-title").after(`<p class="datepicker-selected">선택한 날짜: ${selectedDate}</p>`);
    });

    $(document).on("mouseover", ".ui-datepicker-close", function () {
        $(this).text("닫기");
    });

    $("#datepicker").on("mousedown", function () {
        if ($(this).is(":focus")) {
            // $(this).blur();
        }
    });

    $("#datepicker").on("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
            $(this).datepicker("show");
        }
    });
});
