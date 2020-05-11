$(".article-poster-button").on("click",function(){
	create_poster();
});
$('[data-event="poster-close"]').on('click', function(){
	$('.article-poster, .poster-popover-mask, .poster-popover-box').fadeOut()
});
$('[data-event="poster-download"]').on('click', function(){
	download_poster();
});
function create_poster(){
	//下载图标
	var download_icon = '<i class="fontello fontello-camera"></i>';
	//错误图标
	var error_icon = '<i class="mdui-icon mdui-icon-left material-icons"></i>';
	//等待图标
	var wait_icon = '<i class="mdui-icon mdui-icon-left material-icons"></i>';
	var id = $(".article-poster").data("id");
	if(!id){
    	alert("请刷新页面");
    	return false;
	}
	var moleft = $.ajax({
        type: "get",
        url: "/index.php/ArticlePoster/make",
        data: {cid:id},
        timeout: 60000,
        dataType: "json",
        beforeSend: function (moleft) {
           $(".article-poster-button").html(wait_icon+"正在生成...");
		   $(".article-poster-button").attr("disabled",true);
        },
        success: function(json) {
        	if(json.status == 200){
                $('.article-poster-images').attr("src", json.data);
                $(".poster-download").data("url", json.data);
                $('.article-poster, .poster-popover-mask, .poster-popover-box').fadeIn()
            	$(".article-poster-button").html(download_icon+"");
	    		$(".article-poster-button").attr("disabled",false);
        	}else{
        		if(json.data){
        			alert(json.data);
        		}else{
        			alert("网络超时，请重试");
        		}
            	$(".article-poster-button").html(error_icon+"生成失败");
	    		$(".article-poster-button").attr("disabled",false);
        	}
        },
        error: function (textStatus) {
        	alert("生成失败，请重试");
            $(".article-poster-button").html(error_icon+"请重试");
	    	$(".article-poster-button").attr("disabled",false);
        },
        complete: function (XMLHttpRequest,status) {
            if(status == 'timeout') {
            	moleft.abort();
                $(".article-poster-button").html(error_icon+"网络超时");
	    		$(".article-poster-button").attr("disabled",false);
            }
        }
    });
}
function download_poster(){
	var $a = document.createElement('a');
	$a.setAttribute("href", $(".poster-download").data("url"));
	$a.setAttribute("download", "");
	var evObj = document.createEvent('MouseEvents');
	evObj.initMouseEvent( 'click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
	$a.dispatchEvent(evObj);
}
//预加载功能合并
/*! instant.page v3.0.0 - (C) 2019 Alexandre Dieulot - https://instant.page/license */
let t,e;const n=new Set,o=document.createElement("link"),s=o.relList&&o.relList.supports&&o.relList.supports("prefetch")&&window.IntersectionObserver&&"isIntersecting"in IntersectionObserverEntry.prototype,i="instantAllowQueryString"in document.body.dataset,r="instantAllowExternalLinks"in document.body.dataset,a="instantWhitelist"in document.body.dataset;let c=65,d=!1,l=!1,u=!1;if("instantIntensity"in document.body.dataset){const t=document.body.dataset.instantIntensity;if("mousedown"==t.substr(0,"mousedown".length))d=!0,"mousedown-only"==t&&(l=!0);else if("viewport"==t.substr(0,"viewport".length))navigator.connection&&(navigator.connection.saveData||navigator.connection.effectiveType.includes("2g"))||("viewport"==t?document.documentElement.clientWidth*document.documentElement.clientHeight<45e4&&(u=!0):"viewport-all"==t&&(u=!0));else{const e=parseInt(t);isNaN(e)||(c=e)}}if(s){const n={capture:!0,passive:!0};if(l||document.addEventListener("touchstart",function(t){e=performance.now();const n=t.target.closest("a");if(!f(n))return;h(n.href)},n),d?document.addEventListener("mousedown",function(t){const e=t.target.closest("a");if(!f(e))return;h(e.href)},n):document.addEventListener("mouseover",function(n){if(performance.now()-e<1100)return;const o=n.target.closest("a");if(!f(o))return;o.addEventListener("mouseout",m,{passive:!0}),t=setTimeout(()=>{h(o.href),t=void 0},c)},n),u){let t;(t=window.requestIdleCallback?t=>{requestIdleCallback(t,{timeout:1500})}:t=>{t()})(()=>{const t=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){const n=e.target;t.unobserve(n),h(n.href)}})});document.querySelectorAll("a").forEach(e=>{f(e)&&t.observe(e)})})}}function m(e){e.relatedTarget&&e.target.closest("a")==e.relatedTarget.closest("a")||t&&(clearTimeout(t),t=void 0)}function f(t){if(t&&t.href&&(!a||"instant"in t.dataset)&&(r||t.origin==location.origin||"instant"in t.dataset)&&["http:","https:"].includes(t.protocol)&&("http:"!=t.protocol||"https:"!=location.protocol)&&(i||!t.search||"instant"in t.dataset)&&!(t.hash&&t.pathname+t.search==location.pathname+location.search||"noInstant"in t.dataset))return!0}function h(t){if(n.has(t))return;const e=document.createElement("link");e.rel="prefetch",e.href=t,document.head.appendChild(e),n.add(t)}
