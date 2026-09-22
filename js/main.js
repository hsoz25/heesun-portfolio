$(function () {

    $('#pf').fullpage({
        anchors: [
            'page1',
            'page2',
            'page3',
            'page4',
            'page5',
            'cardnews',
            'page6',
            'page7',
            'page8',
            'footer'
        ],

        responsiveWidth: 800,
        normalScrollElements: ".xa-phone-screen",

        afterResponsive: function (isResponsive) {

            if (isResponsive) {
                $(".second").hide();
            } else {
                $(".second").show();
            }

        },

        afterLoad: function (anchorLink, index) {

            console.log('현재 번호는 ' + index);

            $('header').toggleClass('machine-page', index === 3);

            if (
                index >= 3 &&
                anchorLink !== 'page8' &&
                anchorLink !== 'footer'
            ) {
                $('header').addClass('on');
            } else {
                $('header').removeClass('on');
            }

            if (index >= 5) {
                $('.submenu').addClass('white');
            } else {
                $('.submenu').removeClass('white');
            }

        }
    });


    /* ===========================
       POSTER VIEW MORE
    =========================== */

    const originImgs = [
        "images/poster1.png",
        "images/poster2.png",
        "images/poster3.png",
        "images/poster4.png"
    ];

    let isGroup1 = true;

    $("#viewMoreBtn").click(function () {

        const btn = $(this);
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

        isGroup1 = !currentGroup;

        btn.text(isGroup1 ? "View more+" : "Back");

        setTimeout(function () {
            btn.prop("disabled", false);
        }, 1200);

    });


    /* ===========================
       VIDEO ARCHIVE
    =========================== */

    function getYoutubeId(url) {

        if (!url) return "";

        // youtu.be/VIDEO_ID
        if (url.includes("youtu.be/")) {
            return url.split("youtu.be/")[1].split("?")[0];
        }

        // youtube.com/watch?v=VIDEO_ID
        if (url.includes("watch?v=")) {
            return url.split("watch?v=")[1].split("&")[0];
        }

        // youtube.com/embed/VIDEO_ID
        if (url.includes("/embed/")) {
            return url.split("/embed/")[1].split("?")[0];
        }

        // 이미 video ID만 들어온 경우
        return url;
    }


    $(".video-item").click(function () {

        $(".video-item").removeClass("active");
        $(this).addClass("active");

        const video = $(this).data("video");
        const videoId = getYoutubeId(video);

        if (!videoId) {
            console.error("YouTube video ID를 찾을 수 없습니다.");
            return;
        }

        const embedUrl =
            "https://www.youtube.com/embed/" +
            videoId +
            "?autoplay=1&mute=1&playsinline=1&rel=0";

        // 첫 번째 링크 노출 여부
        $(".xa-video-link")
            .first()
            .toggle(videoId === "bBtL84IYyoA");

        // YouTube 이동 링크
        $(".xa-video-link")
            .last()
            .attr("href", "https://youtu.be/" + videoId)
            .attr("target", "_blank")
            .attr("rel", "noopener noreferrer")
            .text("YouTube에서 영상 보기 ↗");

        // 메인 iframe 영상 교체
        $("#mainVideo").attr({
            src: embedUrl,
            title: $(this).data("title")
        });

        // 텍스트 정보 변경
        $("#videoTitle").text($(this).data("title"));
        $("#videoTool").text($(this).data("tool"));
        $("#videop").text($(this).data("desc"));

    });


    /* ===========================
       HS TRAITS
    =========================== */

    $(".hs-traits button").on("click", function () {

        $(".hs-traits button").attr("aria-pressed", "false");

        $(this).attr("aria-pressed", "true");

        const keyword = $(this).data("keyword");
        const icon = $(this).data("icon");

        $("#vendingEmoji").text(icon);

        $("#vendingKeyword")
            .stop(true, true)
            .fadeOut(110, function () {

                $(this)
                    .text(keyword)
                    .fadeIn(170);

            });

    });


    /* ===========================
       PHONE SCROLL
    =========================== */

    $(".screen")
        .on("mouseenter touchstart", function (event) {

            event.stopPropagation();

            $.fn.fullpage.setAllowScrolling(false);

        })
        .on("wheel touchmove", function (event) {

            event.stopPropagation();

        })
        .on("mouseleave touchend touchcancel", function () {

            $.fn.fullpage.setAllowScrolling(true);

        });


    /* ===========================
       CONTACT POPUP
    =========================== */

    $(".yes, .ok").on("click", function () {

        $(".popup-bg").fadeIn(200);

        $(".contact-popup")
            .stop(true, true)
            .fadeIn(250);

    });


    $(".close, .popup-bg").on("click", function () {

        $(".popup-bg").fadeOut(200);

        $(".contact-popup").fadeOut(200);

    });


    /* ===========================
       POSTER POPUP
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

    });


    $(".poster-close, .poster-bg").on("click", function () {

        $(".poster-bg").fadeOut(200);

        $(".poster-popup").fadeOut(200);

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