import React, { useState, useRef, useEffect, useContext } from 'react';
import Footer0 from '../../components/footer/0/Footer';
import s from './MainLayout.module.scss';
import cx from 'classnames';
import { ReactComponent as LOGO1 } from '../../components/logo/logo1.svg'
import { rootContext, rootContextMethods } from '../../App';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useWindowSize from '../../hook/useWindowSize';

const MainLayout = ({ children }) => {
  const rootRef = useRef(null);
  const {
    isLightTheme,
    isBounceInDown,
    isNavOpen
  } = useContext(rootContext)
  const { setReducerState } = useContext(rootContextMethods)
  const navigate = useNavigate();
  const location = useLocation();
  const { height } = useWindowSize();

  const scrollToTop = () => {
    if (rootRef.current) {
      rootRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }


  useEffect(() => {
    if (isBounceInDown) {
      setReducerState({ isNavOpen: true })
    } else {
      setTimeout(() => {
        setReducerState({ isNavOpen: false })
      }, 1000)
    }

  }, [isBounceInDown])

  useEffect(() => {
    // execute on location change
    setReducerState({ location: location.pathname })
  }, [location]);

  return (<div id='rootRef' ref={rootRef} className={s.root}>
    <div className={s.navTop}>
      <div className={s.logo} onClick={scrollToTop}>
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
          onChange={(e) => setReducerState({ isLightTheme: e.target.checked })}
        />
        <div
          className={cx(s.burgerBtnWrapper, isBounceInDown && s.burgerBtnWrapperActive)}
          onClick={() => setReducerState({ isBounceInDown: !isBounceInDown })}
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
          <div className={s.menuItem} onClick={() => {
            setReducerState({ isBounceInDown: false });
            navigate('/');
          }}>
            Home
          </div>
          <div className={s.menuItem} onClick={() => {
            setReducerState({ isBounceInDown: false });
            navigate('/me');
          }}>
            About Me
          </div>
          <div className={s.menuItem} onClick={() => {
            setReducerState({ isBounceInDown: false });
            if (location == '/') {
              const rootRef = document.getElementById('rootRef');
              if (rootRef) {
                rootRef.scrollTo({
                  top: height,
                  behavior: 'smooth'
                })
                setTimeout(() => {
                  setReducerState({
                    isTourBegin: true,
                    isFired: true
                  })
                }, 800)
              }
            } else {
              navigate('/');
            }
          }}>
            History
          </div>
          <div className={s.menuItem} onClick={() => {
            setReducerState({ isBounceInDown: false });
            navigate('/resume');
          }}>
            Resume
          </div>
        </div>
        <div className={s.item}>
          <div className={s.menuText}>DO NOT TOUCH</div>
          <div className={s.sheep}>
            <span className={s.top}>
              <div className={s.body}></div>
              <div className={s.head}>
                <div className={cx(s.eye, s.one)}></div>
                <div className={cx(s.eye, s.two)}></div>
                <div className={cx(s.ear, s.one)}></div>
                <div className={cx(s.ear, s.two)}></div>
              </div>
            </span>
            <div className={s.legs}>
              <div className={s.leg}></div>
              <div className={s.leg}></div>
              <div className={s.leg}></div>
              <div className={s.leg}></div>
            </div>
          </div>
        </div>
      </div>
    </div>}
    {children}
    <Footer0 />
  </div>
  )
}

export default MainLayout;