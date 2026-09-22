$(function () {

    $('#pf').fullpage({
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8'],
        responsiveWidth: 800,

       afterResponsive: function (isResponsive) {

    if (isResponsive) {

        $(".second").hide();

    //   $(".fp-tableCell").removeAttr("style");
    //   $(".fp-section").removeAttr("style");
    //      $(".section").removeAttr("style");

    } else {

        $(".second").show();

    }

},

        afterLoad: function (anchorLink, index) {

            console.log('현재 번호는 ' + index);

            if (index >= 3 && index < 8) {
                $('header').addClass('on');
            } else {
                $('header').removeClass('on');
            }

            if (index >= 5) {
                $('.submenu').addClass('white');
            } else {
                $('.submenu').removeClass('white');
            }

          if (index === 7) {
                // 7번 섹션에 도착했을 때는 아무것도 안 하거나, 
                // 원하신다면 여기에 자동으로 영상이 재생되게 만드는 코드를 넣을 수도 있습니다!
                console.log("지금은 7번 섹션입니다. 영상 재생 대기 중!");
            } else {
                // ⭐ 7번 섹션이 '아닌' 다른 모든 곳으로 이동했을 때 영상을 정지시킵니다!
                const iframe = $("#mainVideo");
                
                if (iframe.length > 0 && iframe.attr("src")) {
                    const currentSrc = iframe.attr("src").split("?")[0];
                    iframe.attr("src", currentSrc); // 유튜브 주소 리셋해서 멈춤!
                }
                
            }
        }

    });

    // 원본 이미지
    const originImgs = [
        "images/poster1.png",
        "images/poster2.png",
        "images/poster3.png",
        "images/poster4.png"
    ];

    let isGroup1 = true;

    $("#viewMoreBtn").click(function () {

        const btn = $(this);

        // 현재 상태 저장 (★★★★★ 핵심)
        const currentGroup = isGroup1;

        btn.prop("disabled", true);

        const order = currentGroup
            ? [0, 1, 2, 3]
            : [3, 2, 1, 0];

        order.forEach(function (i, step) {

            setTimeout(function () {

                const card = $(".group-1 .poster-item").eq(i);
                const img = card.find("img");

                const newSrc = currentGroup
                    ? $(".group-2 img").eq(i).attr("src")
                    : originImgs[i];

                card.css({
                    opacity: 0,
                    transform: "translateX(-80px)"
                });

                setTimeout(function () {

                    img.attr("src", newSrc);

                    card.css({
                        transition: "none",
                        transform: "translateX(80px)"
                    });

                    card[0].offsetHeight;

                    card.css({
                        transition: "transform .45s ease, opacity .45s ease",
                        opacity: 1,
                        transform: "translateX(0)"
                    });

                }, 220);

            }, step * 150);

        });

        // 애니메이션 시작 후 상태 변경
        isGroup1 = !currentGroup;

        btn.text(isGroup1 ? "View more+" : "Back");

        setTimeout(function () {
            btn.prop("disabled", false);
        }, 1200);

    });
    /* ===========================
        Video Archive Script
    =========================== */

$(document).ready(function () {

    $(".video-item").click(function () {
        $(".video-item").removeClass("active");
        $(this).addClass("active");

        const video = $(this).data("video");
        const title = $(this).data("title");
        const tool = $(this).data("tool");
        const desc = $(this).data("desc");

        // 메인 영상 변경 및 자동 재생
        $("#mainVideo").attr("src", video + "?autoplay=1");

        // 텍스트 정보 업데이트
        $("#videoTitle").text(title);
        $("#videoTool").text(tool);
        $("#videop").html(desc);
    }); 

$('.video-item').each(function() {
    // 1. data-video에서 유튜브 URL을 가져옵니다.
    const embedUrl = $(this).data('video');
    
    // 2. URL에서 영상 ID만 추출합니다 (마지막 '/' 뒤의 글자)
    const videoId = embedUrl.split('/').pop();
    
    // 3. 유튜브 썸네일 표준 주소 조합 (maxresdefault가 고화질입니다)
    const thumbUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    
    // 4. 해당 아이템 안의 <img> 태그 src를 변경합니다.
    $(this).find('img').attr('src', thumbUrl);
});

});
    // ===========================
    // Contact Popup
    // ===========================

    $(".yes, .ok").on("click", function () {

        $(".popup-bg").fadeIn(200);

        $(".contact-popup")
            .stop(true, true)
            .fadeIn(250);

        $("body").css("overflow", "hidden");

    });

    $(".close, .popup-bg").on("click", function () {

        $(".popup-bg").fadeOut(200);

        $(".contact-popup").fadeOut(200);

        $("body").css("overflow", "");

    });

    /* ===========================
       Poster Popup
    =========================== */

    const posterData = {

        "poster1.png": {
            title: "RED RED",
            tool: "Adobe Photoshop",
            desc: "여기에 포스터 설명을 작성하세요."
        },

        "poster2.png": {
            title: "POSTER 02",
            tool: "Adobe Illustrator",
            desc: "여기에 포스터 설명을 작성하세요."
        },

        "poster3.png": {
            title: "POSTER 03",
            tool: "Adobe Photoshop",
            desc: "여기에 포스터 설명을 작성하세요."
        },

        "poster4.png": {
            title: "POSTER 04",
            tool: "Adobe Photoshop",
            desc: "여기에 포스터 설명을 작성하세요."
        },

        "poster5.jpg": {
            title: "POSTER 05",
            tool: "Adobe Photoshop",
            desc: "여기에 포스터 설명을 작성하세요."
        },

        "poster6.png": {
            title: "POSTER 06",
            tool: "Adobe Illustrator",
            desc: "여기에 포스터 설명을 작성하세요."
        },

        "poster7.png": {
            title: "POSTER 07",
            tool: "Adobe Photoshop",
            desc: "여기에 포스터 설명을 작성하세요."
        },

        "poster8.png": {
            title: "POSTER 08",
            tool: "Adobe Photoshop",
            desc: "여기에 포스터 설명을 작성하세요."
        }

    };


    $(".poster-item").on("click", function () {

        const src = $(this).find("img").attr("src");
        const fileName = src.split("/").pop();
        const data = posterData[fileName];

        if (!data) return;

        $("#popupPoster").attr("src", src);
        $("#popupTitle").text(data.title);
        $("#popupTool").text(data.tool);
        $("#popupDesc").text(data.desc);

        $(".poster-bg").fadeIn(200);
        $(".poster-popup").fadeIn(250);

        $("body").css("overflow", "hidden");

    });


    $(".poster-close, .poster-bg").on("click", function () {
        
        $(".poster-bg").fadeOut(200);
        $(".poster-popup").fadeOut(200);

        $("body").css("overflow", "");

    });
// 재생 버튼 클릭
$(".btn").click(function () {

    $("#popupVideo").attr(
        "src",
        "https://www.youtube.com/embed/YU-dcul_aD0?autoplay=1"
    );

    $(".video-bg").fadeIn(200);
    $(".video-popup").fadeIn(250);

});

// 닫기
$(".video-close, .video-bg").click(function () {

    $("#popupVideo").attr("src", "");

    $(".video-bg").fadeOut(200);
    $(".video-popup").fadeOut(200);

});

// ESC로 닫기
$(document).keydown(function (e) {

    if (e.key === "Escape") {

        $("#popupVideo").attr("src", "");

        $(".video-bg").fadeOut(200);
        $(".video-popup").fadeOut(200);

    }

});

/* ===========================
   TOP BUTTON
=========================== */

$(window).on("scroll", function () {

    if ($(window).scrollTop() > 300) {

        $(".top-btn").addClass("show");

    } else {

        $(".top-btn").removeClass("show");

    }

});

$(".top-btn").click(function () {

    $.fn.fullpage.moveTo(1);

});
});