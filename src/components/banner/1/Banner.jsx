import React from "react";
import s from './Banner.module.scss';
import {
  GithubOutlined,
  ExportOutlined,
} from '@ant-design/icons';

const BannerLayout1 = ({
  title,
  data,
}) => {
  return (
    <div className={s.memo}>
      <div className={s.headerTitlte}>
        {title}
      </div>
      <div className={s.flexBlock}>
        {data.map((obj, index) => {
          return <div key={`project_${index}`} className={s.block}>
            {obj.type !== 'TBC'
              ? <React.Fragment>
                <div className={s.title}>{obj.title}</div>
                <div className={s.imageWrapper}>
                  {obj.images.map((item, idx) => {
                    return <img
                      className={s.img}
                      src={item}
                      key={`project_img_${idx}`}
                      alt=''
                    />
                  })}
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
                  <GithubOutlined />
                  <ExportOutlined />
                </div>
              </React.Fragment>
              : <div>
                
              </div>
            }
          </div>
        })}
      </div>
    </div>
  )
}

export default BannerLayout1;