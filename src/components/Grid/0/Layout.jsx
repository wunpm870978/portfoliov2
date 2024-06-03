import React, { useRef, useEffect, useContext, useId } from 'react';
import s from './Layout.module.scss';
import {
  MailOutlined,
  GithubOutlined,
  WhatsAppOutlined,
  LinkedinOutlined,
} from '@ant-design/icons';
import { FORWARD, BACKWARD, PAUSE, WORDS } from "./constants";
import { rootContextMethods } from '../../../App';

const ICONS = [
  {
    url: 'https://github.com/wunpm870978',
    Icon: GithubOutlined
  },
  {
    url: 'mailto:petermakwork@gmail.com',
    Icon: MailOutlined
  },
  {
    url: 'https://api.whatsapp.com/send?phone=85293369792',
    Icon: WhatsAppOutlined
  },
  {
    url: 'https://www.linkedin.com/in/peter-mak-648b64246',
    Icon: LinkedinOutlined
  },
]

const GridLayout0 = ({ isInView }) => {
  const { setReducerState } = useContext(rootContextMethods);
  const containerRef = useRef(null);
  const autoTypeRef = useRef(null)
  const direction = useRef(FORWARD);
  const speedRef = useRef(300);
  const typingInterval = useRef();

  const handleScrollDown = () => {
    const rootRef = document.getElementById('rootRef');
    if (containerRef.current) {
      const { bottom } = containerRef.current.getBoundingClientRect();
      rootRef.scrollTo({
        top: bottom,
        behavior: 'smooth'
      })
      setTimeout(() => {
        setReducerState({
          isTourBegin: true,
          isFired: true
        });
      }, 800)
    }
  }

  useEffect(() => {
    if (isInView) {
      handleScrollDown();
    }
  }, [isInView])

  useEffect(() => {
    const typeLetter = () => {
      if (
        autoTypeRef.current &&
        !autoTypeRef.current.innerHTML
      ) {
        autoTypeRef.current.innerHTML = ''
      }
      if (
        autoTypeRef.current &&
        autoTypeRef.current.innerHTML.length !== WORDS.length
      ) {
        autoTypeRef.current.innerHTML += WORDS[autoTypeRef.current.innerHTML.length]
      } else {
        direction.current = PAUSE;
        speedRef.current = 2000;
      }
    }
    const backspace = () => {
      if (
        autoTypeRef.current &&
        autoTypeRef.current.innerHTML.length !== 0
      ) {
        autoTypeRef.current.innerHTML = autoTypeRef.current.innerHTML.slice(0, autoTypeRef.current.innerHTML.length - 1)
      } else {
        direction.current = PAUSE
      }
    }
    const waiting = () => {
      clearInterval(typingInterval.current)
      setTimeout(() => {
        if (
          autoTypeRef.current &&
          autoTypeRef.current.innerHTML.length !== 0
        ) {
          direction.current = BACKWARD;
          speedRef.current = 100;
        } else {
          direction.current = FORWARD;
          speedRef.current = 300;
        }
        typingInterval.current = setInterval(() => {
          autoTypingAnimation()
        }, speedRef.current)
      }, 2000)
    }
    const autoTypingAnimation = () => {
      if (direction.current === FORWARD) {
        typeLetter();
      } else if (direction.current === BACKWARD) {
        backspace();
      } else {
        waiting()
      }
    }
    autoTypeRef.current && (typingInterval.current = setInterval(() => {
      autoTypingAnimation()
    }, speedRef.current));

    return () => {
      typingInterval.current && clearInterval(typingInterval.current);
    }
  }, []);

  return (
    <div ref={containerRef} className={s.banner} >
      <div>
        <div className={s.textBlock}>
          <div className={s.text}>
            {'HI :)'}
          </div>
          <div className={s.text}>
            I am Peter Mak
          </div>
          <div ref={autoTypeRef} className={s.typewriter}></div>
          <div className={s.contact}>
            {ICONS.map(({ url, Icon }) => {
              <IconWrapper url={url} Icon={Icon} />
            })}
          </div>
        </div>
        <div className={s.imgBlock} />
      </div>
      <div
        className={s.arrow}
        onClick={handleScrollDown}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

const IconWrapper = ({ url, Icon }) => {
  const key = useId();

  return <a
    key={key}
    rel="noreferrer"
    target='_blank'
    href={url}
  >
    <Icon className={s.icon} />
  </a>
}

export default GridLayout0;