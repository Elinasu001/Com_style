$(document).ready(function () {
    var TermsAgreement = (function () {

        var $reqGroup, $optGroup, $elems, $submitBtn;

        return {
            init: function () {
                $reqGroup = $('.check-box.terms[data-group="required"]'); // 필수 동의 그룹
                $optGroup = $('.check-box.terms[data-group="optional"]'); // 선택 동의 그룹

                $elems = {
                    
                    // 필수 동의 그룹
                    $chkAll : $reqGroup.find('#chkAll'),
                    $reqChks : $reqGroup.find('.chkReq'),

                    // 선택 동의 그룹
                    $chkOptAll : $optGroup.find('#chkOptAll'),
                    $optChks : $optGroup.find('.chkOpt'),
                    $consChk : $optGroup.find('#chkCons'),
                    $consChks : $optGroup.find('.chkConsChild'),
                }

                $submitBtn = $('#submitBtn');

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
