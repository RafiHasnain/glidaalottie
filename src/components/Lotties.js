import { Component } from 'react';
import PropTypes from 'prop-types';
import "@lottiefiles/lottie-player";
import { create } from "@lottiefiles/lottie-interactivity";

export default class Lottie extends Component {
    constructor(props) {
        super(props);
        this.state = {
           myRef: null 
        }
    }

    componentWillMount() {
        let component = this;
        this.myRef = this.$refs.lottieRef;
        console.log(this.myRef)
        this.myRef.addEventListener("load", function(e) {
        create({
            player: "#" + component.id,
            ...component.expandedOptions
        });
    });
    }

    static propTypes = {
        id: PropTypes.string.isRequired,
        expandedOptions: PropTypes.object,
        src: PropTypes.string.isRequired,
        autoplay: PropTypes.bool.isRequired,
        background: PropTypes.string,
        controls: PropTypes.bool,
        count: PropTypes.number,
        direction: PropTypes.number,
        hover: PropTypes.bool,
        loop: PropTypes.bool,
        mode: PropTypes.string,
        renderer: PropTypes.string,
        speed: PropTypes.number
    };

    static defaultProps = { 
        id: "lottieRef",
        src: true,
        autoplay: false,
        background: undefined,
        controls: false,
        count: undefined,
        direction: 1,
        hover: false,
        loop: false,
        mode: 'PlayMode.Normal',
        renderer: 'svg',
        speed: 1
    };
};