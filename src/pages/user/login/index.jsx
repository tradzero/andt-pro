import { Alert, Checkbox } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { connect } from 'dva';
import LoginComponents from './components/Login';
import styles from './style.less';

const { Tab, UserName, Password, Submit } = LoginComponents;

@connect(({ login, loading }) => ({
    userLogin: login,
    submitting: loading.effects['login/login'],
}))
class Login extends Component {
    loginForm = undefined;

    state = {
        type: 'account',
        autoLogin: true,
    };

    changeAutoLogin = e => {
        this.setState({
            autoLogin: e.target.checked,
        });
    };

    handleSubmit = (err, values) => {
        const { type } = this.state;

        if (!err) {
            const { dispatch } = this.props;
            dispatch({
                type: 'login/login',
                payload: { ...values, type },
            });
        }
    };

    renderMessage = content => (
        <Alert
            style={{
                marginBottom: 24,
            }}
            message={content}
            type="error"
            showIcon
        />
    );

    render() {
        const { userLogin, submitting } = this.props;
        const { status, type: loginType } = userLogin;
        const { type, autoLogin } = this.state;
        return (
            <div className={styles.main}>
                <LoginComponents
                    defaultActiveKey={type}
                    onSubmit={this.handleSubmit}
                    onCreate={form => {
                        this.loginForm = form;
                    }}
                >
                    <Tab
                        key="account"
                        tab={formatMessage({
                            id: 'user-login.login.tab-login-credentials',
                        })}
                    >
                        {status === 'error' &&
                            loginType === 'account' &&
                            !submitting &&
                            this.renderMessage(
                                formatMessage({
                                    id: 'user-login.login.message-invalid-credentials',
                                }),
                            )}
                        <UserName
                            name="userName"
                            placeholder={`${formatMessage({
                                id: 'user-login.login.userName',
                            })}:`}
                            rules={[
                                {
                                    required: true,
                                    message: formatMessage({
                                        id: 'user-login.userName.required',
                                    }),
                                },
                            ]}
                        />
                        <Password
                            name="password"
                            placeholder={`${formatMessage({
                                id: 'user-login.login.password',
                            })}:`}
                            rules={[
                                {
                                    required: true,
                                    message: formatMessage({
                                        id: 'user-login.password.required',
                                    }),
                                },
                            ]}
                            onPressEnter={e => {
                                e.preventDefault();

                                if (this.loginForm) {
                                    this.loginForm.validateFields(this.handleSubmit);
                                }
                            }}
                        />
                    </Tab>
                    <div>
                        <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
                            <FormattedMessage id="user-login.login.remember-me" />
                        </Checkbox>
                    </div>
                    <Submit loading={submitting}>
                        <FormattedMessage id="user-login.login.login" />
                    </Submit>
                </LoginComponents>
            </div>
        );
    }
}

export default Login;
