const slider = document.querySelector(".slider");
const video = document.querySelector("video");
const playBtn = document.querySelector("#Play");
const muteBtn = document.querySelector("#mute-btn");
const control = document.querySelector(".control");

// search with jquery
$(document).ready(function () {
  $(".nav-click").click(function () {
    $(".overlay-menu").toggleClass("show");
    $(this).toggleClass("active");
    $(".navigation").toggleClass("show");
  });
  $(".overlay-menu").click(function () {
    $(this).removeClass("show");
    $(".navigation").removeClass("show");
  });
  function execSearch() {
    var e = $("#qsearch").val(),
      t = $("#href_search").val();
    if (e == $("#defaultvalue").val()) return !1;
    if ("" != e) {
      e = t + "?qsearch=" + encodeURIComponent(e);
      return (window.location = e), !1;
    }
  }
  function Search() {
    $("button.search").bind("click", function () {
      $("button.search").hasClass("active")
        ? ($(".search-form").removeClass("show"),
          $("button.search").removeClass("active"),
          execSearch())
        : ($(".search-form").addClass("show"),
          $("button.search").addClass("active"),
          document.getElementById("search").reset());
    }),
      $("#search").keydown(function (e) {
        13 == e.keyCode && execSearch();
      });
  }
  Search();
  // scroll behavior
  $(window).on("scroll", function () {
    var link = $(".box-nav a");
    var top = $(window).scrollTop();

    $(".sec").each(function () {
      var id = $(this).attr("id");
      var height = $(this).height();
      var offset = $(this).offset().top - 150;

      if (top >= offset && top < offset + height) {
        link.removeClass("active");
        $(".box-nav")
          .find('[data-scroll="' + id + '"]')
          .addClass("active");
      }
    });
  });
});

// Play and Pause
playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
function togglePlay() {
  video.paused ? video.play() : video.pause();
  slider.classList.toggle("hide");
  playBtn.classList.toggle("show");
}

// toggle mute
muteBtn.addEventListener("click", toggleMute);

function toggleMute() {
  if (video.muted === false) {
    video.muted = true;
    muteBtn.setAttribute("data-state", "unmute");
    control.style.setProperty("--boxAfterBackColor", "#af1e23");
  } else {
    video.muted = false;
    muteBtn.setAttribute("data-state", "mute");
    control.style.setProperty("--boxAfterBackColor", "#1c3e4c");
  }
}
// end video
video.onended = function () {
  video.play();
};

let slideImages = document.querySelectorAll(".slides img");
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");

let dots = document.querySelectorAll(".dotsContainer .dot");

var counter = 0;
// code for next button
next.addEventListener("click", slideNext);
function slideNext() {
  slideImages[counter].style.animation = "next1 1000ms ease forwards";
  if (counter >= slideImages.length - 1) {
    counter = 0;
  } else {
    counter++;
  }
  slideImages[counter].style.animation = "next2 1000ms ease forwards";
  indicators();
  clearInterval(deleteInterval);
  autoSliding();
}
// code for prev button
prev.addEventListener("click", slidePrev);
function slidePrev() {
  slideImages[counter].style.animation = "prev1 1000ms ease forwards";
  if (counter == 0) {
    counter = slideImages.length - 1;
  } else {
    counter--;
  }
  slideImages[counter].style.animation = "prev2 1000ms ease forwards";
  indicators();
  clearInterval(deleteInterval);

  autoSliding();
}
// auto sliding
function autoSliding() {
  deleteInterval = setInterval(timer, 5000);
  function timer() {
    slideNext();
    indicators();
  }
}
autoSliding();

function indicators() {
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  dots[counter].className += " active";
}

// click event on the indicator
function switchImage(currentImage) {
  currentImage.classList.add("active");
  var imageId = currentImage.getAttribute("attr");
  if (imageId > counter) {
    slideImages[counter].style.animation = "next1 1000ms ease forwards";
    counter = imageId;
    slideImages[counter].style.animation = "next2 1000ms ease forwards";
  } else if (imageId == counter) {
    return;
  } else {
    slideImages[counter].style.animation = "prev1 1000ms ease forwards";
    counter = imageId;
    slideImages[counter].style.animation = "prev2 1000ms ease forwards";
  }
  indicators();
  clearInterval(deleteInterval);
  autoSliding();
}

// group central 3
const slideImage = document.querySelectorAll(".slide-image");
const slidesContainer = document.querySelector(".slides-container");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const navigationDots = document.querySelector(".navigation-dots");
const proText = document.querySelectorAll(".pro-text");
let numberOfImages = slideImage.length;
let slideWidth = slideImage[0].clientWidth;
let currentSlide = 0;

function init() {
  slideImage.forEach((img, i) => {
    img.style.left = i * 100 + "%";
  });
  slideImage[0].classList.add("active");
  proText[0].classList.add("active");

  createNavigationDots();
}

init();
// create navigation dots
function createNavigationDots() {
  for (let i = 0; i < numberOfImages; i++) {
    const dot = document.createElement("div");
    dot.classList.add("single-dot");
    navigationDots.appendChild(dot);
    dot.addEventListener("click", () => {
      goToSlide(i);
    });
  }
  navigationDots.children[0].classList.add("active");
}

// Next button
nextBtn.addEventListener("click", () => {
  if (currentSlide >= numberOfImages - 1) {
    goToSlide(0);
    return;
  }
  currentSlide++;
  goToSlide(currentSlide);
});

// prev button
prevBtn.addEventListener("click", () => {
  if (currentSlide <= 0) {
    goToSlide(numberOfImages - 1);
    return;
  }
  currentSlide--;
  goToSlide(currentSlide);
});
// go to slide

function goToSlide(slideNumber) {
  slidesContainer.style.transform =
    "translateX(-" + slideWidth * slideNumber + "px)";
  currentSlide = slideNumber;
  setActiveClass();
}

// set active class
function setActiveClass() {
  let currentActive = document.querySelector(".slide-image.active");
  let proTextActive = document.querySelector(".pro-text.active");

  currentActive.classList.remove("active");
  proTextActive.classList.remove("active");

  slideImage[currentSlide].classList.add("active");
  proText[currentSlide].classList.add("active");

  // set active class for navigation dots
  let currentDot = document.querySelector(".single-dot.active");
  currentDot.classList.remove("active");
  navigationDots.children[currentSlide].classList.add("active");
}

// change slide
var groupCentral = document.querySelectorAll(".group-central");
var navDots = document.querySelectorAll(".box-nav ul li a");
var navNumber = navDots.length;
for (let i = 0; i < navNumber; i++) {
  navDots[i].onclick = function () {
    if (groupCentral[i].classList.contains("show-text")) {
      groupCentral[i].classList.remove("show-text");
    } else {
      groupCentral[i].classList.add("show-text");
    }
  };
}
// group central 4

const slideImage2 = document.querySelectorAll(".slide-item");
const slidesContainer2 = document.querySelector(".slide-wrapper");
const nextBtn2 = document.querySelector(".next-btn-2");
const prevBtn2 = document.querySelector(".prev-btn-2");
const navigationDots2 = document.querySelector(".navigation-dots2");
let numberOfImages2 = slideImage2.length;
let slideWidth2 = slideImage2[0].clientWidth;
let currentSlide2 = 0;
function init2() {
  // slideImage2[0]=0
  // slideImage2[1]=100%
  // slideImage2[2]=200%
  slideImage2.forEach((img, i) => {
    img.style.left = i * 50 + "%";
  });
  slideImage2[0].classList.add("active");
  createNavigationDots2();
}
init2();
// create navigation dot2
function createNavigationDots2() {
  for (let i = 0; i < numberOfImages2 - 1; i++) {
    const dot2 = document.createElement("div");
    dot2.classList.add("single-dot2");
    navigationDots2.appendChild(dot2);
    dot2.addEventListener("click", () => {
      goToSlide2(i);
    });
  }
  navigationDots2.children[0].classList.add("active");
}

// next button
nextBtn2.addEventListener("click", () => {
  if (currentSlide2 >= numberOfImages2 - 2) {
    goToSlide2(0);
    return;
  }
  currentSlide2++;
  goToSlide2(currentSlide2);
});

// prev button
prevBtn2.addEventListener("click", () => {
  if (currentSlide2 <= 0) {
    goToSlide2(numberOfImages2 - 2);
    return;
  }
  currentSlide2--;
  goToSlide2(currentSlide2);
});
// go to slide
function goToSlide2(slideNumber2) {
  slidesContainer2.style.transform =
    "translateX(-" + slideWidth2 * slideNumber2 + "px)";
  currentSlide2 = slideNumber2;
  setActiveClass2();
}

// set active class
function setActiveClass2() {
  let currentActive2 = document.querySelector(".slide-item.active");

  currentActive2.classList.remove("active");
  slideImage2[currentSlide2].classList.add("active");
  // set active class for navigation dots
  let currentDot2 = document.querySelector(".single-dot2.active");

  currentDot2.classList.remove("active");
  navigationDots2.children[currentSlide2].classList.add("active");
}
var myVar;
function loadPage() {
  myVar = setTimeout(showPage, 3500);
}
function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("my-container").style.display = "block";
}
