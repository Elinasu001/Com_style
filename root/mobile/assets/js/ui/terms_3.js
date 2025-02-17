$(document).ready(function () {
    var TermsAgreement = (function () {
        var $termsPopup = $("#fullPopup"), // 팝업
            $termsList = $(".terms-list-area li"), // 약관 리스트
            $chkAll = $("#chkAll"), // 전체 동의 체크박스
            $reqChks = $(".chkReq"), // 필수 항목 체크박스
            $termsBtn = $(".btn-secondary"), // "확인했습니다" 버튼
            $submitBtn = $("#submitBtn"), // 제출 버튼
            $popupWrap = $(".pop-con-wrap"), // 스크롤 감지용
            currentIndex = 0;

        return {
            // 초기화
            init: function () {
                this.bindEvents();
            },

            // 이벤트 바인딩
            bindEvents: function () {
                var self = this;

                // 약관 클릭 시 팝업 열기
                $(".check-box.terms").on("click", function () {
                    self.openPopup("fullPopup");
                });

                // 스크롤 이벤트 감지
                $popupWrap.on("scroll", function () {
                    self.checkScroll();
                });

                // "확인했습니다" 버튼 클릭 시 다음 약관으로 이동
                $termsBtn.on("click", function () {
                    self.nextTerm();
                });

                // 전체 동의 체크박스 변경 시 모든 항목 체크
                $chkAll.on("change", function () {
                    self.toggleAll($(this).prop("checked"));
                });

                // 개별 체크박스 변경 시 전체 동의 여부 업데이트
                $reqChks.on("change", function () {
                    self.updateAllCheck();
                });
            },

            // 팝업 열기 (popupL 활용)
            openPopup: function (id) {
                if (typeof popupL !== "undefined" && popupL.openPopup) {
                    popupL.openPopup(id);
                } else {
                    console.error("popupL이 정의되지 않음");
                }
                this.showCurrentTerm();
            },

            // 현재 약관 표시
            showCurrentTerm: function () {
                if ($termsList.length === 0) {
                    console.error("약관 리스트가 존재하지 않습니다.");
                    return;
                }

                // 모든 약관 숨기고, 현재 약관만 보이게 설정
                $termsList.hide();
                var $currentTerm = $termsList.eq(currentIndex);

                if ($currentTerm.length === 0) {
                    console.warn("잘못된 currentIndex:", currentIndex);
                    return;
                }

                $currentTerm.show();
                $popupWrap.scrollTop(0); // 스크롤 초기화
                $termsBtn.text("스크롤을 끝까지 내려주세요").prop("disabled", true);
            },

            // 스크롤이 끝까지 내려갔는지 확인
            checkScroll: function () {
                var scrollHeight = $popupWrap.prop("scrollHeight");
                var scrollTop = $popupWrap.scrollTop();
                var clientHeight = $popupWrap.outerHeight();

                if (scrollTop + clientHeight >= scrollHeight - 10) {
                    $termsBtn.text("확인했습니다").prop("disabled", false);
                }
            },

            // 다음 약관으로 이동
            nextTerm: function () {
                // 현재 약관 체크 처리
                $reqChks.eq(currentIndex).prop("checked", true);

                // 다음 약관으로 이동
                currentIndex++;

                if (currentIndex < $termsList.length) {
                    this.showCurrentTerm();
                } else {
                    this.closePopup("fullPopup");
                    this.updateAllCheck();
                }
            },

            // 팝업 닫기
            closePopup: function (id) {
                if (typeof popupL !== "undefined" && popupL.closePopup) {
                    popupL.closePopup(id);
                } else {
                    console.error("popupL이 정의되지 않음");
                }
            },

            // 전체 동의 체크박스 상태 업데이트
            updateAllCheck: function () {
                var allChecked = $reqChks.length === $reqChks.filter(":checked").length;
                $chkAll.prop("checked", allChecked);
                $submitBtn.prop("disabled", !allChecked);
            },

            // 전체 동의 선택
            toggleAll: function (isChecked) {
                $reqChks.prop("checked", isChecked);
                this.updateAllCheck();
            }
        };
    })();

    TermsAgreement.init();
});
