import React, { useMemo } from "react";
import { Modal, Descriptions, Badge } from "antd";
import { isEmpty, get } from "lodash";

const ModalLayout = ({
  isModalOpen,
  setIsModalOpen,
  data,
  isDesktop
}) => {
  const colorList = useMemo(() => {
    const colors = [
      'pink',
      'yellow',
      'orange',
      'cyan',
      'green',
      'purple',
      'geekblue',
      'magenta',
      'volcano',
      'gold',
      'lime',
    ];
    const randomizeElemnts = (array, count) => {
      const randomizeIndex = (count) => {
        return Math.floor(count * Math.random());
      };
      if (count > array.length) {
        throw new Error('Array size cannot be smaller than expected random numbers count.');
      }
      const result = [];
      const guardian = new Set();
      while (result.length < count) {
        const index = randomizeIndex(count);
        if (guardian.has(index)) {
          continue;
        }
        const element = array[index];
        guardian.add(index);
        result.push(element);
      }
      return result;
    };
    return randomizeElemnts(colors, get(data, 'highlight.length', 0))
  }, [data])

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      width={isDesktop ? '60%' : '95%'}
      bodyStyle={{
        padding: '10px 0px 30px 0px'
      }}
    >
      <Descriptions
        bordered
        column={{
          xxl: 4,
          xl: 3,
          lg: 3,
          md: 3,
          sm: 2,
          xs: 1,
        }}
        title="My history"
      >
        <Descriptions.Item label="period" span={3}>
          {data.period}
        </Descriptions.Item>
        <Descriptions.Item label="institution" span={3}>
          {data.institution}
        </Descriptions.Item>
        <Descriptions.Item label="position/degree" span={4}>
          {data.position}
        </Descriptions.Item>
        {!isEmpty(data.highlight) && <Descriptions.Item label="highlight" span={4}>
          {data.highlight.map((item, index) => {
            return <React.Fragment>
              <Badge color={colorList[index]} text={item} />
              <br />
            </React.Fragment>
          })}
        </Descriptions.Item>}
      </Descriptions>
    </Modal>
  )
}

export default ModalLayout;