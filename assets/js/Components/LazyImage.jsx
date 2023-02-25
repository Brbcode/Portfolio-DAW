// eslint-disable-next-line max-classes-per-file
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class LoadMode {
  static LAZY = new LoadMode('LAZY');

  static INTERSECT = new LoadMode('INTERSECT');

  static CLICK = new LoadMode('CLICK');

  #name;

  constructor(name) {
    this.#name = name;
  }
}

export default class LazyImage extends React.Component {
  constructor(props) {
    super(props);

    let initLoad = false;
    const { loadMode } = this.props;
    switch (loadMode) {
      case LoadMode.LAZY:
        initLoad = true;
        break;
      default:
    }

    this.state = {
      initLoad,
      imageLoaded: false,
    };

    this.ref = React.createRef();
    this.handleImageLoad = this.handleImageLoad.bind(this);
  }

  componentDidMount() {
    const { loadMode, threshold } = this.props;
    if (loadMode === LoadMode.INTERSECT) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.setState((v) => ({
              initLoad: true,
              imageLoaded: v.imageLoaded,
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
    this.setState((v) => ({
      initLoad: v.initLoad,
      imageLoaded: true,
    }));
  }

  render() {
    const {
      loadMode, threshold, onLoad, className, onClick, sources, alt, ...props
    } = this.props;
    const { initLoad, imageLoaded } = this.state;
    return (
      // eslint-disable-next-line max-len
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
      <img
        ref={this.ref}
        alt={alt}
        {...props}
        className={classNames(className, { loading: !imageLoaded })}
        srcSet={
                        (initLoad) ? sources.map(({ label, path }) => `${path} ${label}`) : undefined
                    }
        data-src={
                        (loadMode === LoadMode.INTERSECT)
                          ? sources.map(({ label, path }) => `${path} ${label}`)
                          : undefined
                     }
        onClick={(e) => {
          if (onClick) onClick(e);
          if (!initLoad) {
            this.setState((v) => ({
              initLoad: true,
              imageLoaded: v.imageLoaded,
            }));
          }
        }}
        onLoad={(e) => {
          if (!imageLoaded) {
            if (onLoad) onLoad(e);
            this.handleImageLoad();
          }
        }}
        loading={(loadMode === LoadMode.LAZY) ? 'lazy' : undefined}
      />
    );
  }
}

LazyImage.propTypes = {
  threshold: PropTypes.number,
  loadMode: PropTypes.instanceOf(LoadMode),
  onLoad: PropTypes.func,
  onClick: PropTypes.func,
  className: PropTypes.string,
  alt: PropTypes.string.isRequired,
  sources: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    path: PropTypes.string,
  })),
};

LazyImage.defaultProps = {
  threshold: 1,
  loadMode: LoadMode.LAZY,
  sources: [],
  className: '',
  onLoad: () => {},
  onClick: () => {},
};
