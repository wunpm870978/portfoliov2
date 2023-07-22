import React, { useState, useRef, useEffect } from "react";
import { Document, Page } from "react-pdf";
import s from './PDF.module.scss';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import {
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import useWindowSize from "../../../hook/useWindowSize";

export default function SinglePage({ pdf }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page
  const pdfRef = useRef(null);
  const { width } = useWindowSize();
  const [pdfHeight, setPdfHeight] = useState(600);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    if (pageNumber - 1 !== 0) changePage(-1);
  }

  function nextPage() {
    if (pageNumber + 1 <= numPages) changePage(1);
  }

  useEffect(() => {
    if (pdfRef.current) {
      if (width > 900) {
        setPdfHeight(null)
      } else if (width < 900) {
        setPdfHeight(
          width * 0.8 * Math.sqrt(2)
        )
      }
    }
  }, [width])

  return (
    <div className={s.pdfWrapper}>
    <div className={s.headerTitle}>
      Resume
    </div>
      <div
        ref={pdfRef}
        className={s.pdfContainer}>
        <Document
          file={pdf}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            height={pdfHeight}
            pageNumber={pageNumber}
          />
        </Document>
        <div className={s.swiperWrapper}>
          <div
            className={s.iconContainer}
            onClick={previousPage}
          >
            <LeftOutlined className={s.icon} />
          </div>
          <div
            className={s.iconContainer}
            onClick={nextPage}
          >
            <RightOutlined className={s.icon} />
          </div>
        </div>
      </div>
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
      </div>
    </div>
  );
}