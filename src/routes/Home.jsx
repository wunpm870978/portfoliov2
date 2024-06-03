import React, { useState, useRef, useEffect, useMemo, useContext } from "react";
import s from './Home.module.scss';
import {
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
import GridLayout0 from "../components/Grid/0/Layout";

const HomeLayout = () => {
  const { width } = useWindowSize();
  const workRef = useRef(null);
  const eduRef = useRef(null);
  const timeLineRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [descBody, setDescBody] = useState({});
  const [isInView, setIsInView] = useState(false);
  const sortedExperience = useMemo(() => {
    return cloneDeep(EXPERIENCE).reverse()
  }, [])

  const {
    isLightTheme,
    isTourBegin,
    isFired,
    isDesktop
  } = useContext(rootContext);
  const { setReducerState } = useContext(rootContextMethods);


  const handleDescChange = (idx) => {
    setReducerState({ isTourBegin: false });
    const result = sortedExperience.find((_, index) => index === idx - 1);
    setDescBody(result);
    setIsModalOpen(true);
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(entry.isIntersecting)
        }
      }
    )
    observer.observe(timeLineRef.current)
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <React.Fragment>
      <GridLayout0 isInView={isInView} />
      <div ref={timeLineRef} className={s.banner2}>
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