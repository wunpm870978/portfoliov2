import React, { useState, useRef, useEffect, useMemo } from "react";
import s from './Home.module.scss';
import cx from 'classnames';
import {
  MailOutlined,
  GithubOutlined,
  WhatsAppOutlined,
  LinkedinOutlined,
  CoffeeOutlined,
  AuditOutlined,
} from '@ant-design/icons';
import { Timeline, ConfigProvider } from "antd";
import { PROJECTS, EXPERIENCE } from '../defaults';
import useWindowSize from './../hook/useWindowSize';
import { cloneDeep } from "lodash";
import ModalLayout0 from "../components/modal/0/Modal";
import BannerLayout1 from "../components/banner/1/Banner";
import { ReactComponent as LOGO1 } from '../components/logo/logo1.svg'
import Collapse0 from "../components/collapse/0/Collapse";
import Footer0 from "../components/footer/0/Footer";
const FORWARD = 'forward';
const BACKWARD = 'backward';
const PAUSE = 'pause';
const words = 'A Full Stack Developer';

const HomeLayout = () => {
  const { width } = useWindowSize();
  const autoTypeRef = useRef(null)
  const direction = useRef(FORWARD);
  const speedRef = useRef(300)
  const typingInterval = useRef();
  const [isBounceInDown, setIsBounceInDown] = useState(false)
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(width > 768);
  const [descBody, setDescBody] = useState({});
  const [isLightTheme, setIsLightTheme] = useState(false);
  const sortedExperience = useMemo(() => {
    return cloneDeep(EXPERIENCE.reverse())
  }, [])


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
      clearInterval(typingInterval.current)
      setTimeout(() => {
        if (autoTypeRef.current.innerHTML.length !== 0) {
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
      clearInterval(typingInterval.current);
    }
  }, []);

  useEffect(() => {
    setIsDesktop(width > 768)
  }, [width])

  const handleDescChange = (idx) => {
    const result = sortedExperience.find((_, index) => index === idx - 1)
    setDescBody(result)
    setIsModalOpen(true)
  }

  const IconWrapper = (url, Icon) => {
    return <a
      rel="noreferrer"
      target='_blank'
      href={url}
    >
      <Icon className={s.icon} />
    </a>
  }

  useEffect(() => {
    if (isBounceInDown) {
      setIsNavOpen(true)
    } else {
      setTimeout(() => {
        setIsNavOpen(false)
      }, 1000)
    }

  }, [isBounceInDown])

  return (
    <div className={s.root}>
      <div className={s.navTop}>
        <div className={s.logo}>
          <LOGO1
            fill={isLightTheme ? '#23283e' : 'hsl(240, 100%, 95%)'}
            stroke={isLightTheme ? '#23283e' : 'hsl(240, 100%, 95%)'}
            transform='scale(0.7)'
          />
        </div>
        <div className={s.centerWrapper}>
          <input
            className={s.toggle}
            type="checkbox"
            onChange={(e) => setIsLightTheme(e.target.checked)}
          />
          <div
            className={cx(s.burgerBtnWrapper, isBounceInDown && s.burgerBtnWrapperActive)}
            onClick={() => setIsBounceInDown(prev => !prev)}
          >
            <div className={s.burgerWrapper}>
              <div className={s.hamburger} />
            </div>
          </div>
        </div>
      </div>
      {isNavOpen && <div
        className={cx(s.menu, `animate__animated ${isBounceInDown
          ? 'animate__bounceInDown'
          : 'animate__bounceOutUp'}`
        )}
      >
        <div className={s.itemWrapper}>
          <div className={s.item}>
            <div className={s.menuItem}>
              Home
            </div>
            <div className={s.menuItem}>
              HISTORY
            </div>
            <div className={s.menuItem}>
              PROJECTS
            </div>
            <div className={s.menuItem}>
              CONTACT
            </div>
          </div>
          <div className={s.item}>
            i am text
          </div>
        </div>
      </div>}
      <div className={s.banner} >
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
              {IconWrapper('https://github.com/wunpm870978', GithubOutlined)}
              {IconWrapper('mailto:petermakwork@gmail.com', MailOutlined)}
              {IconWrapper('https://api.whatsapp.com/send?phone=85293369792', WhatsAppOutlined)}
              {IconWrapper('https://www.linkedin.com/in/peter-mak-648b64246', LinkedinOutlined)}
            </div>
          </div>
          <div className={s.imgBlock} />
        </div>
        <div className={s.arrow}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={s.banner2} style={{ height: 'auto' }}>
        <div className={s.headerTitlte}>
          HISTORY
        </div>
        <ConfigProvider
          theme={{
            components: {
              Timeline: {
                tailColor: isLightTheme ? 'rgba(5, 5, 5, 0.06)' : '#ffe164aa',
                tailWidth: 2,
                colorText: isLightTheme ? 'rgba(0, 0, 0, 0.88)' : 'hsl(240, 100%, 95%)',
                colorBgContainer: 'transparent'
              }
            }
          }}
        >
          <Timeline
            tailColor='#ffe164'
            tailWidth={3}
            mode='left'
            items={[
              {
                label: 'June 2022 - Present',
                color: '#D1900A',
                dot: <CoffeeOutlined />,
                children: <div onClick={() => handleDescChange(6)}>
                  <div className={s.textTitle}>
                    Web developer
                  </div>
                  <div>
                    Initial Innovation Limited
                  </div>
                </div>,
              },
              {
                label: '2021-2022',
                dot: <AuditOutlined />,
                children: <div onClick={() => handleDescChange(5)}>
                  <div className={s.textTitle}>
                    MSc INFORMATION TECHNOLOGY
                  </div>
                  <div>
                    The Hong Kong Polytechnic University
                  </div>
                </div>,
              },
              {
                label: 'May - September 2021',
                color: '#D1900A',
                dot: <CoffeeOutlined />,
                children: <div onClick={() => handleDescChange(4)}>
                  <div className={s.textTitle}>
                    Web and App developer
                  </div>
                  <div>
                    CLOZEUPP AUTO TECH LTD
                  </div>
                </div>,
              },
              {
                label: '2019-2021',
                dot: <AuditOutlined />,
                children: <div onClick={() => handleDescChange(3)}>
                  <div className={s.textTitle}>
                    BEng (Hons) Degree Programme in Electronic and Information Engineering
                  </div>
                  <div>
                    The Hong Kong Polytechnic University
                  </div>
                </div>,
              },
              {
                label: 'Jun - Aug 2020',
                color: '#D1900A',
                dot: <CoffeeOutlined />,
                children: <div onClick={() => handleDescChange(2)}>
                  <div className={s.textTitle}>
                    Software engineer (Summer Intern)
                  </div>
                  <div>
                    Innocorn Technology Limited
                  </div>
                </div>,
              },
              {
                label: '2017-2019',
                dot: <AuditOutlined />,
                children: <div onClick={() => handleDescChange(1)}>
                  <div className={s.textTitle}>
                    Higher Diploma in Electronic and Information Engineering
                  </div>
                  <div>
                    The Hong Kong Polytechnic University
                  </div>
                </div>,
              },
            ]}
          />
        </ConfigProvider>
      </div>
      <BannerLayout1 title='PROJECTS' data={PROJECTS} />
      <Collapse0 />
      <Footer0 />
      <ModalLayout0
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        data={descBody}
        isDesktop={isDesktop}
      />
    </div>
  )
}

export default HomeLayout;