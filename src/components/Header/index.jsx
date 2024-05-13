import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Input, Badge, Dropdown, Space, message, Drawer, Divider, Popover, Button } from 'antd';
import { UserOutlined, ShoppingCartOutlined, MehOutlined, MenuOutlined, ProfileOutlined, LogoutOutlined, BarChartOutlined } from '@ant-design/icons';
import './header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { FaReact } from "react-icons/fa";
import { logout } from '../../services/api';
import { doLogout } from '../../redux/account/accountSlice';

const { Search } = Input;

const HeaderPage = () => {

    const isAuthenticated = useSelector(state => state.account.isAuthenticated)
    const user = useSelector(state => state.account.user)
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const carts = useSelector(state => state.order.carts)

    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`


    let items = [
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
            label: <label><ProfileOutlined /> Quản lí tài khoản</label>,
            key: '1',
        },
        {
            label: <label onClick={() => handleLogout()}><LogoutOutlined /> Đăng xuất</label>,
            key: '2',
        }
    ];

    if (user.role === "ADMIN") {
        // Tìm vị trí của mục "Quản lí tài khoản" trong mảng và chèn mục "Quản trị" vào sau đó
        const index = items.findIndex(item => item.key === '1');
        if (index !== 0) {
            items.splice(index, 0, {
                label: <Link to="/admin"><BarChartOutlined /> Quản trị</Link>,
                key: '3',
            });
        }
    }

    const handleLogout = async () => {
        const res = await logout()
        if (res && res.data) {
            dispatch(doLogout());
            message.success('Đăng xuất thành công')
            navigate('/')
        }
    }

    const content = (
        <div className='cart-container'>
            <div className='content-up'>
                <div className='content-left-cart'>
                    <div className='img-cart'>
                        <img src="https://picsum.photos/id/1018/1000/600/" alt="" />
                    </div>

                    <div className='mainText-cart'>
                        <span>Sách Luật - Nhật ký trong tùSách Luật - Nhật ký trong tùSách Luật - Nhật ký trong tù</span>
                    </div>
                </div>

                <div className='price-cart'>
                    <span>300.000đ</span>
                </div>
            </div>

            <div className='content-up'>
                <div className='content-left-cart'>
                    <div className='img-cart'>
                        <img src="https://picsum.photos/id/1018/1000/600/" alt="" />
                    </div>

                    <div className='mainText-cart'>
                        <span>Sách Luật - Nhật ký trong tù</span>
                    </div>
                </div>

                <div className='price-cart'>
                    <span>300.000đ</span>
                </div>
            </div>

            <div className='content-up'>
                <div className='content-left-cart'>
                    <div className='img-cart'>
                        <img src="https://picsum.photos/id/1018/1000/600/" alt="" />
                    </div>

                    <div className='mainText-cart'>
                        <span>Sách Luật - Nhật ký trong tù</span>
                    </div>
                </div>

                <div className='price-cart'>
                    <span>300.000đ</span>
                </div>
            </div>

            <div className='content-down'>
                <Button type='primary'>Xem giỏ hàng</Button>
            </div>
        </div>
    );

    return (
        <>
            <div className='navbar-container'>
                <div className='header'>
                    <div className="logo" onClick={() => navigate('/')}>
                        <FaReact className="rotating-icon" style={{ color: '#32475c' }} />
                        <MenuOutlined className="menu-icon" type="primary" onClick={() => setOpen(true)} />
                        <span className="title">YNWA</span>
                    </div>

                    <Search
                        placeholder="Tìm kiếm sản phẩm"
                        onSearch={(values) => console.log(values)}
                        style={{ width: 650, marginLeft: '20px' }}
                        size="large"
                    />

                    <div className='cart'>
                        <Popover
                            title={<span className="custom-title-cart">Sản phẩm mới thêm</span>}
                            placement="bottomRight"
                            content={content}
                            arrow={true}
                        >
                            <Badge
                                count={carts?.length ?? 0}
                                size="small"
                                showZero
                            >
                                <ShoppingCartOutlined style={{ fontSize: '18px' }} />
                            </Badge>
                        </Popover>

                    </div>

                    {
                        isAuthenticated === true ?
                            <Dropdown
                                className='dropdown'
                                // overlayStyle={{ width: '220px', paddingTop: '10px' }}
                                menu={{
                                    items,
                                }}
                            >
                                <a onClick={(e) => e.preventDefault()} style={{ cursor: 'pointer' }}>
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
                            :
                            <div className='account' onClick={() => navigate('/login')} >
                                <MehOutlined className='icon' />
                                <span>Tài khoản </span>
                            </div>
                    }
                </div>
            </div>


            <Drawer title={
                <Space>
                    <Avatar size='large' icon={<UserOutlined />} src={urlAvatar} />
                    <div style={{ display: 'flex', flexDirection: 'column', color: '#32475cde', marginLeft: '5px' }}>
                        <span style={{ fontSize: '1rem', fontWeight: '400' }}>{user.fullName}</span>
                        <span style={{ fontSize: '12px', color: '#32475c99' }}>{user.role}</span>
                    </div>
                </Space>
            }
                onClose={() => setOpen(false)}
                open={open}
                placement='left'
            >
                <Link to='/admin'>Quản trị</Link>
                <Divider />
                <Link>Quản lí tài khoản </Link>
                <Divider />
                <Link>Đăng xuất</Link>
            </Drawer>

        </>
    );
};

export default HeaderPage;
