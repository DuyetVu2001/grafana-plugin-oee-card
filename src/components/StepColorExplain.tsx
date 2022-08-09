import { STEP_COLORS } from 'const';
import { css, cx } from 'emotion';
import React from 'react';

export default function StepColorExplain() {
  return (
    <div
      className={cx(css`
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      `)}
    >
      {STEP_COLORS.map((step) => (
        <div
          key={step.name}
          className={cx(css`
            display: flex;
            justify-content: center;
            align-items: center;

            padding: 0 6px;
            margin: 6px;
            border-radius: 6px;
            line-height: 32px;

            background: ${step.color};
          `)}
        >
          <div
            className={cx(css`
              font-size: 15px;
              font-weight: 500;
              color: white;
            `)}
          >
            {step.name}
          </div>
        </div>
      ))}
    </div>
  );
}
