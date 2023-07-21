import React from "react";
import {
  MailOutlined,
  GithubOutlined,
  WhatsAppOutlined,
  LinkedinOutlined,
} from '@ant-design/icons';
import s from './Footer.module.scss';

const Footer0 = () => {
  // Home EXP PROJECTS AboutMe Resume

  return (
    <div className={s.footerWrapper}>
      <div className={s.row} style={{ margin: 0 }}>
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
      </div>
      <div className={s.row}>
        <div className={s.text}>Home</div>
        <div className={s.text}>AboutMe</div>
        <div className={s.text}>History</div>
        <div className={s.text}>Resume</div>
        <div className={s.text}>!TRUE</div>
      </div>
      <div className={s.row}>
        MLW Copyright © 2023 - All rights reserved || Designed By: MLW
      </div>
    </div>
  )
}

export default Footer0;