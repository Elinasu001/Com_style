$(document).ready(function () {
    var datepickerL = {
        init: function () {
            $("#datepicker").datepicker({
                minDate: 0,
                currentText: '오늘 날짜',
                closeText: "닫기",
                prevText: "이전달",
                nextText: "다음달",
                showAnim: "slideDown",
                showButtonPanel: true,
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
                yearSuffix: "년",

                beforeShow: function (input, inst) {
                    setTimeout(function () {
                        var dpDiv = inst.dpDiv;
                        
                        //  오늘 날짜에 포커스 
                        var todayBtn = dpDiv.find(".ui-state-highlight");
                        if (todayBtn.length > 0) {
                            todayBtn.attr("tabindex", "0").focus();
                        } else {
                            dpDiv.find(".ui-state-default").first().attr("tabindex", "0").focus();
                        }

                        // Tab 키 내비게이션
                        dpDiv.find(".ui-datepicker-buttonpane button").attr("tabindex", "0");

                        // 오늘 날짜 버튼
                        dpDiv.find(".ui-datepicker-current").off("click").on("click", function () {
                            var today = $.datepicker.formatDate("yy.m.d", new Date());
                            $("#datepicker").datepicker("setDate", today).datepicker("hide");
                        });

                        // 닫기 버튼
                        dpDiv.find(".ui-datepicker-close").off("click").on("click", function () {
                            $("#datepicker").datepicker("hide");
                        });

                        //  Esc 키로 닫기
                        $(document).on("keydown", function (e) {
                            if ($(".ui-datepicker:visible").length > 0 && e.key === "Escape") {
                                $("#datepicker").datepicker("hide");
                            }
                        });

                    }, 0);
                },

                onClose: function () {
                    $("#datepicker").focus();
                }
            });

        }
    };

    datepickerL.init();
});
