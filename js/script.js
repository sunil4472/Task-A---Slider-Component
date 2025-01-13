var cards = $("#card_slider .slider_item").toArray();
var isDragging = false;
var isAnimating = false;
var startY = 0;

initializePositions(cards);

$("#card_slider").on("mousedown touchstart", function (e) {
    startY = e.type === "mousedown" ? e.pageY : e.originalEvent.touches[0].pageY;
    isDragging = true;
});

$("#card_slider").on("mouseup touchend", function () {
    if (isDragging) {
        isDragging = false;
    }
});

$("#card_slider").on("mousemove touchmove", function (e) {
    if (isDragging && !isAnimating) {
        var currentY = e.type === "mousemove" ? e.pageY : e.originalEvent.touches[0].pageY;
        if (currentY < startY - 50) {
            isDragging = false;
            manualScroll(cards, "upward");
        } else if (currentY > startY + 50) {
            isDragging = false;
            manualScroll(cards, "downward");
        }
    }
});

function initializePositions(array) {
    if (array.length >= 4) {
        TweenMax.set(array[0], { x: 0, y: 0, opacity: 0.75, zIndex: 0 });
        TweenMax.set(array[1], { x: 0, y: 125, opacity: 1, zIndex: 1 });
        TweenMax.set(array[2], { x: 0, y: 250, opacity: 0.75, zIndex: 0 });
        TweenMax.set(array[3], { x: 0, y: 400, opacity: 0, zIndex: 0 });
    } else {
        $("#card_slider").append("<p>Sorry, carousel should contain more than 3 slides</p>");
    }
}

function manualScroll(array, direction) {
    isAnimating = true;
    if (array.length >= 4) {
        if (direction === "upward") {
            animateUpward(array);
        } else if (direction === "downward") {
            animateDownward(array);
        }
    } else {
        $("#card_slider").append("<p>Sorry, carousel should contain more than 3 slides</p>");
    }
}

function animateUpward(array) {
    TweenMax.fromTo(
        array[0],
        0.5,
        { x: 0, y: 0, opacity: 0.75 },
        {
            x: 0,
            y: -120,
            opacity: 0,
            zIndex: 0,
            delay: 0.03,
            ease: Cubic.easeInOut,
            onComplete: function () {
                var firstElem = array.shift();
                array.push(firstElem);
                isAnimating = false;
            },
        }
    );

    TweenMax.fromTo(
        array[1],
        0.5,
        { x: 0, y: 125, opacity: 1, zIndex: 1 },
        {
            x: 0,
            y: 0,
            opacity: 0.75,
            zIndex: 0,
            boxShadow: "-5px 8px 8px 0 rgba(82,89,129,0.05)",
            ease: Cubic.easeInOut,
        }
    );

    TweenMax.to(array[2], 0.5, {
        bezier: [
            { x: 0, y: 250 },
            { x: 0, y: 500 },
            { x: 0, y: 160 },
        ],
        boxShadow: "-5px 8px 8px 0 rgba(82,89,129,0.05)",
        zIndex: 1,
        opacity: 1,
        ease: Cubic.easeInOut,
    });

    TweenMax.fromTo(
        array[3],
        0.5,
        { x: 0, y: 400, opacity: 0, zIndex: 0 },
        { x: 0, y: 250, opacity: 0.75, zIndex: 0, ease: Cubic.easeInOut }
    );
}

function animateDownward(array) {
    var lastElem = array.pop();
    array.unshift(lastElem);

    TweenMax.fromTo(
        array[0],
        0.5,
        { x: 0, y: -120, opacity: 0, zIndex: 0 },
        {
            x: 0,
            y: 0,
            opacity: 0.75,
            zIndex: 0,
            ease: Cubic.easeInOut,
            onComplete: function () {
                isAnimating = false;
            },
        }
    );

    TweenMax.fromTo(
        array[1],
        0.5,
        { x: 0, y: 0, opacity: 0.75, zIndex: 0 },
        {
            x: 0,
            y: 125,
            opacity: 1,
            zIndex: 1,
            boxShadow: "-5px 8px 8px 0 rgba(82,89,129,0.05)",
            ease: Cubic.easeInOut,
        }
    );

    TweenMax.to(array[2], 0.5, {
        bezier: [
            { x: 0, y: 160 },
            { x: 0, y: 500 },
            { x: 0, y: 250 },
        ],
        boxShadow: "-5px 8px 8px 0 rgba(82,89,129,0.05)",
        zIndex: 1,
        opacity: 1,
        ease: Cubic.easeInOut,
    });

    TweenMax.fromTo(
        array[3],
        0.5,
        { x: 0, y: 250, opacity: 0.75, zIndex: 0 },
        { x: 0, y: 400, opacity: 0, zIndex: 0, ease: Cubic.easeInOut }
    );
}
