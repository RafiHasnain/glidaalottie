
import "@lottiefiles/lottie-player";
import { create } from "@lottiefiles/lottie-interactivity";

export function Lottie(props) {
        console.log(props)
        
        const { id } = props;
        // let component = props;
        let myRef = props.refs.lottieRef !== undefined ? props.refs.lottieRef : null;
        // console.log(this.myRef)
        return (
            myRef.addEventListener("load", function(e) {
            create({
                player: "#" + id,
                mode: 'scroll',
                controls:true,
                actions: [
                    {
                    visibility: [0, 1],
                    type: 'seek',
                    frames: [0, 38]
                    }
                ],
            });
        })
        )
    

    // static propTypes = {
    //     id: PropTypes.string.isRequired,
    //     expandedOptions: PropTypes.object,
    //     src: PropTypes.string.isRequired,
    //     autoplay: PropTypes.bool.isRequired,
    //     background: PropTypes.string,
    //     controls: PropTypes.bool,
    //     count: PropTypes.number,
    //     direction: PropTypes.number,
    //     hover: PropTypes.bool,
    //     loop: PropTypes.bool,
    //     mode: PropTypes.string,
    //     renderer: PropTypes.string,
    //     speed: PropTypes.number
    // };

    // static defaultProps = { 
    //     id: "lottieRef",
    //     src: true,
    //     autoplay: false,
    //     background: undefined,
    //     controls: false,
    //     count: undefined,
    //     direction: 1,
    //     hover: false,
    //     loop: false,
    //     mode: 'PlayMode.Normal',
    //     renderer: 'svg',
    //     speed: 1
    // };
};