import React, { useEffect, useState } from 'react';
import './style.scss';
import classNames from 'classnames';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SVG from 'react-inlinesvg';
import BurgerButton from '../../../Components/BurgerButton/BurgerButton';
import loaderIcon from './loader.svg';

function ChatBrbSkeleton() {
  return (
    <>
      <aside>
        <header>
          <BurgerButton />
          <div className={classNames('rect', 'round')} style={{ height: 20 }} />
          <FontAwesomeIcon icon={faExpand} />
        </header>
        <section className="chats">
          <ul>
            <li>
              <article className="chat">
                <div className={classNames('rect', 'circle', 'avatar')} style={{ height: 54, width: 54 }} />
                <div className={classNames('rect', 'round', 'name')} style={{ height: 20 }} />
                <div className={classNames('rect', 'round', 'comment')} style={{ height: 16 }} />
                <div className={classNames('rect', 'round', 'date')} style={{ height: 12, width: 30 }} />
                <div className={classNames('rect', 'round', 'counter')} style={{ height: 16 }} />
              </article>
            </li>
            <li>
              <article className="chat">
                <div className={classNames('rect', 'circle', 'avatar')} style={{ height: 54, width: 54 }} />
                <div className={classNames('rect', 'round', 'name')} style={{ height: 20 }} />
                <div className={classNames('rect', 'round', 'comment')} style={{ height: 16 }} />
                <div className={classNames('rect', 'round', 'date')} style={{ height: 12, width: 30 }} />
                <div className={classNames('rect', 'round', 'counter')} style={{ height: 16 }} />
              </article>
            </li>
            <li>
              <article className="chat">
                <div className={classNames('rect', 'circle', 'avatar')} style={{ height: 54, width: 54 }} />
                <div className={classNames('rect', 'round', 'name')} style={{ height: 20 }} />
                <div className={classNames('rect', 'round', 'comment')} style={{ height: 16 }} />
                <div className={classNames('rect', 'round', 'date')} style={{ height: 12, width: 30 }} />
                <div className={classNames('rect', 'round', 'counter')} style={{ height: 16 }} />
              </article>
            </li>
          </ul>
        </section>
      </aside>
      <div className="chat-view">
        <SVG src={loaderIcon} width="20%" />
      </div>
    </>
  );
}

function ChatBrb() {
  const [user, setUser] = useState(null);

  useEffect(() => {

  });

  return (
    <div id="chatbrb" className={classNames({ skeleton: user === null })}>
      {user !== null ? 'h1' : <ChatBrbSkeleton />}
    </div>
  );
}

export default ChatBrb;
