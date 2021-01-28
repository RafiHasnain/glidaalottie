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

const narration = require("./assets/data/narration.json");

const narrativeStyle = css`
  img {
    max-width: 500px;
  }
  ${
    "" /* .main {
    padding: 3vh 2vw;
    display: flex;
    justify-content: space-between;
  } */
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
      margin-bottom: 0;
    }
    font-size: 20px;
  }
  .card {
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.25);
    margin-left: 20px;
    margin-right: 20px;
    text-align: center;
    padding: 10%;
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

  .main {
    display: grid;
    grid-template-columns: 3fr 1fr;
    margin: 0px 10px;
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
      position:relative;
      z-index:100;
      opacity: 0.9;
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
  const oneRef = useRef(null);
  const twoRef = useRef(null);
  const threeRef = useRef(null);
  const fourRef = useRef(null);
  const fiveRef = useRef(null);

  useEffect(() => {
    Tabletop.init({
      key:
        "https://docs.google.com/spreadsheets/d/1EDvVinkf7BhEnctM0BrWU3WtXW4LuQoXYAM67qDRHZ8/edit?usp=sharing",
      simpleSheet: true,
    })
      .then((items) => {
        console.log(items);
        setItems({ items });
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
          response.element.style.background = "coral";
        } else if (response.index === 2) {
          response.element.style.background = "green";
        } else {
          response.element.style.background = "grey";
        }
      })
      .onStepExit((response) => {
        if (response.index === 1) {
          response.element.style.background = "white";
        } else if (response.index === 2) {
          response.element.style.background = "white";
        } else {
          response.element.style.background = "white";
        }
      });

    // setup resize event
    window.addEventListener("resize", scroller.resize);

    return () => window.removeEventListener("resize", scroller.resize);
  }, []);

  useEffect(() => {
    console.log(data, "use");

    oneRef.current.addEventListener("load", function (e) {
      console.log("hola1");
      create({
        mode: "scroll",
        player: `#firstLottie`,
        container: "#step1",
        actions: [
          {
            visibility: [0.3, 0.8],
            type: "seek",
            frames: [0, 100],
          },
        ],
      });
    });

    twoRef.current.addEventListener("load", function (e) {
      console.log("hola2");
      create({
        mode: "scroll",
        player: `#twoLottie`,
        container: "#step2",
        actions: [
          {
            visibility: [0.3, 0.8],
            type: "seek",
            frames: [0, 100],
          },
        ],
      });
    });

    threeRef.current.addEventListener("load", function (e) {
      create({
        mode: "scroll",
        player: `#threeLottie`,
        container: "#step3",
        actions: [
          {
            visibility: [0.3, 0.8],
            type: "seek",
            frames: [0, 100],
          },
        ],
      });
    });

    fourRef.current.addEventListener("load", function (e) {
      create({
        mode: "scroll",
        player: `#fourLottie`,
        container: "#step4",
        actions: [
          {
            visibility: [0.3, 0.8],
            type: "seek",
            frames: [0, 100],
          },
        ],
      });
    });

    fiveRef.current.addEventListener("load", function (e) {
      create({
        mode: "scroll",
        player: `#fiveLottie`,
        container: "#step5",
        actions: [
          {
            visibility: [0.3, 0.6],
            type: "seek",
            frames: [0, 100],
          },
        ],
      });
    });
  }, [data]);

  const update = (data) => {
    var src = "./assets/images/" + data + ".png";
    // this.setState({src});
    setSrc(src);
  };

  const onStepEnter = ({ data }) => {
    if (data === "1") {
      document.getElementById("firstLottie").style.display = "block";
      document.getElementById("threeLottie").style.display = "none";
      document.getElementById("fourLottie").style.display = "none";
      document.getElementById("twoLottie").style.display = "none";
      document.getElementById("fiveLottie").style.display = "none";
    } else if (data === "2") {
      document.getElementById("firstLottie").style.display = "none";
      document.getElementById("threeLottie").style.display = "none";
      document.getElementById("fourLottie").style.display = "none";
      document.getElementById("twoLottie").style.display = "block";
      document.getElementById("fiveLottie").style.display = "none";
    } else if (data === "3") {
      document.getElementById("firstLottie").style.display = "none";
      document.getElementById("threeLottie").style.display = "block";
      document.getElementById("fourLottie").style.display = "none";
      document.getElementById("twoLottie").style.display = "none";
      document.getElementById("fiveLottie").style.display = "none";
    } else if (data === "4") {
      document.getElementById("firstLottie").style.display = "none";
      document.getElementById("threeLottie").style.display = "none";
      document.getElementById("fourLottie").style.display = "block";
      document.getElementById("twoLottie").style.display = "none";
      document.getElementById("fiveLottie").style.display = "none";
    } else if (data === "5") {
      document.getElementById("firstLottie").style.display = "none";
      document.getElementById("threeLottie").style.display = "none";
      document.getElementById("fourLottie").style.display = "none";
      document.getElementById("twoLottie").style.display = "none";
      document.getElementById("fiveLottie").style.display = "block";
    }
    setData(data);
    // update(data);
    setProgress(0);
    // this.setState( { data });
    // console.log(data)
    //this.update(data);
  };

  const onStepExit = ({ element }) => {
    // console.log(element)
    setProgress(0);
    element.style.backgroundColor = "#fff";
  };

  const onStepProgress = ({ element, progress }) => {
    // console.log(element)
    // console.log(progress)
    setProgress(progress);
    // this.setState({ progress });
  };

  // const { data, items } = this.state;
  // console.log(myRef)
  // const src = './assets/images/' + data + '.png';
  // const src = './assets/animation/' + data + '.json';
  // console.log(src)
  const animation = {
    1: "https://assets9.lottiefiles.com/packages/lf20_ntnh0s55.json",
    2: "https://assets9.lottiefiles.com/packages/lf20_Fh701N.json",
    3: "https://assets1.lottiefiles.com/datafiles/HN7OcWNnoqje6iXIiZdWzKxvLIbfeCGTmvXmEm1h/data.json",
    4: "https://assets9.lottiefiles.com/packages/lf20_ntnh0s55.json",
    5: "https://assets9.lottiefiles.com/packages/lf20_9wjm14ni.json",
  };
  // console.log(animation[1]);

  return (
    <div>
      <div css={narrativeStyle}>
        <div className="blurb">
          <Card>
            <div className="card-text-s">{introBlurb}</div>
          </Card>
        </div>
        <div className="main">
          <div className="graphic">
            <lottie-player
              ref={oneRef}
              id="firstLottie"
              mode="seek"
              src={animation[1]}
            ></lottie-player>
            <lottie-player
              ref={twoRef}
              id="twoLottie"
              mode="normal"
              src={animation[2]}
            ></lottie-player>
            <lottie-player
              ref={threeRef}
              id="threeLottie"
              mode="normal"
              src={animation[3]}
            ></lottie-player>
            <lottie-player
              ref={fourRef}
              id="fourLottie"
              mode="normal"
              src={animation[4]}
            ></lottie-player>
            <lottie-player
              ref={fiveRef}
              id="fiveLottie"
              mode="normal"
              src={animation[2]}
            ></lottie-player>
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
