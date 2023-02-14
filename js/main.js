(() => {
  let yOffset;
  let prevScrollHeight = 0;
  let currentSec = 0;
  let intoNewSec = false;

  const secInfo = [
    {
      //0
      type: "normal",
      heightNum: 3.5,
      scrollHeight: 0,
      el: {
        section: document.querySelector(".section_0"),
        mainTitle: document.querySelector(".main_title"),
        line_1: document.querySelector(".section_0 .line_1"),
        line_2: document.querySelector(".section_0 .line_2"),
        line_3: document.querySelector(".section_0 .line_3"),
        line_4: document.querySelector(".section_0 .line_4"),
        line_5: document.querySelector(".section_0 .line_5"),
        line_6: document.querySelector(".section_0 .line_6"),
        title_1: document.querySelector(".section_0 .title_1"),
        title_2: document.querySelector(".section_0 .title_2"),
        title_3: document.querySelector(".section_0 .title_3"),
        title_4: document.querySelector(".section_0 .title_4"),
      },
      values: {
        mainTitle_opacity: [1, 0, { start: 0, end: 0.2 }],
        mainTitle_translateY: [0, -40, { start: 0, end: 0.2 }],

        line_1_scale: [0.03, 1, { start: 0.2, end: 0.4 }],
        line_2_scale: [0.03, 1, { start: 0.1, end: 0.35 }],
        line_3_scale: [0.03, 1, { start: 0.175, end: 0.45 }],
        line_4_scale: [0.03, 1, { start: 0.4, end: 0.55 }],
        line_5_scale: [0.03, 1, { start: 0.5, end: 0.75 }],
        line_6_scale: [0.03, 1, { start: 0.67, end: 0.85 }],

        title_1_translateX: [0, 50, { start: 0.2, end: 0.4 }],
        title_2_translateX: [70, 0, { start: 0.27, end: 0.5 }],
        title_3_translateX: [0, 20, { start: 0.4, end: 0.6 }],
        title_4_translateX: [70, 0, { start: 0.57, end: 0.8 }],
      },
    },
    {
      //1
      type: "normal",
      heightNum: 5,
      scrollHeight: 0,
      el: {
        section: document.querySelector(".section_1"),
        centerImg: document.querySelector(".section_1 .center_img"),
        mainTitle: document.querySelector(".section_1 .main_title"),

        line_1: document.querySelector(".section_1 .line_1"),
        line_2: document.querySelector(".section_1 .line_2"),
        line_3: document.querySelector(".section_1 .line_3"),
        line_4: document.querySelector(".section_1 .line_4"),
        line_5: document.querySelector(".section_1 .line_5"),
      },
      values: {
        centerImg_translateY: [40, 0, { start: 0, end: 0.2 }],
        mainTitle_translateY: [100, -200, { start: 0, end: 0.2 }],

        line_1_scale: [0.03, 1, { start: 0.1, end: 0.3 }],
        line_2_scale: [0.03, 1, { start: 0.2, end: 0.4 }],
        line_3_scale: [0.03, 1, { start: 0.3, end: 0.5 }],
        line_4_scale: [0.03, 1, { start: 0.4, end: 0.6 }],
        line_5_scale: [0.03, 1, { start: 0.5, end: 0.7 }],
      },
    },
    {
      //2
      type: "normal",
      heightNum: 1,
      scrollHeight: 0,
      el: {
        section: document.querySelector(".section_2"),
      },
    },
    // {
    //   //3
    //   type: "normal",
    //   heightNum: 5,
    //   scrollHeight: 0,
    //   el: {
    //     section: document.querySelector(".section_3"),
    //   },
    // },
  ];

  const setLayout = () => {
    for (let i = 0; i < secInfo.length; i++) {
      if (secInfo[i].type === "normal") {
        secInfo[i].scrollHeight = secInfo[i].el.section.offsetHeight;
      } else {
        secInfo[i].scrollHeight = secInfo[i].heightNum * window.innerHeight;
      }
      secInfo[i].el.section.style.height = `${secInfo[i].scrollHeight}px`;
    }

    yOffset = window.pageYOffset;
    let totalHeight = 0;
    for (let i = 0; i < secInfo.length; i++) {
      totalHeight += secInfo[i].scrollHeight;
      if (yOffset < totalHeight) {
        currentSec = i;
        break;
      }
    }

    document.body.setAttribute("id", `show_sec_${currentSec}`);
  };

  const calcValues = (values, currentYOffset) => {
    let reValue;
    const scrollHeight = secInfo[currentSec].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    if (values.length === 3) {
      const partStart = values[2].start * scrollHeight;
      const partEnd = values[2].end * scrollHeight;
      const partScroll = partEnd - partStart;

      if (currentYOffset >= partStart && currentYOffset <= partEnd) {
        reValue =
          ((currentYOffset - partStart) / partScroll) *
            (values[1] - values[0]) +
          values[0];
      } else if (currentYOffset < partStart) {
        reValue = values[0];
      } else if (currentYOffset > partEnd) {
        reValue = values[1];
      }
    } else {
      reValue = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return reValue;
  };

  const aniHandler = () => {
    const el = secInfo[currentSec].el;
    const values = secInfo[currentSec].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = secInfo[currentSec].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    switch (currentSec) {
      case 0:
        el.mainTitle.style.opacity = calcValues(
          values.mainTitle_opacity,
          currentYOffset
        );

        el.mainTitle.style.transform = `translate3d(0,${calcValues(
          values.mainTitle_translateY,
          currentYOffset
        )}%,0)`;

        el.title_1.style.transform = `translate3d(${calcValues(
          values.title_1_translateX,
          currentYOffset
        )}%,0,0)`;

        el.title_2.style.transform = `translate3d(${calcValues(
          values.title_2_translateX,
          currentYOffset
        )}%,0,0)`;

        el.title_3.style.transform = `translate3d(${calcValues(
          values.title_3_translateX,
          currentYOffset
        )}%,0,0)`;

        el.title_4.style.transform = `translate3d(${calcValues(
          values.title_4_translateX,
          currentYOffset
        )}%,0,0)`;

        if (scrollRatio <= 0.22) {
          el.line_1.style.transform = `scale(${calcValues(
            values.line_1_scale,
            currentYOffset
          )},1)`;
        }

        if (scrollRatio <= 0.37) {
          el.line_2.style.transform = `scale(${calcValues(
            values.line_2_scale,
            currentYOffset
          )},1)`;
        }

        if (scrollRatio <= 0.47) {
          el.line_3.style.transform = `scale(${calcValues(
            values.line_3_scale,
            currentYOffset
          )},1)`;
        }

        if (scrollRatio <= 0.57) {
          el.line_4.style.transform = `scale(${calcValues(
            values.line_4_scale,
            currentYOffset
          )},1)`;
        }

        if (scrollRatio <= 0.77) {
          el.line_5.style.transform = `scale(${calcValues(
            values.line_5_scale,
            currentYOffset
          )},1)`;
        }

        if (scrollRatio <= 0.87) {
          el.line_6.style.transform = `scale(${calcValues(
            values.line_6_scale,
            currentYOffset
          )},1)`;
        }

        break;

      case 1:
        if (scrollRatio <= 0.22) {
          el.centerImg.style.transform = `translate3d(0,${calcValues(
            values.centerImg_translateY,
            currentYOffset
          )}%,0)`;

          el.mainTitle.style.transform = `translate3d(-50%,${calcValues(
            values.mainTitle_translateY,
            currentYOffset
          )}%,0)`;
        }

        if (scrollRatio <= 0.32) {
          el.line_1.style.transform = `scale(${calcValues(
            values.line_1_scale,
            currentYOffset
          )},1)`;
        }

        if (scrollRatio <= 0.42) {
          el.line_2.style.transform = `scale(${calcValues(
            values.line_2_scale,
            currentYOffset
          )},1)`;
        }

        if (scrollRatio <= 0.52) {
          el.line_3.style.transform = `scale(${calcValues(
            values.line_3_scale,
            currentYOffset
          )},1)`;
        }

        if (scrollRatio <= 0.62) {
          el.line_4.style.transform = `scale(${calcValues(
            values.line_4_scale,
            currentYOffset
          )},1)`;
        }

        if (scrollRatio <= 0.72) {
          el.line_5.style.transform = `scale(${calcValues(
            values.line_5_scale,
            currentYOffset
          )},1)`;
        }

        break;

      case 2:
        break;

      case 3:
        break;
    }
  };

  const scrollHandler = () => {
    intoNewSec = false;
    prevScrollHeight = 0;
    for (let i = 0; i < currentSec; i++) {
      prevScrollHeight += secInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + secInfo[currentSec].scrollHeight) {
      intoNewSec = true;
      currentSec++;
      document.body.setAttribute("id", `show_sec_${currentSec}`);
    }

    if (yOffset < prevScrollHeight) {
      intoNewSec = true;
      if (yOffset === 0) return;
      currentSec--;
      document.body.setAttribute("id", `show_sec_${currentSec}`);
    }

    if (intoNewSec) return;

    aniHandler();
  };

  window.addEventListener("load", () => {
    setLayout();

    window.addEventListener("resize", setLayout);

    window.addEventListener("scroll", () => {
      yOffset = window.pageYOffset;
      scrollHandler();
    });
  });
})();
