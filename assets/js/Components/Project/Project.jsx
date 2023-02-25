import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import '../../Utils/ArrayExtensions';

export default class Project extends React.Component {
  constructor(props) {
    super(props);

    const { badges, badgesColors } = props;

    this.state = {
      loading: true,
      descEasyTop: false,
      descEasyBottom: false,
      colors: badges.map(() => badgesColors.random()),
    };

    this.descRef = createRef();
  }

  componentDidMount() {
    this.descRef.current.addEventListener('scroll', (e) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      const height = scrollHeight - clientHeight;
      this.setDescScroll([scrollTop, height]);
    });

    const { scrollTop, scrollHeight, clientHeight } = this.descRef.current;
    const height = scrollHeight - clientHeight;
    this.setDescScroll([scrollTop, height]);
  }

  setLoading = (value) => {
    this.setState((v) => ({
      ...v,
      loading: value,
    }));
  };

  setDescScroll = ([scroll, height]) => {
    const descEasyTopValue = scroll > 8;
    const descEasyBottomValue = (height - scroll) > 8 && height > 0;
    const { descEasyTop, descEasyBottom } = this.state;
    if (descEasyTop === descEasyTopValue
            && descEasyBottom === descEasyBottomValue) return;

    this.setState((v) => ({
      ...v,
      descEasyTop: scroll > 8,
      descEasyBottom: (height - scroll) > 8 && height > 0,
    }));
  };

  render() {
    const {
      loading, descEasyTop, descEasyBottom, colors,
    } = this.state;
    const {
      title, image, badges, to, children,
    } = this.props;
    return (
      <article className="product">
        <picture>
          {loading && (
          <div className="spinner">
            <FontAwesomeIcon icon={faSpinner} className="fa-spin-pulse" />
          </div>
          )}
          <img src={image} onLoad={() => this.setLoading(true)} className={classNames({ load: !loading })} alt="Project screenshot" />
        </picture>
        <h2>{title}</h2>
        {badges.length > 0 && (
        <section className="badges">
          {badges.map((content, index) => (
            <span
              key={content}
              style={{
                background: colors[index],
              }}
            >
              {content}
            </span>
          ))}
        </section>
        )}
        <section
          ref={this.descRef}
          className={classNames(
            'description',
            { 'easy-top': descEasyTop },
            { 'easy-bottom': descEasyBottom },
          )}
        >
          {children}
        </section>
        <Link to={to} className="button">Visit</Link>
      </article>
    );
  }
}

Project.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  badges: PropTypes.arrayOf(PropTypes.string),
  badgesColors: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
};

Project.defaultProps = {
  children: null,
  badges: [],
  badgesColors: [
    '#4EC820',
    '#95C20D',
    '#A2A429',
    '#D9B226',
    '#0F80C1',
    '#4BC51D',
    '#1081C2',
    '#8E39DD',
    '#F66FB3',
    '#98C6F4',
  ],
};
