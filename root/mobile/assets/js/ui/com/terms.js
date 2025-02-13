$(document).ready(function(){
    /**
     * 약관 동의 모듈
     */
    var TermsAgreement = (function () {
        var $checkAll, $requiredChecks, $optionalChecks, $allChecks, $submitBtn;

        return {
            // 초기화
            init: function () {
                $checkAll = $('#checkAll'); // 전체 동의 체크박스
                $requiredChecks = $('.check-required'); // 필수 항목
                $optionalChecks = $('.check-optional'); // 선택 항목
                $allChecks = $('input[type="checkbox"]'); // 모든 체크박스
                $submitBtn = $('#submitBtn'); // 가입 버튼

                this.bindEvents();
            },

            // 이벤트 바인딩
            bindEvents: function () {
                var self = this;

                // 전체 동의 체크 시 모든 항목 체크/해제
                $checkAll.on('change', function () {
                    self.toggleAll($(this).prop('checked'));
                });

                // 개별 체크 시 전체 동의 상태 및 가입 버튼 업데이트
                $allChecks.not($checkAll).on('change', function () {
                    self.updateAllCheck();
                    self.updateSubmitButton();
                });
            },

            // 전체 동의 체크
            toggleAll: function (isChecked) {
                $allChecks.prop('checked', isChecked);
                this.updateSubmitButton();
            },

            // 전체 동의 체크 상태 업데이트
            updateAllCheck: function () {
                var allRequiredChecked = $requiredChecks.length === $requiredChecks.filter(':checked').length;
                var allChecked = $allChecks.not($checkAll).length === $allChecks.not($checkAll).filter(':checked').length;

                $checkAll.prop('checked', allChecked);
            },

            // 가입 버튼 활성화 여부 체크
            updateSubmitButton: function () {
                var allRequiredChecked = $requiredChecks.length === $requiredChecks.filter(':checked').length;
                $submitBtn.prop('disabled', !allRequiredChecked);
            }
        };
    })();

    // 문서가 준비되면 약관 동의 모듈 초기화
    $(document).ready(function () {
        TermsAgreement.init();
    });

});