import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default class LazyImage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            initLoad: (props.loadMode===LoadMode.LAZY)?true:
                      (props.loadMode===LoadMode.INTERSECT)?false:
                      (props.loadMode===LoadMode.CLICK)?false:
                      false,
            imageLoaded: false
        }

        this.ref = React.createRef();
        this.handleImageLoad = this.handleImageLoad.bind(this);
    }

    componentDidMount() {
        const { loadMode, threshold } = this.props;
        if(loadMode === LoadMode.INTERSECT){
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.setState(v=>({
                            initLoad: true,
                            imageLoaded: v.imageLoaded
                        }));
                        this.observer.disconnect();
                    }
                });
            }, { threshold });

            this.observer.observe(this.ref.current);
        }
    }

    componentWillUnmount() {
        this.observer?.disconnect();
    }

    handleImageLoad() {
        this.setState(v=>({
            initLoad: v.initLoad,
            imageLoaded: true
        }));
    };


    render() {
        const {loadMode, threshold, onLoad,className,onClick,srcSet,sources, ...props} = this.props;
        const {initLoad, imageLoaded} = this.state;
        return (<img ref={this.ref} {...props}
                     className={classNames(className,{loading: !imageLoaded})}
                     srcSet={
                        (initLoad)?sources.map(({label,path})=>`${path} ${label}`):undefined
                    }
                     data-src={
                        (loadMode===LoadMode.INTERSECT)?
                            sources.map(({label,path})=>`${path} ${label}`):
                            undefined
                     }
                     onClick={(e)=>{
                         if(onClick) onClick(e);
                         if(!initLoad){
                             this.setState(v=>({
                                 initLoad: true,
                                 imageLoaded: v.imageLoaded
                             }));
                         }
                     }}
                     onLoad={(e)=>{
                        if(!imageLoaded){
                            if(onLoad) onLoad(e);
                            this.handleImageLoad();
                        }
                     }}
                     loading={(loadMode===LoadMode.LAZY)?'lazy':undefined}
        />)
    }
}

export class LoadMode{
    static LAZY = new LoadMode("LAZY");
    static INTERSECT = new LoadMode("INTERSECT");
    static CLICK = new LoadMode("CLICK");
    #name;

    constructor(name) {
        this.#name = name;
    }
}

LazyImage.propTypes = {
    threshold: PropTypes.number,
    loadMode: PropTypes.instanceOf(LoadMode),
    sources: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        path: PropTypes.string,
    }))
}

LazyImage.defaultProps = {
    threshold: 1,
    loadMode: LoadMode.LAZY,
    sources: [],
}