import React from 'react'
import s from './Description.module.scss'
import cx from 'classnames';

const Description = () => {
  return (
    <div className={s.root}>
      <div className={
        cx(
          s.descWrapper,
          'animate__animated animate__fadeInUp animate__delay-0.5s'
        )}
      >
        <div className={s.textContainer}>
          <div className={s.headerTitle}>
            About me
          </div>
          <div className={s.text}>
            I have experience in web and app development for frontend and backend. Therefore, I wish to employ the
            acquired knowledge on this project and develop professional growth. I would like to apply for this job with
            my passion. If you are interested, feel free to contact me !!!
          </div>
        </div>
        <div className={s.imgWrapper}/>
      </div>
    </div>
  )
}

export default Description;