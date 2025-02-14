$(document).ready(function(){

    /**
     * 약관 동의 모듈
     */
    var TermsAgreement = (function () {
        var $chkAll, $reqChks, $optChks, $consChk, $consChks, $allChks, $submitBtn;

        return {
            // 초기화
            init: function () {
                $chkAll = $('#checkAll'); // 전체 동의 체크박스
                $reqChks = $('.chkReq'); // 필수 항목
                $optChks = $('.chkOpt'); // 선택 항목
                $consChk = $('#chkCons'); // 수신 동의 (부모)
                $consChks = $('.chkConsChild'); // 수신 동의 하위 항목 (SMS, 이메일, 광고성)
                $allChks = $('.chkReq, .chkOpt, .chkCons, .chkConsChild'); // 전체 항목
                $submitBtn = $('#submitBtn'); // 가입 버튼

                this.bindEvents();
            },

            // 이벤트
            bindEvents: function () {
                var self = this;

                // 전체 동의 체크 + 모든 항목 체크/해제
                $chkAll.on('change', function () {
                    self.toggleAll($(this).prop('checked'));
                });

                // 개별 체크 + 전체 동의 상태 및 버튼 활성화
                $allChks.on('change', function () {
                    self.uptSubmitBtn();
                    self.uptAllChk();
                });

                // 수신 동의 체크 +  하위 항목 동기화
                $consChk.on('change', function () {
                    $consChks.prop('checked', $(this).prop('checked'));
                    self.uptAllChk(); // 수신 동의 변경 + 전체 동의 상태 업데이트
                });

                // 하위 항목 체크 + 수신 동의 체크박스 업데이트
                $consChk.on('change', function () {
                    self.uptConsentChk();
                    self.uptAllChk(); // 하위 항목 변경 + 전체 동의 상태 업데이트
                });
            },

            // 전체 동의 체크/해제
            toggleAll: function (isChecked) {
                $allChks.prop('checked', isChecked);
                this.uptSubmitBtn();
                this.uptAllChk();
            },

            // 전체 동의 체크 상태 업데이트 (필수 + 선택 + 수신 동의 체크 여부 확인)
            uptAllChk: function () {
                var allReqChked = $reqChks.length === $reqChks.filter(':checked').length; // 필수 항목 체크 여부
                var allSelChked = $optChks.length === $optChks.filter(':checked').length; // 선택 항목 체크 여부
                var allConsChked = $consChks.length === $consChks.filter(':checked').length; // 수신 동의 체크 여부
                var allChecked = $allChks.length === $allChks.filter(':checked').length; // 모든 항목 체크 여부

                //  필수 + 선택 + 수신 동의가 모두 체크되었을 때 전체 동의 체크 ON
                if (allReqChked && allSelChked && allConsChked) {
                    $chkAll.prop('checked', true);
                } else {
                    $chkAll.prop('checked', false);
                }
            },

            // 수신 동의 항목 업데이트 (하위 항목이 모두 체크되었을 때만 체크)
            uptConsentChk: function () {
                var allConsChked = $consChks.length === $consChks.filter(':checked').length;
                $consChk.prop('checked', allConsChked);
            },

            // 가입 버튼 활성화 여부 체크 (필수 항목만 확인)
            uptSubmitBtn: function () {
                var allReqChked = $reqChks.length === $reqChks.filter(':checked').length;
                $submitBtn.prop('disabled', !allReqChked);
            }
        };
    })();

    $(document).ready(function () {
        TermsAgreement.init();
    });






});