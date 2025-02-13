$(document).ready(function(){
    	/*********************************************************************
		tab
	*********************************************************************/
	/// 상위 탭
	$(".tab-item > li").click(function () {
		var selectedTab  = $(this).attr("data-tab");
		var tabContents  = $(this).closest(".tabs").find(".tab-content-area > .tab-content");

		tabContents.addClass("dp-none");
		$("#" + selectedTab).removeClass("dp-none");

		$(this).addClass("on").attr('title', '선택됨').siblings().removeClass("on").attr('title', '');
	});

	// 하위 탭 (e.g., 심사 > 심사승인, 심사협의)
	$(".tab-item02 > li").click(function (e) {
		e.stopPropagation();
		var selectedSubTab  = $(this).attr("data-tab");
		var subTabContents = $(this).closest(".tabs").find(".tab-content-area02 > .tab-content");

		subTabContents.addClass("dp-none");
		$("#" + selectedSubTab).removeClass("dp-none");
		
		$(this).addClass("on").attr('title', '선택됨').siblings().removeClass("on").attr('title', '');
	});
});