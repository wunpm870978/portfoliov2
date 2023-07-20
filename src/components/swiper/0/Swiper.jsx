import React, { useState, useCallback, useEffect, useRef } from 'react'
import s from './Swiper
.module.scss';

const SwiperLayout = ({
  data,
  isDesktop = true,

}) => {
  const swiperHorizontalRef = useRef(null);
  const swiperVeriticalRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [galleryHeight, setGalleryHeight] = useState('auto')
  const swiperHorizontalRefCallback = useCallback(node => {
    if (node) {
      setGalleryHeight(node.getBoundingClientRect().width)
      swiperHorizontalRef.current = node;
    }
  }, [])
  useEffect(() => {
    const ele = document.getElementById(`sp_product_images_${selectedImage}`);
    if (swiperHorizontalRef.current && isDesktop) {
      swiperHorizontalRef.current.scrollTo({
        left: swiperHorizontalRef.current.getBoundingClientRect().width * selectedImage,
        behavior: "smooth",
      });
    }
    if (swiperVeriticalRef.current && isDesktop) {
      if (ele) {
        swiperVeriticalRef.current.scrollTo({
          top: ele.offsetTop - 70,
          behavior: "smooth",
        });
      }
    }
  }, [selectedImage])
  return (
    <div className={s.galleryContainer}>
      <div
        ref={swiperVeriticalRef}
        className={s.imgListWrapper}
        style={{height: galleryHeight}}
      >
        {_.get(data, 'product_images', []).map((item, index) => {
          return <img
            id={`sp_product_images_${index}`}
            className={s.img}
            style={{
              borderColor: selectedImage === index
                ? 'black'
                : 'transparent',
            }}
            src={item.high_resolution}
            onClick={() => setSelectedImage(index)}
          />
        })}
      </div>
      <div
        ref={swiperHorizontalRefCallback}
        className={s.imgFrameWrapper}
        style={{
          height: galleryHeight
        }}
      >
        {galleryList.map((item, index) => {
          return <img
            className={cx(
              s.img,
              !isDesktop && (
                index === selectedImage
                  ? s.imgC
                  : index === selectedImage - 1 ||
                    (index === galleryList.length - 1 && selectedImage - 1 < 0)
                    ? s.imgL
                    : index === selectedImage + 1 ||
                      (index === 0 && selectedImage + 1 === galleryList.length)
                      ? s.imgR
                      : index < selectedImage
                        ? s.imgL1
                        : s.imgR1
              )
            )}
            src={item.high_resolution}
          />
        })}
      </div>
      {!isDesktop && <div className={s.pagination}>
        {galleryList.map((_, index) => {
          return (
            <div className={cx(s.dot, index === selectedImage && s.dotActive)}
              onClick={() => setSelectedImage(index)}
            />
          )
        })}
      </div>}
    </div>
  )
}

export default SwiperLayout;