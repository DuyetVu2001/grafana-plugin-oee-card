import React, { useEffect, useState } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { Button, ConfirmModal, stylesFactory } from '@grafana/ui';
import Card from 'components/Card';
import { getOee, resetCount } from 'api';
import StepColorExplain from 'components/StepColorExplain';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const styles = getStyles();

  const [oee, setOee] = useState<any>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    // getOee()
    //   .then((response) => response.json())
    //   .then((data) => setOee(data['AREA_01']['LINE_01']));

    getOee(`${options.cardsUrl}/cards`)
      .then((response) => response.json())
      .then((data) => setOee(data.data));
  }, [options.cardsUrl, data.series]);

  function handleResetCount(ids: string[]) {
    const queries = ids.join('&ids=');

    resetCount(`${options.cardsUrl}/reset-counter?ids=${queries}`);
  }

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
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Reset count?"
        body="Are you sure you want to reset count of all machines?"
        confirmText="Reset all"
        icon="exclamation-triangle"
        onConfirm={() => {
          const ids = oee.map((item: any) => item.device_id);
          handleResetCount(ids);
          setShowDeleteModal(false);
        }}
        onDismiss={() => {
          setShowDeleteModal(false);
        }}
      />

      <div>
        <StepColorExplain />

        <div
          className={cx(
            css`
              display: block;
              margin-top: 8px;
              margin-left: 8px;
            `
          )}
        >
          <Button fill="outline" icon="repeat" variant="destructive" onClick={() => setShowDeleteModal(true)}>
            Reset
          </Button>
        </div>
      </div>

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
          {oee?.length > 0 &&
            oee.map((item: any, index: number) => <Card key={index} data={item} handleResetCount={handleResetCount} />)}
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
