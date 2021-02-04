/** @jsx jsx */
import {
  Component,
  createRef,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { css, jsx } from "@emotion/core";
import { Card } from "react-bootstrap";
import { Scrollama, Step } from "react-scrollama";
// import Lottie from 'react-lottie';
import Tabletop from "tabletop";
import scrollama from "scrollama";
// import Lottie from 'lottie-react-web';
// import "@lottiefiles/lottie-player";
import "@lottiefiles/lottie-player";
import { create } from "@lottiefiles/lottie-interactivity";
// import { Lottie } from './components/Lottie';

import VideoBackground from "./VideoBackground";

import ScrollAnimation from "./ScrollAnimation";
import Gallery from "./Gallery";
import FlockAnimation from "./FlockAnimation";
import WaterAnimation from "./WaterAnimation";

import Chart from "./Chart";
import D3Header from "./D3Header";

import button from "../button.svg";
import { TangentSpaceNormalMap } from "three";

//** values ​​handled in percentages, example 25 = 25% ***********/
const fadeIn = 10; // the lottie appears completely when this percentage is reached
const fadeOut = 85; // the lottie starts to disappear when this percentage is reached

/****************** */

// console.log(myScrollyTellerInstance);

const narration = require("../assets/data/narration.json");

const narrativeStyle = css`
  img {
    max-width: 100%;
  }
  .left-side {
    height: 100vh;
  }
  .graphic {
    flex-basis: 50%;
    position: sticky;
    top: 0;
    width: 100%;
    height: 75vh;
    align-self: flex-start;
  }
  .data {
    font-size: 5rem;
    text-align: center;
  }

  .card-text {
    font-size: 18px !important;
    line-height: 1.3;
  }
  .step {
    height: 100vh;
    position: relative;
    z-index: 100;
    margin-top: 10px;
    padding-top: 200px;
    padding-bottom: 200px;
    "&:last-child": {
      margin-bottom: 100px;
    }
    font-size: 20px;
  }
  .card {
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.25);
    margin-left: 20px;
    margin-right: 20px;
    text-align: center;
    padding: 10%;
    background: white;
  }
  .blurb {
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 3%;
    text-align: center;
    font-size: 24px;
    min-height: 50%;
  }
  .desc {
    margin-left: 20px;
    margin-right: 20px;
  }
  .btn {
    color: #575757;
  }
  .card-text-s {
    padding: 10%;
    font-size: 24px !important;
  }

  lottie-player {
    transition: all ease 100ms;
  }

  .main {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 940px) {
    .main {
      grid-template-columns: 1fr 300px;
    }
  }

  @media screen and (max-width: 600px) {
    .main {
      grid-template-columns: 1fr;
    }
    .step {
      position: relative;
      z-index: 100;
      opacity: 0.9;
      padding-top: 50px;
    }
  }
`;
const introBlurb = (
  <div>
    <br></br>
    <p>
      You can intro your story here, or delete this by deleting the "introBlurb"
      constant from being defined and from being rendered. This text export from
      goole sheet
    </p>
    <br></br>
  </div>
);

function Scrollyteller() {
  const [data, setData] = useState("1");
  const [progress, setProgress] = useState(0);
  const [src, setSrc] = useState("");
  const [items, setItems] = useState([]);

  let cardScroll = items ? [...items].splice(2, items.length - 1) : null;
  cardScroll = cardScroll ? cardScroll.splice(0, cardScroll.length - 1) : null;

  let lotties = items ? [...cardScroll].filter((e) => e[0].frames != "") : null;
  // console.log(lotties);
  useEffect(() => {
    Tabletop.init({
      key:
        "https://docs.google.com/spreadsheets/d/1RfjhL5U0DvF1P6FtedRA4JuODHe0d1s8XbGgNKHmfdM/edit#gid=0",
      simpleSheet: false,
    })
      .then((items) => {
        let auxItems = [];
        let value = "1";

        for (let i = 0; i < items["Sheet2"].elements.length; i++) {
          let auxArray = items["Sheet2"].elements.filter(
            (e) => e.slide === value
          );

          i += auxArray.length;
          i--;

          value = items["Sheet2"].elements[i + 1]?.slide;

          auxItems.push(auxArray);
        }

        console.log(auxItems);
        setItems(auxItems);
      })
      .catch((err) => console.warn(err));
  }, []);

  useEffect(() => {
    // instantiate the scrollama
    const scroller = scrollama();

    // setup the instance, pass callback functions
    scroller
      .setup({
        step: ".step",
      })
      .onStepEnter((response) => {
        // { element, index, direction }
        if (response.index === 1) {
          response.element.style.background = "none";
        } else if (response.index === 2) {
          response.element.style.background = "none";
        } else {
          response.element.style.background = "none";
        }
      })
      .onStepExit((response) => {
        if (response.index === 1) {
          response.element.style.background = "none";
        } else if (response.index === 2) {
          response.element.style.background = "none";
        } else {
          response.element.style.background = "none";
        }
      });

    // setup resize event
    window.addEventListener("resize", scroller.resize);

    return () => window.removeEventListener("resize", scroller.resize);
  }, []);

  useEffect(() => {
    const actSlide = document.querySelector(`.left-side:nth-child(${data})`);

    if (actSlide) {
      const auxFadeIn = fadeIn / 100;
      const auxFadeOut = fadeOut / 100;

      if (items.length > 1) {
        if (progress <= auxFadeIn) {
          actSlide.style.opacity = `${progress * (1 / auxFadeIn)}`;
        } else if (progress > auxFadeIn && progress < auxFadeOut) {
          actSlide.style.opacity = "1";
        } else {
          actSlide.style.opacity = `${(1 - progress) * (1 / (1 - auxFadeOut))}`;
        }
      }
    }
  }, [progress, data, items.length]);

  useEffect(() => {
    console.log(document.querySelectorAll("lottie-player"));
    document.querySelectorAll("lottie-player").forEach((lottie, i) => {
      lottie.addEventListener("load", function (e) {
        create({
          mode: "scroll",
          player: `#lottie${lottie.id.split("lottie")[1]}`,
          container: `#step${lottie.id.split("lottie")[1]}`,
          actions: [
            {
              visibility: [0.3, 0.8],
              type: "seek",
              frames: [0, lotties[i][0].frames],
            },
          ],
        });
      });
    });
  }, [items]);

  const onStepEnter = ({ data }) => {
    document
      .querySelectorAll(".left-side")
      .forEach(
        (lottie, index) =>
          (lottie.style.display = index + 1 == data ? "block" : "none")
      );

    // document.querySelector('.content').style.display = data >= 8 ? 'block' : 'none';
    setData(data);
    setProgress(0);
  };

  const onStepExit = ({ element }) => {
    // console.log(element)
    setProgress(0);
    // element.style.backgroundColor = "#fff";
  };

  const onStepProgress = ({ element, progress }) => {
    // console.log(element)
    // console.log(progress)
    setProgress(progress);
    // this.setState({ progress });
  };

  return (
    <div>
      <div css={narrativeStyle}>
        {items.length > 0 ? (
          <div>
            <D3Header texts={items[0].map((e) => e.description)} />

            <Chart texts={items[1].map((e) => e.description)} />
          </div>
        ) : null}

        <div className="main">
          <div className="graphic">
            {items.length > 0
              ? cardScroll.map((left, i) => {
                  if (left[0].slideType === "video") {
                    return (
                      <div className="left-side" key={i}>
                        <VideoBackground src={left[0].data} />
                      </div>
                    );
                  } else if (left[0].slideType === "2d") {
                    return (
                      <lottie-player
                        class="left-side"
                        id={`lottie${i + 1}`}
                        mode="seek"
                        src={left[0].data}
                        key={i}
                      ></lottie-player>
                    );
                  } else if (left[0].slideType === "3d") {
                    if (left[0].data === "dark") {
                      return (
                        <div className="left-side">
                          <p>video 3d</p>
                          <WaterAnimation />
                        </div>
                      );
                    }
                  } else if (left[0].slideType === "porfolio") {
                    return (
                      <div className="left-side">
                        <Gallery />
                      </div>
                    );
                  }

                  return null;
                })
              : null}
          </div>

          <div className="scroller" id="scroller">
            <Scrollama
              onStepEnter={onStepEnter}
              onStepExit={onStepExit}
              progress
              onStepProgress={onStepProgress}
              offset={0.33}
            >
              {cardScroll.length > 0
                ? cardScroll.map((narr, i) => {
                    return (
                      <Step data={i + 1} key={i + 1}>
                        <div
                          className="step"
                          id={`step${i + 1}`}
                          style={{
                            marginBottom: "120px",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}
                        >
                          {narr ? (
                            narr.map((card, j) => (
                              <div
                                className="desc"
                                id={`desc${i + 1}-${j + 1}`}
                                key={`${i}-${j}`}
                              >
                                <Card>
                                  <Card.Body>
                                    <Card.Text>{card.description}</Card.Text>
                                  </Card.Body>
                                </Card>
                              </div>
                            ))
                          ) : (
                            <div
                              className="desc"
                              id={`desc${i + 1}`}
                              key={`${i}`}
                            >
                              <Card>
                                <Card.Body>
                                  <Card.Text>Loading</Card.Text>
                                </Card.Body>
                              </Card>
                            </div>
                          )}
                        </div>
                      </Step>
                    );
                  })
                : narration.map((narr) => (
                    <Step data={narr.key} key={narr.key}>
                      <div
                        className="step"
                        id={`step${narr.key}`}
                        style={{ marginBottom: "100px" }}
                      >
                        <div className="desc" id={"desc" + narr.key}>
                          <Card>
                            <Card.Body>
                              <Card.Text>{narr.description}</Card.Text>
                            </Card.Body>
                          </Card>
                        </div>
                      </div>
                    </Step>
                  ))}
            </Scrollama>
          </div>
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <FlockAnimation />
        <div
          style={{
            position: "absolute",
            top: "0",
            display: "grid",
            placeItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                background: "white",
                padding: "20px",
                boxShadow: "2px 2px 10px white",
              }}
            >
              <Card>
                <Card.Body>
                  <Card.Text>
                    {items.length > 0 ? items[12][0].description : "loading..."}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div
              style={{
                marginTop: "20px",
                background: "#606060",
                padding: "15px 20px",
                borderRadius: "30px",
                border: "2px solid white",
                width: "max-content",
                cursor: "pointer",
              }}
            >
              <span style={{ width: "max-content", color: "white" }}>
                {items.length > 0 ? items[12][1].description : "loading..."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scrollyteller;
