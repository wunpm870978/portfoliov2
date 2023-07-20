import React, { useRef, useState } from 'react';
import s from './Collapse.module.scss';
import {
  DownOutlined,
} from '@ant-design/icons';
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
  // Home EXP PROJECTS AboutMe Resume

  // Code: JS, python
  // FrontEnd: React,css,scss,html
  // backend: expressjs, nodejs, django
  // database: mysql, mongodb, dynamodb
  // Cloud Infra-Architecture: aws lambda, github

  return (
    <div className={s.termsCollapseWrapper}>
      <div
        ref={codeRef}
        className={s.termsContainer}
        style={{
          maxHeight: isCodeCollapse ? codeRef.current.scrollHeight : '59px',
        }}
        onClick={() => setIsCodeCollapse(prev => !prev)}
      >
        <div className={s.title}>
          Code
          <DownOutlined rotate={isCodeCollapse ? 180 : 0} />
        </div>
        <div className={s.bannerWrapper}>
          <div className={s.banner}>
            <div className={s.block}>
              JS
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
          maxHeight: isFrontendCollapse ? frontendRef.current.scrollHeight : '59px',
        }}
        onClick={() => setIsFrontendCollapse(prev => !prev)}
      >
        <div className={s.title}>
          FrontEnd
          <DownOutlined rotate={isFrontendCollapse ? 180 : 0} />
        </div>
        <div className={s.bannerWrapper}>
          <div className={s.banner}>
            <div className={s.block}>
              React
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
          maxHeight: isBackendCollapse ? backendRef.current.scrollHeight : '59px',
        }}
        onClick={() => setIsBackendCollapse(prev => !prev)}
      >
        <div className={s.title}>
          Backend
          <DownOutlined rotate={isBackendCollapse ? 180 : 0} />
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
          maxHeight: isDatabaseCollapse ? databaseRef.current.scrollHeight : '59px',
        }}
        onClick={() => setIsDatabaseCollapse(prev => !prev)}
      >
        <div className={s.title}>
          database
          <DownOutlined rotate={isDatabaseCollapse ? 180 : 0} />
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
          maxHeight: isCloudCollapse ? cloudRef.current.scrollHeight : '59px',
        }}
        onClick={() => setIsCloudCollapse(prev => !prev)}
      >
        <div className={s.title}>
          Cloud
          <DownOutlined rotate={isCloudCollapse ? 180 : 0} />
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