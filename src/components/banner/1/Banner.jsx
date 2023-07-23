import React, { useRef, useState, useEffect } from "react";
import s from './Banner.module.scss';
import {
  GithubOutlined,
  ExportOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Tag } from 'antd';

const BannerLayout1 = ({
  title,
  data,
  screenWidth,
}) => {
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0)

  const swiperRef = useRef(null)
  const handleSlideChange = (type) => {
    if (type === 'prev') {
      screenWidth > 768
        ? swiperRef.current.scrollTo({
          left: swiperRef.current.scrollLeft - 400,
          behavior: "smooth"
        })
        : setSwiperIndex(prev => prev - 1 < 0
          ? data.length - 1
          : prev - 1
        )
    } else {
      screenWidth > 768
        ? swiperRef.current.scrollTo({
          left: swiperRef.current.scrollLeft + 400,
          behavior: "smooth"
        })
        : setSwiperIndex(prev => prev + 1 === data.length
          ? 0
          : prev + 1
        )
    }
  }

  const handleRedirectUrl = (payload) => {
    if (payload.length === 1) {
      window.open(payload[0], '_blank');
    } else if (payload.length > 1) {

    }
  }

  useEffect(() => {
    if (swiperRef.current) {
      var maxHeight = 0
      for (const node of swiperRef.current.childNodes) {
        maxHeight = Math.max(maxHeight, node.offsetHeight)
      }
      setContainerWidth(maxHeight + 70)
    }
  }, [])

  return (
    <div className={s.memo}>
      <div className={s.headerTitle}>
        {title}
      </div>
      <div
        ref={swiperRef}
        className={s.flexBlock}
        style={screenWidth <= 768
          ? { height: containerWidth }
          : {}}
      >
        {data.map((obj, index) => {
          return <div
            key={`project_${index}`}
            className={s.block}
            style={screenWidth <= 768
              ? {
                opacity: swiperIndex === index
                  ? 1
                  : 0
              }
              : {}
            }
          >
            {obj.type !== 'TBC'
              ? <React.Fragment>
                <div className={s.title}>{obj.title}</div>
                <div className={s.imageWrapper}>
                  {obj.images.map((item, idx) => {
                    return <img
                      className={s[`img${idx}`]}
                      src={item}
                      key={`project_img_${idx}`}
                      alt=''
                    />
                  })}
                  {obj.type === 'working' && <Tag color="geekblue">
                    In-progress
                  </Tag>
                  }
                </div>
                <div className={s.description}>{obj.description}</div>
                <div className={s.langTag}>
                  {obj.lang.map((item, idx) => {
                    return <div key={`project_tag_${idx}`} className={s.tag}>
                      {item}
                    </div>
                  })}
                </div>
                <div className={s.iconWrapper}>
                  <GithubOutlined onClick={() => handleRedirectUrl[obj.url]} />
                  <ExportOutlined onClick={() => handleRedirectUrl[obj.url]} />
                </div>
              </React.Fragment>
              : <div className={s.tbc}>
                <div>To</div>
                <div>Be</div>
                <div>Continue</div>
              </div>
            }
          </div>
        })}
      </div>
      {
        screenWidth <= 1200 && <div className={s.swiperWrapper}>
          <div
            className={s.iconContainer}
            onClick={() => handleSlideChange('prev')}
          >
            <LeftOutlined className={s.icon} />
          </div>
          <div
            className={s.iconContainer}
            onClick={() => handleSlideChange('next')}
          >
            <RightOutlined className={s.icon} />
          </div>
        </div>
      }
    </div>
  )
}

export default BannerLayout1;