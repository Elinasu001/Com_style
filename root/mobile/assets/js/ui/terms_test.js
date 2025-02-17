$(document).ready(function(){

    /**
     * 약관 동의
     */
    var TermsAgreement = (function () {

        var $chkAll, $reqChks, $optChks, $consChk, $consChks, $allChks, $submitBtn;

        return {
            // 초기화
            init: function () {
                $chkAll = $('#chkAll'); // 전체 동의 (부모)
                $reqChks = $('.chkReq'); // 필수 항목
                $optChks = $('.chkOpt'); // 선택 항목
                $consChk = $('#chkCons'); // 수신 동의 (부모)
                $consChks = $('.chkConsChild'); // 수신 동의 항목 (SMS, 이메일, 광고성)
                $allChks = $('.chkReq, .chkOpt, #chkCons, .chkConsChild'); // 전체 항목
                $submitBtn = $('#submitBtn'); // 가입 버튼

                this.bindEvents();
            },

            // 이벤트
            bindEvents: function () {

                var self = this;

                // 전체 동의 (부모)
                $chkAll.on('change', function () {
                    self.toggleAll($(this).prop('checked'));
                });

                // 전체 항목
                $allChks.on('change', function () {
                    self.uptSubmitBtn();
                    self.uptAllChk();
                });

                // 수신 동의 (부모)
                $consChk.on('change', function () {
                    var isChecked = $(this).prop('checked');
                    $consChks.prop('checked', isChecked);
                    self.uptAllChk();
                });

                // 수신 동의 항목
                $consChks.on('change', function () {
                    self.uptConsAllChk()
                    self.uptAllChk();
                });
            },

            toggleAll: function (isChecked) {
                $allChks.prop('checked', isChecked);
                this.uptSubmitBtn();
                this.uptAllChk();
            },

            // 전체 동의 체크 상태 업데이트 (체크 여부)
            uptAllChk: function () {
                var allReqChked = $reqChks.length === $reqChks.filter(':checked').length; // 필수 항목
                var allSelChked = $optChks.length === $optChks.filter(':checked').length; // 선택 항목
                var allConsChked = $consChks.length === $consChks.filter(':checked').length; // 수신 동의
                var allChecked = $allChks.length === $allChks.filter(':checked').length; // 모든 항목

                 //  필수 + 선택 + 수신 동의 ( 모두 체크 시 전체 동의 체크 활성화 )
                if (allReqChked && allSelChked && allConsChked) {
                    $chkAll.prop('checked', true);
                } else {
                    $chkAll.prop('checked', false);
                }
            },

            // 수신 동의 항목 (하위 항목 중 하나라도 선택 시)
            uptConsAllChk: function () {
                var anyConsChked = $consChks.filter(':checked').length > 0;
                $consChk.prop('checked', anyConsChked);
            },

            //버튼 활성화 (필수 항목)
            uptSubmitBtn: function () {
                var allReqChked = $reqChks.length === $reqChks.filter(':checked').length;
                $submitBtn.prop('disabled', !allReqChked);
            }
        };
    })();

    TermsAgreement.init();


});