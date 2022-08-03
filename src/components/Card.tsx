import * as React from 'react';
import { css, cx } from 'emotion';
import { STEP_COLORS } from 'const';

export default function Card({ data }: any) {
  const { machine_code = null, actual = 0, ng = 0, current_step = 1 } = data;

  return (
    // wrapper
    <div
      className={cx(css`
        color: black;
        min-width: calc((100vw - 180px) / 6);
        background: rgb(221, 221, 221);
        margin: 5px;
        border-radius: 6px;
      `)}
    >
      {/* box */}
      <div
        className={cx(css`
          border: 1px solid rgb(204, 204, 204);
          min-height: 300px;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        `)}
      >
        {/* top */}
        <div
          className={cx(css`
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 3px 0px;
          `)}
        >
          <div
            className={cx(css`
              font-size: 1.2vw;
              font-weight: 600;
            `)}
          >
            {machine_code}
          </div>
        </div>

        {/* center */}
        <div
          className={cx(css`
            flex: 1 1 0%;
            background: ${STEP_COLORS[current_step - 1].color};
            border-radius: 3px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
          `)}
        >
          <span
            className={cx(css`
              font-size: 3.6vw;
              color: rgb(255, 255, 255);
              font-weight: 600;
            `)}
          >
            {actual}
            {/* % */}
          </span>
        </div>

        {/* footer */}
        <div
          className={cx(css`
            background: rgb(222, 222, 222);
            font-size: 18px;
            font-weight: 600;
            padding: 12px 25px;
          `)}
        >
          <div
            className={cx(css`
              display: flex;
              flex: 1 1 0%;
              justify-content: space-between;
            `)}
          >
            <span style={{ textAlign: 'left' }}>Thành phẩm</span>
            <span style={{ textAlign: 'left' }}>{actual}</span>
          </div>
          <div
            className={cx(css`
              display: flex;
              flex: 1 1 0%;
              justify-content: space-between;
            `)}
          >
            <span style={{ textAlign: 'left' }}>SP lỗi</span>
            <span style={{ textAlign: 'left' }}>{ng}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
