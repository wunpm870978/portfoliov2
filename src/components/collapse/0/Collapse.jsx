import React, { useRef, useState } from 'react';
import s from './Collapse.module.scss';
import cx from 'classnames';

const Collapse0 = () => {
  const codeRef = useRef(null);
  const frontendRef = useRef(null);
  const backendRef = useRef(null);
  const databaseRef = useRef(null);
  const cloudRef = useRef(null);
  const [isCodeCollapse, setIsCodeCollapse] = useState(false);
  const [isFrontendCollapse, setIsFrontendCollapse] = useState(false);
  const [isBackendCollapse, setIsBackendCollapse] = useState(false);
  const [isDatabaseCollapse, setIsDatabaseCollapse] = useState(false);
  const [isCloudCollapse, setIsCloudCollapse] = useState(false);

  const arrowRender = (state) => {
    return <div className={cx(
      s['arrow-icon'],
      state && s.open
    )}>
      <span className={s['left-bar']}></span>
      <span className={s['right-bar']}></span>
    </div>
  }

  return (
    <div className={s.termsCollapseWrapper}>
      <div className={s.headerTitle}>SKILLS</div>
      <div
        ref={codeRef}
        className={s.termsContainer}
        style={{
          maxHeight: isCodeCollapse ? codeRef.current.scrollHeight : '79px',
        }}
        onClick={() => setIsCodeCollapse(prev => !prev)}
      >
        <div className={s.title}>
          Code
          {arrowRender(isCodeCollapse)}
        </div>
        <div className={s.bannerWrapper}>
          <div className={s.banner}>
            <div className={s.block}>
              javascript
            </div>
            <div className={s.block}>
              python
            </div>
          </div>
        </div>
      </div>
      <div
        ref={frontendRef}
        className={s.termsContainer}
        style={{
          maxHeight: isFrontendCollapse ? frontendRef.current.scrollHeight : '79px',
        }}
        onClick={() => setIsFrontendCollapse(prev => !prev)}
      >
        <div className={s.title}>
          Frontend
          {arrowRender(isFrontendCollapse)}
        </div>
        <div className={s.bannerWrapper}>
          <div className={s.banner}>
            <div className={s.block}>
              react
            </div>
            <div className={s.block}>
              css
            </div>
            <div className={s.block}>
              scss
            </div>
            <div className={s.block}>
              html
            </div>
          </div>
        </div>
      </div>
      <div
        ref={backendRef}
        className={s.termsContainer}
        style={{
          maxHeight: isBackendCollapse ? backendRef.current.scrollHeight : '79px',
        }}
        onClick={() => setIsBackendCollapse(prev => !prev)}
      >
        <div className={s.title}>
          Backend
          {arrowRender(isBackendCollapse)}
        </div>
        <div className={s.bannerWrapper}>
          <div className={s.banner}>
            <div className={s.block}>
              expressjs
            </div>
            <div className={s.block}>
              nodejs
            </div>
            <div className={s.block}>
              django
            </div>
          </div>
        </div>
      </div>
      <div
        ref={databaseRef}
        className={s.termsContainer}
        style={{
          maxHeight: isDatabaseCollapse ? databaseRef.current.scrollHeight : '79px',
        }}
        onClick={() => setIsDatabaseCollapse(prev => !prev)}
      >
        <div className={s.title}>
          Database
          {arrowRender(isDatabaseCollapse)}
        </div>
        <div className={s.bannerWrapper}>
          <div className={s.banner}>
            <div className={s.block}>
              mysql
            </div>
            <div className={s.block}>
              mongodb
            </div>
            <div className={s.block}>
              dynamodb
            </div>
          </div>
        </div>
      </div>
      <div
        ref={cloudRef}
        className={s.termsContainer}
        style={{
          maxHeight: isCloudCollapse ? cloudRef.current.scrollHeight : '79px',
        }}
        onClick={() => setIsCloudCollapse(prev => !prev)}
      >
        <div className={s.title}>
          Cloud
          {arrowRender(isCloudCollapse)}
        </div>
        <div className={s.bannerWrapper}>
          <div className={s.banner}>
            <div className={s.block}>
              aws lambda
            </div>
            <div className={s.block}>
              github
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collapse0;