import React, { useContext } from "react";
import {
  MailOutlined,
  GithubOutlined,
  WhatsAppOutlined,
  LinkedinOutlined,
} from '@ant-design/icons';
import s from './Footer.module.scss';
import { useNavigate } from "react-router-dom";
import { rootContext, rootContextMethods } from '../../../App';

const Footer0 = () => {
  const { height, location } = useContext(rootContext)
  const { setReducerState } = useContext(rootContextMethods)

  const navigate = useNavigate();

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

  return (
    <div className={s.footerWrapper}>
      <div className={s.row} style={{ margin: 0 }}>
        {IconWrapper('https://github.com/wunpm870978', GithubOutlined)}
        {IconWrapper('mailto:petermakwork@gmail.com', MailOutlined)}
        {IconWrapper('https://api.whatsapp.com/send?phone=85293369792', WhatsAppOutlined)}
        {IconWrapper('https://www.linkedin.com/in/peter-mak-648b64246', LinkedinOutlined)}
      </div>
      <div className={s.row}>
        <div className={s.text} onClick={() => navigate('/')}>Home</div>
        <div className={s.text} onClick={() => navigate('/me')}>AboutMe</div>
        <div className={s.text} onClick={() => {
          if (location == '/') {
            handleScrollDown();
          } else {
            navigate('/');
          }
        }}>History</div>
        <div className={s.text} onClick={() => navigate('/resume')}>Resume</div>
        <div className={s.text} onClick={() => alert('Hello World!')}>!TRUE</div>
      </div>
      <div className={s.row}>
        MLW Copyright © 2023 - All rights reserved || Designed By: MLW
      </div>
    </div>
  )
}

export default Footer0;