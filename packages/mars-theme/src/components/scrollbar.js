import { styleGuide } from "./styles/style-guide";


//TODO arreglar que no se ve el contenido detras de la navbar
export const scrollbarInit = function ({
  scrollableComponent,
  colorTheme,
  fixedPos,
  perspectiveCtr,
  thumb
}) {
  // Scrollbar functionality following (and adapting) this example:
  // https://developers.google.com/web/updates/2017/03/custom-scrollbar
  // https://github.com/GoogleChromeLabs/ui-element-samples/blob/gh-pages/custom-scrollbar/index.html

  let dragging = false;
  let lastY = 0;

  document.querySelector("#root").style.height = "100%";

  function dragStart(event) {
    dragging = true;
    this.style.pointerEvents = "none";
    this.style.userSelect = "none";

    lastY =
      event.clientY || event.clientY === 0
        ? event.clientY
        : event.touches[0].clientY;
  }

  function dragMove(event) {
    if (!dragging) return;
    let clientY =
      event.clientY || event.clientY === 0
        ? event.clientY
        : event.touches[0].clientY;
    this.scrollTop += (clientY - lastY) / this.thumb.scaling;
    lastY = clientY;
    event.preventDefault();
  }

  function dragEnd(event) {
    dragging = false;
    this.style.pointerEvents = "initial";
    this.style.userSelect = "initial";
  }

  // The point of this function is to update the thumb's geometry to reflect
  // the amount of overflow.
  function updateSize(scrollable) {
    scrollable.style.width = "";
    scrollable.style.width = `${getComputedStyle(scrollable).width}`;

    let thumb = scrollable.thumb;
    let viewport = scrollable.getBoundingClientRect();
    let scrollHeight = scrollable.scrollHeight;
    let maxScrollTop = scrollHeight - viewport.height;
    // let thumbHeight = Math.pow(viewport.height, 2) / scrollHeight;
    let thumbHeight = thumb.getBoundingClientRect().height;
    let maxTopOffset = viewport.height - thumbHeight;
    thumb.scaling = maxTopOffset / maxScrollTop;
    // thumb.style.height = `${thumbHeight}px`;

    if (scrollable.isIOS) {
      thumb.nextElementSibling.style.marginTop = `-${thumbHeight}px`;
      let z = 1 - 1 / (1 + thumb.scaling);
      thumb.style.transform = `
          translateZ(${z}px)
          scale(${1 - z})
          
        `;
    } else {
      thumb.style.transform = `
           scale(${1 / thumb.scaling})
           matrix3d(
             1, 0, 0, 0,
             0, 1, 0, 0,
             0, 0, 1, 0,
             0, 0, 0, -1
           )
           translateZ(${-2 + 1 - 1 / thumb.scaling}px)
           
        `;
    }
  }

  function makeCustomScrollbar(scrollable) {
    // Edge requires a transform on the document body and a fixed position element
    // in order for it to properly render the parallax effect as you scroll.
    // See https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/5084491/
    if (getComputedStyle(document.body).transform == "none")
      document.body.style.transform = "translateZ(0)";
    // const fixedPos = document.createElement("div");
    fixedPos.style.position = "fixed";
    fixedPos.style.top = "0";
    fixedPos.style.width = "1px";
    fixedPos.style.height = "1px";
    fixedPos.style.zIndex = 1;
    // document.body.insertBefore(fixedPos, document.body.firstChild);

    scrollable.style.perspectiveOrigin = "top left";
    scrollable.style.transformStyle = "preserve-3d";
    scrollable.style.perspective = "1px";

    // const perspectiveCtr = document.createElement("div");
    perspectiveCtr.style.perspectiveOrigin = "top left";
    perspectiveCtr.style.transformStyle = "preserve-3d";
    perspectiveCtr.style.width = "100%";
    perspectiveCtr.style.position = "absolute";
    perspectiveCtr.style.display = "grid";
    perspectiveCtr.style.gridTemplateColumns = "repeat(12, 1fr)";
    perspectiveCtr.style.gridGap = "1rem";
    perspectiveCtr.style.padding = "0 2vw";
    // perspectiveCtr.classList.add("perspective-ctr");

    // while (scrollable.firstChild)
      // perspectiveCtr.appendChild(scrollable.firstChild);

    // scrollable.insertBefore(perspectiveCtr, scrollable.firstChild);
    // const thumb = document.createElement("div");
    thumb.style.width = "30px";
    thumb.style.height = "30px";
    thumb.style.borderRadius = "50%";
    thumb.style.backgroundColor = styleGuide.colorScheme[colorTheme].accent;
    thumb.style.pointerEvents = "initial";
    thumb.style.position = "absolute";
    thumb.style.transformOrigin = "top left";
    thumb.style.top = "0";
    thumb.style.left = "0";
    thumb.style.cursor = "pointer";
    // perspectiveCtr.insertBefore(thumb, perspectiveCtr.firstChilds);

    scrollable.thumb = thumb;
    scrollable.perspectiveCtr = perspectiveCtr;

    // We are on Safari, where we need to use the sticky trick!
    if (getComputedStyle(scrollable).webkitOverflowScrolling) {
      //TODO ver que esto esta bien
      scrollable.isIOS = true;
      thumb.style.right = "";
      thumb.style.left = "100%";
      thumb.style.position = "-webkit-sticky";
      perspectiveCtr.style.perspective = "1px";
      perspectiveCtr.style.height = "";
      perspectiveCtr.style.width = "";
      perspectiveCtr.style.position = "";
      Array.from(scrollable.children)
        .filter(function (e) {
          return e !== perspectiveCtr;
        })
        .forEach(function (e) {
          perspectiveCtr.appendChild(e);
        });
    }

    scrollable.thumb.addEventListener("mousedown", dragStart.bind(scrollable), {
      passive: true,
    });
    window.addEventListener("mousemove", dragMove.bind(scrollable));
    window.addEventListener("mouseup", dragEnd.bind(scrollable), {
      passive: true,
    });
    scrollable.thumb.addEventListener(
      "touchstart",
      dragStart.bind(scrollable),
      { passive: true }
    );
    window.addEventListener("touchmove", dragMove.bind(scrollable));
    window.addEventListener("touchend", dragEnd.bind(scrollable), {
      passive: true,
    });

    const f = function () {
      updateSize(scrollable);
    };
    requestAnimationFrame(f);
    window.addEventListener("resize", f);
    return f;
  }

  makeCustomScrollbar(scrollableComponent);
  updateSize(scrollableComponent);
};
