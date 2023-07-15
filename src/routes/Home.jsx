import React, { useState, useRef, useEffect } from "react";
import s from './Home.module.scss';
import cx from 'classnames';
import {
  MailOutlined,
  GithubOutlined,
  WhatsAppOutlined,
  LinkedinOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import { Timeline } from "antd";
import { PROJECTS } from '../defaults';

const FORWARD = 'forward';
const BACKWARD = 'backward';
const PAUSE = 'pause';
const words = 'A Web and App Developer';

const HomeLayout = () => {
  const autoTypeRef = useRef(null)
  const [isNavOpen, setIsNavOpen] = useState(false);

  const direction = useRef(FORWARD);
  const speedRef = useRef(300)
  const typingInterval = useRef();

  useEffect(() => {
    const typeLetter = () => {
      if (!autoTypeRef.current.innerHTML) {
        autoTypeRef.current.innerHTML = ''
      }
      if (autoTypeRef.current.innerHTML.length !== words.length) {
        autoTypeRef.current.innerHTML += words[autoTypeRef.current.innerHTML.length]
      } else {
        direction.current = PAUSE;
        speedRef.current = 2000;
      }
    }
    const backspace = () => {
      if (autoTypeRef.current.innerHTML.length !== 0) {
        autoTypeRef.current.innerHTML = autoTypeRef.current.innerHTML.slice(0, autoTypeRef.current.innerHTML.length - 1)
      } else {
        direction.current = PAUSE
      }
    }
    const waiting = () => {
      clearInterval(autoTypeRef.current)
      setTimeout(() => {
        if (autoTypeRef.current.innerHTML.length !== 0) {
          direction.current = BACKWARD;
          speedRef.current = 100;
        } else {
          direction.current = FORWARD;
          speedRef.current = 300;
        }
      }, 2000)
    }


    autoTypeRef.current && (typingInterval.current = setInterval(() => {
      if (direction.current === FORWARD) {
        typeLetter();
      } else if (direction.current === BACKWARD) {
        backspace();
      } else {
        console.log('mlw speedRef.current', speedRef.current)
        waiting()
      }
    }, speedRef.current));

    return () => {
      clearInterval(typingInterval.current);
    }
  }, []);

  return (
    <div className={s.root}>
      <div className={s.navTop}>
        <div>
          notlogo
        </div>
        <div
          className={cx(s.burgerBtnWrapper, isNavOpen && s.burgerBtnWrapperActive)}
          onClick={() => {
            setIsNavOpen(prev => !prev)
          }}
        >
          <div className={s.burgerWrapper}>
            <div className={s.hamburger} />
          </div>
        </div>
      </div>
      <div className={s.banner}>
        <div className={s.textBlock}>
          <div className={s.text}>
            HI
          </div>
          <div className={s.text}>
            I am Thoson Anmas
          </div>
          <div ref={autoTypeRef} className={s.typewriter}></div>
          <div className={s.contact}>
            <GithubOutlined className={s.icon} />
            <MailOutlined className={s.icon} />
            <WhatsAppOutlined className={s.icon} />
            <LinkedinOutlined className={s.icon} />
          </div>
        </div>
        <div className={s.imgBlock} />
      </div>
      <div className={s.banner2}>
        <Timeline
          mode='left'
          items={[
            {
              label: 'Present',
              children: 'Create a services',
            },
            {
              label: '2015-09-01 09:12:11',
              children: 'Solve initial network problems',
            },
            {
              children: 'Technical testing',
            },
            {
              label: '2015-09-01 09:12:11',
              children: 'Network problems being solved',
            },
          ]}
        />
      </div>
      <div className={s.memo} style={{ background: '#cccc33' }}>
        <div className={s.headerTitlte}>
          PROJECTS
        </div>
        <div className={s.flexBlock}>
          {PROJECTS.map(obj => {
            return <div className={s.block}>
              {obj.type !== 'TBC'
                ? <React.Fragment>
                  <div className={s.title}>{obj.title}</div>
                  <div>{obj.description}</div>
                  <div className={s.langTag}>
                    {obj.lang.map(item => {
                      return <div className={s.tag}>{item}</div>
                    })}
                  </div>
                  <div className={s.iconWrapper}>
                    <GithubOutlined />
                    <ExportOutlined />
                  </div>
                </React.Fragment>
                : 'To be Continue'
              }
            </div>
          })}
        </div>
      </div>
      <div className={s.banner2}>
        Education
      </div>
      <div className={s.banner2} style={{ background: 'white' }}>
        FOOTER
      </div>
    </div>
  )
}

export default HomeLayout;