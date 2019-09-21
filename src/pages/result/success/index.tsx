import { Button, Card, Result } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Fragment } from 'react';
import { GridContent } from '@ant-design/pro-layout';


const extra = (
  <Fragment>
    <Button type="primary">
      <FormattedMessage id="result-success.success.btn-return" defaultMessage="Back to list" />
    </Button>
  </Fragment>
);

export default () => (
  <GridContent>
    <Card bordered={false}>
      <Result
        status="success"
        title={formatMessage({ id: 'result-success.success.title' })}
        subTitle={formatMessage({ id: 'result-success.success.description' })}
        extra={extra}
        style={{ marginBottom: 16 }}
      >
      </Result>
    </Card>
  </GridContent>
);
