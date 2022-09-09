import React, { useEffect, useState } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import Card from 'components/Card';
import { getOee } from 'api';
import StepColorExplain from 'components/StepColorExplain';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const styles = getStyles();

  const [oee, setOee] = useState<any>();

  useEffect(() => {
    // getOee()
    //   .then((response) => response.json())
    //   .then((data) => setOee(data['AREA_01']['LINE_01']));

    getOee(options.cardsUrl)
      .then((response) => response.json())
      .then((data) => setOee(data.data));
  }, [options.cardsUrl, data.series]);

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          position: relative;
          display: flex;
          flex-wrap: wrap;
          margin: auto;

          width: ${width}px;
          height: ${height}px;
          overflow: hidden;
        `
      )}
    >
      <StepColorExplain />

      <div
        className={cx(
          styles.wrapper,
          css`
            width: 100%;
            height: ${height - 56}px;
            overflow: auto;
          `
        )}
      >
        <div
          className={cx(
            styles.wrapper,
            css`
              margin-top: 12px;
              display: flex;
              flex-wrap: wrap;
            `
          )}
        >
          {/* {oee &&
          Object.keys(oee)
            .filter((oee) => oee[0] === 'M')
            .map((key) => <Card key={key} device_id={oee[key].Oee} actual={key} ng={} />)} */}
          {oee?.length > 0 && oee.map((item: any, index: number) => <Card key={index} data={item} />)}
        </div>
      </div>
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});
