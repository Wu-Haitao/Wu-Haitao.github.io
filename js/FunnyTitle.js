<!--浏览器搞笑标题-->
 var OriginTitle = document.title;
 var titleTime;
 document.addEventListener('visibilitychange', function () {
     if (document.hidden) {
         document.title = '╭(°A°`)╮ 页面崩溃啦~';
         clearTimeout(titleTime);
     }
     else {
         document.title = '(ฅ>ω<*ฅ) 突然又好了~';
         titleTime = setTimeout(function () {
             document.title = OriginTitle;
         }, 2000);
     }
 });