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

import ParticlesAnimation from "./ParticlesAnimation";


import Chart from "./Chart"




//** values ​​handled in percentages, example 25 = 25% ***********/
const fadeIn = 10; // the lottie appears completely when this percentage is reached
const fadeOut = 85; // the lottie starts to disappear when this percentage is reached

/****************** */

// console.log(myScrollyTellerInstance);


const narration = require("./assets/data/narration.json");

const narrativeStyle = css`
  img {
    max-width: 500px;
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
    position:relative;
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
      simpleSheet: true,
    })
      .then((items) => {

        setItems(items);
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
    const actLottie = document.querySelector(`lottie-player:nth-child(${data})`);

    const auxFadeIn = fadeIn/100;
    const auxFadeOut = fadeOut/100;

    if (items.length > 1) {
      if (progress <= auxFadeIn) {
        

          actLottie.style.opacity = `${progress * (1/auxFadeIn)}`
        

      } else if (progress > auxFadeIn && progress < auxFadeOut) {
        actLottie.style.opacity = "1";
      } else {
        actLottie.style.opacity = `${(1 - progress) * (1/(1-auxFadeOut))}`;
      }

      
    }
  }, [progress, data, items.length]);

   useEffect(() => {

if(items.length > 0)  {
      document.querySelectorAll('lottie-player').forEach((lottie,i) => {

        lottie.addEventListener('load',function (e) {
          create({
            mode: "scroll",
            player: `#lottie${i+1}`,
            container: `#step${i+1}`,
            actions: [
              {
                visibility: [0.3, 0.8],
                type: "seek",
                frames: [0, items[i].frames],
              },
            ],
          });
        });
      })
    }
      
  }, [items]);


  const onStepEnter = ({ data }) => {
    
    document.querySelectorAll('lottie-player')
    .forEach((lottie, index) => lottie.style.display = ((index+1)==data) ? 'block' : 'none')
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
         
          <div className="particles__container" style={{position:'relative'}}>
            <ParticlesAnimation />
          </div>
          <Chart />
          <div className="main">
            <div className="graphic">
              {
                items.length > 2 && items.url_lottie !== '' ?
                  items.map((item,idx) => (
                      <lottie-player
                        // ref={refs[idx]}
                        id={`lottie${idx+1}`}
                        mode="seek"
                        src={item.url_lottie}
                        key={item.key}
                      ></lottie-player>
                    ))
                  : 
                  <div>
                    Loading....
                  </div>
              }
              
             
            </div>
            <div className="scroller" id="scroller">
              
                <Scrollama
                  onStepEnter={onStepEnter}
                  onStepExit={onStepExit}
                  progress
                  onStepProgress={onStepProgress}
                  offset={0.33}
                >
                  {items.length > 0
                    ? items.map((narr) => (
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
                </Scrollama>
               
            </div>
          </div>
        </div>
    </div>
  );
}

export default Scrollyteller;
