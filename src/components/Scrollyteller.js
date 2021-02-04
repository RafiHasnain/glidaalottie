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

import Chart from "./Chart";
import D3Header from "./D3Header";

//** values ​​handled in percentages, example 25 = 25% ***********/
const fadeIn = 10; // the lottie appears completely when this percentage is reached
const fadeOut = 85; // the lottie starts to disappear when this percentage is reached

/****************** */

// console.log(myScrollyTellerInstance);

// const narration = require("../assets/data/narration.json");

const narrativeStyle = css`
  img {
    max-width: 100%;
  }
  .left-side {
    position: relative;
  }
  .graphic {
    flex-basis: 50%;
    position: sticky;
    top: 15vh;
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
    if (items.length > 0) {
      document.querySelectorAll("lottie-player").forEach((lottie, i) => {
        lottie.addEventListener("load", function (e) {
          create({
            mode: "scroll",
            player: `#lottie${i + 1}`,
            container: `#step${i + 1}`,
            actions: [
              {
                visibility: [0.3, 0.8],
                type: "seek",
                frames: [0, items[i].frames],
              },
            ],
          });
        });
      });
    }
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
      {items.length > 0 ? (
        <div css={narrativeStyle}>
          <D3Header texts={items[0].map((e) => e.description)} />
          <Chart texts={items[1].map((e) => e.description)} />

          <div className="main">
            <div className="graphic"></div>
            <div className="scroller">
              <Scrollama
                onStepEnter={onStepEnter}
                onStepExit={onStepExit}
                progress
                onStepProgress={onStepProgress}
                offset={0.33}
              >
                {items.map((item, i) => {
                  if (i > 1 && i < items.length - 1) {
                    return (
                      <Step data={i + 1} key={i + 1}>
                        <div
                          className="step"
                          id={`step${i + 1}`}
                          style={{ marginBottom: "120px" }}
                        >
                          {item.map((card, j) => (
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
                          ))}
                        </div>
                      </Step>
                    );
                  }

                  return <p></p>;
                })}
              </Scrollama>
            </div>
          </div>
        </div>
      ) : null}

      {/* <div className="main">
          <div className="graphic">
          <div
              class="left-side"
              style={{ height: "100vh", display: "grid", placeItems: "center" }}
            >
              <VideoBackground src={Video} />
            </div>
            {items.length > 2 && items.url_lottie !== "" ? (
              items.map((item, idx) => (
                <lottie-player
                  class="left-side"
                  // ref={refs[idx]}
                  id={`lottie${idx + 1}`}
                  mode="seek"
                  src={item.url_lottie}
                  key={item.key}
                ></lottie-player>
              ))
            ) : (
              <div>Loading....</div>
            )}

            <div
              class="left-side"
              style={{ height: "100vh", display: "grid", placeItems: "center" }}
            >
              <div
                style={{
                  display: "grid",
                  placeItems: "center",
                  height: "100%",
                  width: "100%",
                }}
              >
                <img src={Sira} alt="siriabackground"></img>
              </div>
            </div>
            <div
              class="left-side"
              style={{ height: "100vh", display: "grid", placeItems: "center" }}
            >
              <Gallery />
            </div>
            
          </div>
          <div className="scroller" id="scroller">
            <Scrollama
              onStepEnter={onStepEnter}
              onStepExit={onStepExit}
              progress
              onStepProgress={onStepProgress}
              offset={0.33}
            ><Step data="0" key="0">
                <div
                  className="step"
                  id={`step${0}`}
                  style={{ marginBottom: "300px" }}
                >
                  <div className="desc" id={"desc" + 0}>
                    <Card>
                      <Card.Body>
                        <Card.Text>prueba texto video</Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </Step>
              {items.length > 0
                ? items.map((narr) => (
                    <Step data={narr.key} key={narr.key}>
                      <div
                        className="step"
                        id={`step${narr.key}`}
                        style={{ marginBottom: "120px" }}
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
                  ))
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
              <Step data="8" key="8">
                <div
                  className="step"
                  id={`step${8}`}
                  style={{ marginBottom: "100px", marginTop: "300px" }}
                >
                  <div className="desc" id={"desc" + 8}>
                    <Card>
                      <Card.Body>
                        <Card.Text>prueba</Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </Step>
              <Step data="9" key="9">
                <div
                  className="step"
                  id={`step${9}`}
                  style={{ marginBottom: "300px", marginTop: "300px" }}
                >
                  <div className="desc" id={"desc" + 9}>
                    <Card>
                      <Card.Body>
                        <Card.Text>prueba</Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </Step>
            </Scrollama>
          </div>
        </div> */}
      {/* <WaterAnimation /> */}
      {/* <FlockAnimation /> */}
    </div>
  );
}

export default Scrollyteller;
