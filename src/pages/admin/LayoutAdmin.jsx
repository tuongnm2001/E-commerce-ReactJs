import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    BookOutlined,
    UserOutlined,
    AppstoreOutlined,
    SnippetsOutlined,
    HeartTwoTone,
    ProfileOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Layout, message, Menu, Button, theme, Divider, Avatar, Space, Dropdown, Typography, Badge } from 'antd';
const { Header, Sider, Content, Footer } = Layout;
import { useDispatch, useSelector } from 'react-redux';
import './LayoutAdmin.scss'
import { logout } from "../../services/api";
import { doLogout } from "../../redux/account/accountSlice";
import { FaReact } from "react-icons/fa";

const LayoutAdmin = () => {

    const { Title, Text } = Typography;
    const user = useSelector(state => state.account.user)
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`

    const items = [
        {
            label: (
                <Space>
                    <Avatar size='large' icon={<UserOutlined />} src={urlAvatar} />
                    {/* <Text>{user.fullName}</Text> */}
                    <div style={{ display: 'flex', flexDirection: 'column', color: '#32475cde', marginLeft: '5px' }}>
                        <span style={{ fontSize: '1rem', fontWeight: '400' }}>{user.fullName}</span>
                        <span style={{ fontSize: '12px', color: '#32475c99' }}>{user.role}</span>
                    </div>

                </Space>
            ),
            key: '0',
            type: 'group',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <a rel="noopener noreferrer" >
                    <ProfileOutlined /> Quản lí tài khoản
                </a>
            ),
            key: '1',
        },
        {
            label: (
                <label onClick={() => handleLogout()}>
                    <LogoutOutlined /> Đăng xuất
                </label>
            ),
            key: '2',
        }
    ];

    const onClose = () => {
        setCollapsed(false);
    };

    const handleLogout = async () => {
        const res = await logout();
        if (res && res.data) {
            dispatch(doLogout())
            message.success('Đăng xuất thành công')
            navigate('/')
        }
    }

    return (
        <>
            {
                user.role === "ADMIN" ?
                    <Layout style={{ minHeight: '100vh' }} >
                        <Sider
                            className="sider"
                            theme="light"
                            collapsible
                            collapsed={collapsed}
                            onCollapse={(value) => setCollapsed(value)}
                        >
                            <Title
                                onClick={() => navigate('/')}
                                type="secondary"
                                style={{ display: 'flex', justifyContent: 'center', gap: '5px', cursor: 'pointer', color: '#32475c' }}
                            >
                                {
                                    collapsed === false ?
                                        <>
                                            <FaReact style={{ color: '#32475c' }} className="rotating-icon" />
                                            <span style={{ fontSize: '28px', fontWeight: '700', fontFamily: 'sans-serif' }}>YNWA</span>
                                        </>
                                        :
                                        <FaReact style={{ color: '#32475c' }} className="rotating-icon" />
                                }
                            </Title>

                            <Divider />

                            <Menu
                                theme="light"
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                items={[

                                    {
                                        key: '1',
                                        icon: <AppstoreOutlined />,
                                        label: <Link to='/admin'>Dashboard</Link>,
                                    },
                                    {
                                        key: '2',
                                        icon: <UserOutlined />,
                                        label: 'Manage Users',
                                        children: [
                                            {
                                                key: 'value',
                                                icon: <AppstoreOutlined />,
                                                label: <Link to='user'>CRUD</Link>,

                                            },
                                            {
                                                key: 'value1',
                                                icon: <AppstoreOutlined />,
                                                label: 'File1'
                                            }
                                        ]
                                    },
                                    {
                                        key: '4',
                                        icon: <BookOutlined />,
                                        label: <Link to='manage-books'>Manage Books</Link>,
                                    },
                                    {
                                        key: '5',
                                        icon: <SnippetsOutlined />,
                                        label: <Link to='manage-orders'>Manage Orders</Link>,
                                    },
                                ]}
                            />
                        </Sider>

                        <Layout >
                            <Header
                                style={{
                                    padding: 0,
                                    background: colorBgContainer,
                                    margin: '14px 16px 0',
                                    borderRadius: '8px'
                                }}
                            >
                                <Button
                                    className="toggle"
                                    type="text"
                                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                    onClick={() => setCollapsed(!collapsed)}
                                    style={{
                                        fontSize: '16px',
                                        width: 64,
                                        height: 64,
                                    }}
                                />

                                <div className="dropdown">
                                    <Dropdown
                                        // overlayStyle={{ width: '220px', paddingTop: '10px' }}
                                        menu={{
                                            items,
                                        }}
                                    >
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                <Badge offset={["-5%", "85%"]}
                                                    style={{
                                                        width: "8px",
                                                        height: "8px",
                                                        boxShadow: "0 0 0 3px #fff",
                                                        backgroundColor: "#31a24c"
                                                    }}
                                                    dot>
                                                    <Avatar size='large' icon={<UserOutlined />} src={urlAvatar} />
                                                </Badge>
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </div>
                            </Header>

                            <Content
                                style={{
                                    margin: '20px 16px',
                                    // padding: '24px',
                                    minHeight: 280,
                                    // background: colorBgContainer,
                                    borderRadius: borderRadiusLG,
                                }}
                            >
                                <div style={{ minHeight: 'calc(100vh - 128px)', position: 'relative' }}>
                                    <Outlet />
                                </div>
                            </Content>
                            <Footer className="footer-custom">
                                Ant Design ©{new Date().getFullYear()} Created by NMT <HeartTwoTone twoToneColor="#eb2f96" />
                            </Footer>
                        </Layout>
                    </Layout >
                    :
                    <Outlet />
            }

        </>
    );
}

export default LayoutAdmin;