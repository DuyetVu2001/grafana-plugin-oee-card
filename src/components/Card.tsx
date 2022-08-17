import * as React from 'react';
import { css, cx } from 'emotion';
import { STEP_COLORS } from 'const';
import { IoWarningSharp } from 'react-icons/io5';
import { Tooltip } from '@grafana/ui';

export default function Card({ data }: any) {
  const { machine_code = null, actual = 0, ng = 0, current_step = 1, error_step_text = '' } = data;

  return (
    // wrapper
    <div
      className={cx(css`
        color: black;
        min-width: calc((100vw - 180px) / 6);
        background: rgb(211, 211, 211);
        margin: 5px;
        border-radius: 6px;
      `)}
    >
      {/* box */}
      <div
        className={cx(css`
          position: relative;
          border: 1px solid rgb(226, 226, 226);
          min-height: 266px;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        `)}
      >
        {/* warning */}
        {error_step_text && (
          <Tooltip content={error_step_text} placement="bottom" theme="error">
            <div
              className={cx(css`
                position: absolute;
                top: -1px;
                right: 4px;

                font-size: 26px;
                cursor: pointer;

                animation: blink 0.8s ease-in-out infinite;
                @keyframes blink {
                  from {
                    opacity: 1;
                    color: orange;
                  }
                  to {
                    opacity: 0;
                  }
                }
              `)}
            >
              <IoWarningSharp />
            </div>
          </Tooltip>
        )}

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
            background: ${STEP_COLORS.find((item) => item.id.toString() === current_step.toString())?.color};
            border-radius: 3px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            line-height: 1.1;
          `)}
        >
          <span
            className={cx(css`
              font-size: 3.6vw;
              color: rgb(255, 255, 255);
              font-weight: 600;
              text-align: center;
            `)}
          >
            {actual}
            <span
              className={cx(css`
                display: block;
                text-align: center;
                font-size: 16px;
                font-weight: 500;
              `)}
            >
              ({STEP_COLORS.find((item) => item.id.toString() === current_step.toString())?.name})
            </span>
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
