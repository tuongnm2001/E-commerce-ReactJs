import React, { useState } from 'react';
import { Drawer, Row, Avatar, Col } from 'antd';
import moment from 'moment';
import './ModalViewDetailUser.scss'

const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
);

const ModalViewDetailUser = (props) => {

    const { open, setOpen, dataUserView } = props;
    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataUserView?.avatar}`

    //format createdAt , updatedAt
    const formattedCreatedAt = moment(dataUserView?.createdAt).format('DD/MM/YYYY HH:mm:ss');
    const formattedUpdatedAt = moment(dataUserView?.updatedAt).format('DD/MM/YYYY HH:mm:ss');

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Drawer
                title="THÔNG TIN NGƯỜI DÙNG"
                onClose={onClose}
                open={open}
                width={'50vw'}
            >

                <div className='detai-user-container'>


                    <div className='detai-user'>
                        <Avatar
                            size={'large'}
                            className='avatar'
                            src={urlAvatar}
                        />
                        <div className='name-role'>
                            <span className='name-user'>{dataUserView.fullName}</span>
                            <span className='role-user'>{dataUserView?.role}</span>
                        </div>
                    </div>

                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Id" content={dataUserView._id} />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Email" content={dataUserView.email} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Số điện thoại" content={dataUserView.phone} />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Ngày tạo" content={formattedCreatedAt} />
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Ngày cập nhật" content={formattedUpdatedAt} />
                        </Col>
                    </Row>
                </div>

            </Drawer>
        </>
    );
};
export default ModalViewDetailUser;