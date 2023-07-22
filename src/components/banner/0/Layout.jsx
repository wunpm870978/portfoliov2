import React, { useRef, useState, useEffect } from 'react';
import cx from 'classnames';
import s from './Layout.module.scss';

const Banner0 = ({
  theme,
  data,
}) => {
  const { classNames } = theme;
  const { itemList } = data;

  const swiperRef = useRef(null);
  // const timerRef
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0)
  const [direction, setDirection] = useState('left')

  const imgList = [
    'https://shoplineimg.com/56cb124503905552820000df/6481694813aa45001196b6bf/1080x.webp?source_format=jpg',
    'https://shoplineimg.com/56cb124503905552820000df/64816168ef628e001dd66b68/1080x.webp?source_format=jpg',
    'https://shoplineimg.com/56cb124503905552820000df/64901466bc77190020f6502e/1080x.webp?source_format=jpg',
    'https://shoplineimg.com/5bc8f4a388891600051da0b3/6469f8f3c78e69001d8ba702/3860x.webp?source_format=PNG',
    'https://shoplineimg.com/5bc8f4a388891600051da0b3/6469f76b905eeb0019c02e9c/3860x.webp?source_format=PNG',
    'https://shoplineimg.com/5bc8f4a388891600051da0b3/62ab86cbe4447d000f1bf787/3860x.webp?source_format=JPG',
    'https://shoplineimg.com/5bc8f4a388891600051da0b3/6469f3d5c78e6900208ba2f7/3860x.webp?source_format=PNG',
  ]

  useEffect(() => {
    if (swiperRef.current) {
      setContainerWidth(swiperRef.current.offsetWidth)
    }
  }, [])


  return (
    <div
      ref={swiperRef}
      className={s.container}
    >
      <div className={s.parallaxWrapper}>
        {imgList.map((item, index) => {
          return <div
            className={s.parallax}
            style={{
              width: index === swiperIndex ||
                index === swiperIndex + 1 ||
                (swiperIndex + 1 === imgList.length && index === 0)
                ? '100%'
                : 0,
              transitionDelay: index === swiperIndex - 1 && direction === 'right'
                ? '1'
                : '0s',
              backgroundImage: `url(${item})`,
              zIndex: index === swiperIndex
                ? 2
                : index === swiperIndex + 1 || (swiperIndex + 1 === imgList.length && index === 0)
                  ? 1
                  : index === swiperIndex - 1 ||
                    (swiperIndex - 1 < 0 && index === imgList.length - 1)
                    ? 3
                    : 0
            }}
          >
            <div>
              hihi
            </div>
          </div>
        })}
      </div>
      <div className={s.swiperBtnWrapper}>
        <div
          className={s.swiperBtn}
          onClick={() => {
            setSwiperIndex(prev => prev - 1 < 0
              ? imgList.length - 1
              : prev - 1
            )
            setDirection('left')
          }}
        >
          {/* <Icon type="arrow-left" /> */}
        </div>
        <div
          className={s.swiperBtn}
          onClick={() => {
            setSwiperIndex(prev => prev + 1 === imgList.length
              ? 0
              : prev + 1
            )
            setDirection('right')
          }}
        >
          {/* <Icon type="arrow-right" /> */}
        </div>
      </div>
    </div>
  );
};

export default Banner0;
