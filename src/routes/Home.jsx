import React, { useState, useRef, useEffect, useMemo, useContext } from "react";
import s from './Home.module.scss';
import {
  MailOutlined,
  GithubOutlined,
  WhatsAppOutlined,
  LinkedinOutlined,
  CoffeeOutlined,
  AuditOutlined,
} from '@ant-design/icons';
import { Timeline, ConfigProvider, Tour } from "antd";
import { PROJECTS, EXPERIENCE } from '../defaults';
import useWindowSize from './../hook/useWindowSize';
import { cloneDeep } from "lodash";
import ModalLayout0 from "../components/modal/0/Modal";
import BannerLayout1 from "../components/banner/1/Banner";
import Collapse0 from "../components/collapse/0/Collapse";
import { rootContext, rootContextMethods } from '../App';


const FORWARD = 'forward';
const BACKWARD = 'backward';
const PAUSE = 'pause';
const words = 'A Full Stack Developer';

const HomeLayout = () => {
  const { width, height } = useWindowSize();
  const autoTypeRef = useRef(null)
  const direction = useRef(FORWARD);
  const speedRef = useRef(300)
  const typingInterval = useRef();
  const workRef = useRef(null);
  const eduRef = useRef(null);
  const timeLineRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [descBody, setDescBody] = useState({});
  const [isInView, setIsInView] = useState(false);
  const sortedExperience = useMemo(() => {
    return cloneDeep(EXPERIENCE.reverse())
  }, [])

  const {
    isLightTheme,
    isTourBegin,
    isFired,
    isDesktop
  } = useContext(rootContext);
  const { setReducerState } = useContext(rootContextMethods);

  const observer = useMemo(() => new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(entry.isIntersecting)
      }
    }
  ), [timeLineRef])


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
        autoTypeRef.current.innerHTML.length !== words.length
      ) {
        autoTypeRef.current.innerHTML += words[autoTypeRef.current.innerHTML.length]
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
      clearInterval(typingInterval.current);
    }
  }, []);

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

  const handleScrollDown = () => {
    const rootRef = document.getElementById('rootRef');
    if (rootRef) {
      rootRef.scrollTo({
        top: height,
        behavior: 'smooth'
      })
      setTimeout(() => {
        setReducerState({ isTourBegin: true })
        setReducerState({ isFired: true })
      }, 800)
    }
  }

  const steps = [
    {
      title: 'Work experience',
      description: 'Click to see the highligts of this job',
      target: () => workRef.current,
    },
    {
      title: 'Education',
      description: "Click to see what I've learnt in this programme",
      target: () => eduRef.current,
    },
  ];

  useEffect(() => {
    observer.observe(timeLineRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isInView) {
      handleScrollDown()
    }
  }, [isInView])

  return (
    <React.Fragment>
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
        <div
          className={s.arrow}
          onClick={handleScrollDown}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div
        ref={timeLineRef}
        className={s.banner2} style={{ height: 'auto', marginTop: '10px' }}>
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
                children: <div
                  ref={workRef}
                  onClick={() => handleDescChange(6)}
                >
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
                children: <div
                  ref={eduRef}
                  onClick={() => handleDescChange(5)}
                >
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
      <Tour
        open={isTourBegin && isFired}
        onClose={() => setReducerState({ isTourBegin: false })}
        steps={steps}
      />
      <BannerLayout1
        title='PROJECTS'
        data={PROJECTS}
        screenWidth={width}
      />
      <Collapse0 />
      <ModalLayout0
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        data={descBody}
        isDesktop={isDesktop}
      />
    </React.Fragment>
  )
}

export default HomeLayout;