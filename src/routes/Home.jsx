import React, { useState, useRef, useEffect, useMemo } from "react";
import s from './Home.module.scss';
import cx from 'classnames';
import {
  MailOutlined,
  GithubOutlined,
  WhatsAppOutlined,
  LinkedinOutlined,
  ExportOutlined,
  CoffeeOutlined,
  AuditOutlined,
} from '@ant-design/icons';
import { Timeline, Result, Modal, Descriptions } from "antd";
import { PROJECTS, EXPERIENCE, SKILLS } from '../defaults';
import useWindowSize from './../hook/useWindowSize';
import { isEmpty, cloneDeep } from "lodash";

const FORWARD = 'forward';
const BACKWARD = 'backward';
const PAUSE = 'pause';
const words = 'A Web and App Developer';

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
        <div>
          notlogo
        </div>
        <div
          className={cx(s.burgerBtnWrapper, isBounceInDown && s.burgerBtnWrapperActive)}
          onClick={() => setIsBounceInDown(prev => !prev)}
        >
          <div className={s.burgerWrapper}>
            <div className={s.hamburger} />
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
      <div className={s.banner} style={{ background: '#23283e' }}>
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
              <GithubOutlined className={s.icon} />
              <a
                rel="noreferrer"
                href="mailto:petermakwork@gmail.com">
                <MailOutlined className={s.icon} />
              </a>
              <a
                rel="noreferrer"
                target='_blank'
                href="https://api.whatsapp.com/send?phone=85293369792">
                <WhatsAppOutlined className={s.icon} />
              </a>
              <LinkedinOutlined className={s.icon} />
              {/* <div className={s.text}>
                {'  find me'}
              </div> */}
            </div>
          </div>
          <div className={s.imgBlock} />
        </div>
      </div>
      <div className={s.banner2} style={{ height: 'auto' }}>
        <div className={s.headerTitlte}>
          HISTORY
        </div>
        <Timeline
          mode='left'
          items={[
            {
              label: 'June 2022 - Present',
              color: '#D1900A',
              dot: <CoffeeOutlined style={{ fontSize: '18px' }} />,
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
              dot: <AuditOutlined style={{ fontSize: '18px' }} />,
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
              dot: <CoffeeOutlined style={{ fontSize: '18px' }} />,
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
              dot: <AuditOutlined style={{ fontSize: '18px' }} />,
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
              dot: <CoffeeOutlined style={{ fontSize: '18px' }} />,
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
              dot: <AuditOutlined style={{ fontSize: '18px' }} />,
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
      </div>
      <div className={s.banner2} style={{ background: 'linear-gradient(43deg,#4158d0,#c850c0 46%,#ffcc70)' }}>
        Skills
        <div>
          {SKILLS.map(item => {
            return <img src={`/assets/${item}-ar21.svg`} alt='' />
          })}
        </div>
      </div>
      <div className={s.memo}>
        <div className={s.headerTitlte}>
          PROJECTS
        </div>
        <div className={s.flexBlock}>
          {PROJECTS.map(obj => {
            return <div className={s.block}>
              {obj.type !== 'TBC'
                ? <React.Fragment>
                  <div className={s.title}>{obj.title}</div>
                  <div className={s.description}>{obj.description}</div>
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
                : <Result
                  status="404"
                  title={obj.type}
                  subTitle="Looking forward to my next idea"
                />
              }
            </div>
          })}
        </div>
      </div>
      <div className={s.banner2} style={{ background: 'green' }}>
        FOOTER
        last update 2023-07-16
      </div>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={isDesktop ? '60%' : '95%'}
        bodyStyle={{
          padding: '10px 0px 30px 0px'
        }}
      >
        <Descriptions
          bordered
          column={{
            xxl: 4,
            xl: 3,
            lg: 3,
            md: 3,
            sm: 2,
            xs: 1,
          }}
          title="My history"
        >
          <Descriptions.Item label="period" span={3}>
            {descBody.period}
          </Descriptions.Item>
          <Descriptions.Item label="institution" span={3}>
            {descBody.institution}
          </Descriptions.Item>
          <Descriptions.Item label="position" span={4}>
            {descBody.position}
          </Descriptions.Item>
          {!isEmpty(descBody.highlight) && <Descriptions.Item label="highlight" span={4}>
            {descBody.highlight.map(item => {
              return <React.Fragment>
                {item}
                <br />
              </React.Fragment>
            })}
          </Descriptions.Item>}
        </Descriptions>
      </Modal>
    </div>
  )
}

export default HomeLayout;