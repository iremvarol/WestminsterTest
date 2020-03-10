$(document).ready(function() {
    $(window).click(function() {
        $("#life-map .hotspot").siblings().removeClass("active")
    }), $("#life-map .hotspot").click(function(e) {
        e.stopPropagation(), $(this).toggleClass("active").siblings().removeClass("active")
    })
}), $(document).ready(function() {
    if ($("#slider-life").length) {
        var e = "",
                t = [{
                    id: 1,
                    active: !0,
                    title: "Choose a life of possibility and purpose",
                    quote_url: "",
                    name: "",
                    content: "At Westminster College, we empower you to push boundaries as you chart your own life’s course. Here, you can step outside your comfort zone in an inspiring and reassuring environment—alongside others who share your desire to expand your knowledge, make a difference, and become a well-rounded person. Look inward. Reach out. Cultivate the unique traits and abilities that set you apart. Pursue your greatest aspirations.",
                    photo_url: "../../images/default-source/undergraduate/hub/life-at-westminster/two-students-in-front-of-converse.jpg?Status=Temp&sfvrsn=2",
                    photo_url_mobile: "../../images/default-source/undergraduate/hub/life-at-westminster/two-students-in-front-of-converse-mobile.jpg?Status=Temp&sfvrsn=2"
                }, {
                    id: 2,
                    active: !0,
                    title: "",
                    quote_url: "../images/default-source/undergraduate/hub/life-at-westminster/tristan-quote.png?Status=Temp&sfvrsn=2",
                    name: "TRISTAN — Class of 2019",
                    content: "When Tristan came to Westminster to audition for a theatre scholarship, he noticed all the professors—and even the other students auditioning with him—clearly wanted him to succeed. That support is what he values most today. You too will have the chance to build the kind of relationships that lift you up and move you forward.",
                    photo_url: "../images/default-source/undergraduate/hub/life-at-westminster/tristan-spotlight.jpg?Status=Temp&sfvrsn=2",
                    photo_url_mobile: "../../images/default-source/undergraduate/hub/life-at-westminster/tristan-spotlight-mobile.jpg?Status=Temp&sfvrsn=2"
                }, {
                    id: 3,
                    active: !0,
                    title: "Discover a place <br> of inspiration and personalized attention",
                    quote_url: "",
                    name: "",
                    content: "Westminster’s distinctive setting isn’t just a pretty backdrop. It’s the muse and canvas for experiential, place-based learning. Discover the wilderness of the West while receiving guidance from professors who know your name and take the time to help you grow into a better version of yourself.",
                    photo_url: "../../images/default-source/undergraduate/hub/life-at-westminster/carson-on-a-mountain.jpg?Status=Temp&sfvrsn=2",
                    photo_url_mobile: "../../images/default-source/undergraduate/hub/life-at-westminster/carson-on-a-mountain-mobile.jpg?Status=Temp&sfvrsn=2"
                }, {
                    id: 4,
                    active: !0,
                    title: "",
                    quote_url: "../../images/default-source/undergraduate/hub/life-at-westminster/audrey-quote.png?Status=Temp&sfvrsn=2",
                    name: "AUDREY — Class of 2018",
                    content: "At Westminster, Audrey enjoys marketing and gender studies classes, the golf team, intramural soccer, her campus community, her favorite Sugar House coffee shop, and the welcoming culture of the surrounding city. No matter what your interests are, you’ll find countless activities and spaces that make you feel at home.",
                    photo_url: "../../images/default-source/undergraduate/hub/life-at-westminster/audrey-spotlight.jpg?Status=Temp&sfvrsn=2",
                    photo_url_mobile: "../../images/default-source/undergraduate/hub/life-at-westminster/audrey-spotlight-mobile.jpg?Status=Temp&sfvrsn=2"
                }],
                s = document.getElementById("slider-life"),
                o = document.getElementById("slide-inner"),
                l = [];
        t.forEach(function(e) {
            e.active && e.photo_url && l.push(e)
        }), s && function(t) {
            var s = function(e) {
                for (var i = 0; i < e.length - 1; i++) {
                    var t = i + Math.floor(Math.random() * (e.length - i)),
                            s = e[t];
                    e[t] = e[i], e[i] = s
                }
                return e
            }(t);
            for (i = 0; i < s.length; i++) {
                var l = document.createElement("div"),
                        a = s[i];
                i, s.length, l.setAttribute("id", "slide-" + a.id), l.setAttribute("class", "slide");
                var n = '<div class="col-left">';
                n += '<div class="life-img"> <picture> <source media="(max-width: 992px)" srcset="' + e + a.photo_url_mobile + '"> <img src="' + e + a.photo_url + '" alt="Hero"></picture></div>', n += '<div class="plate-w"><svg version="1.1" id="Layer_1"xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 33.75 22.092" enable-background="new 0 0 33.75 22.092" xml:space="preserve"><g><defs><rect id="SVGID_1_" y="0" width="33.75" height="22.092"/></defs><clipPath id="SVGID_2_"><use xlink:href="#SVGID_1_"  overflow="visible"/></clipPath><path clip-path="url(#SVGID_2_)" fill="#FFFFFF" d="M28.663,13.506L20.866,0H11.66l12.755,22.092l4.603-7.972l0.354-0.614H28.663z M17.003,13.506L9.205,0H0l12.755,22.092l4.604-7.972l0.354-0.614H17.003z M33.75,0l-0.437,0.756v4.328 c0,0.342-0.184,0.656-0.481,0.824l-2.587,1.456l-2.587-1.456c-0.297-0.168-0.481-0.482-0.481-0.824V0.756L26.74,0H33.75z"/> </g></svg></div>', n += "</div>", n += '<div class="col-right">', n += '<div class="content-wrap">', a.quote_url && (n += '<div class="quote"><img src="' + e + a.quote_url + '" alt="Quote"></div>'), a.name && (n += '<div class="name">' + a.name + "</div>"), a.title && (n += '<div class="title">' + a.title + "</div>"), a.content && (n += '<div class="content">' + a.content + "</div>"), n += "</div>", n += "</div>", l.innerHTML = n, o.appendChild(l), $(l).hide().fadeIn(1e3)
            }
        }(l);
        var a = "",
                n = 0,
                r = 500;

        function d() {
            for (var e = [], i = 0; i < a.length; i++) {
                var t = $(a[i]).outerHeight();
                e.push(t)
            }
            var s = Math.max.apply(Math, e);
            $("#slider-life .slide-inner").css("min-height", s + "px")
        }

        function u(e) {
            navele = $("#slider-life .count-wrap .sl-count").children(), $("#slider-life .count-wrap .sl-count > span").removeClass("active"), $(navele[e]).addClass("active")
        }
        a = $("#slider-life .slide-inner").children(), a.length, n = 0, $(a[n]).addClass("active"), u(n), setTimeout(function() {
            d()
        }, 1e3), $(window).resize(function() {
            setTimeout(function() {
                d()
            }, r)
        })
    }
});
