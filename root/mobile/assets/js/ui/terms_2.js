$(document).ready(function () {
    var TermsAgreement = (function () {
        
        var $requiredGroup = $('.check-box.terms[data-group="required"]'); // 필수 동의 그룹
        var $optionalGroup = $('.check-box.terms[data-group="optional"]'); // 선택 동의 그룹

        // 필수 동의 그룹
        var $chkAll = $requiredGroup.find('#chkAll');
        var $reqChks = $requiredGroup.find('.chkReq');

        // 선택 동의 그룹
        var $chkOptAll = $optionalGroup.find('#chkOptAll');
        var $optChks = $optionalGroup.find('.chkOpt');
        var $consChk = $optionalGroup.find('#chkCons');
        var $consChks = $optionalGroup.find('.chkConsChild');

        var $submitBtn = $('#submitBtn');

        return {
            init: function () {
                this.bindEvents();
            },

            bindEvents: function () {
                var self = this;

                // 필수 동의 전체 체크
                $chkAll.on('change', function () {
                    var isChecked = $(this).prop('checked');
                    $reqChks.prop('checked', isChecked);
                    self.updateChkAll();
                    self.updateSubmitBtn();
                });

                // 선택 동의 전체 체크
                $chkOptAll.on('change', function () {
                    var isChecked = $(this).prop('checked');
                    $optChks.prop('checked', isChecked);
                    $consChk.prop('checked', isChecked);
                    $consChks.prop('checked', isChecked);
                    self.updateChkOptAll();
                });

                // 개별 항목 변경 시 전체 체크박스 업데이트
                $reqChks.on('change', function () {
                    self.updateChkAll();
                    self.updateSubmitBtn();
                });

                $optChks.on('change', function () {
                    self.updateChkOptAll();
                });

                $consChks.on('change', function () {
                    self.updateConsChk();
                    self.updateChkOptAll();
                });
            },

            updateChkAll: function () {
                var allChecked = $reqChks.length === $reqChks.filter(':checked').length;
                $chkAll.prop('checked', allChecked);
            },

            updateChkOptAll: function () {
                var allOptChecked = $optChks.length === $optChks.filter(':checked').length;
                var allConsChecked = $consChks.length === $consChks.filter(':checked').length;
                $chkOptAll.prop('checked', allOptChecked && allConsChecked);
            },

            updateConsChk: function () {
                $consChk.prop('checked', $consChks.filter(':checked').length > 0);
            },

            updateSubmitBtn: function () {
                $submitBtn.prop('disabled', $reqChks.length !== $reqChks.filter(':checked').length);
            }
        };
    })();

    TermsAgreement.init();
});
