import React, { useState } from 'react';
import { Badge, Descriptions, Drawer } from 'antd';
import moment from 'moment';

const ModalViewDetailUser = (props) => {

    const { open, setOpen, dataUserView } = props;

    //format createdAt , updatedAt
    const formattedCreatedAt = moment(dataUserView?.createdAt).format('MM/DD/YYYY HH:mm:ss');
    const formattedUpdatedAt = moment(dataUserView?.updatedAt).format('MM/DD/YYYY HH:mm:ss');

    const onClose = () => {
        setOpen(false);
    };

    const items = [
        {
            key: '1',
            label: 'Id',
            children: dataUserView?._id
        },
        {
            key: '2',
            label: 'Tên hiển thị',
            children: dataUserView?.fullName,
        },
        {
            key: '3',
            label: 'Email',
            children: dataUserView?.email,
        },
        {
            key: '4',
            label: 'Số điện thoại',
            children: dataUserView?.phone,
        },
        {
            key: '5',
            label: 'Vai trò',
            children: <Badge status="processing" text={dataUserView?.role} />,
        },

        {
            key: '7',
            label: 'Ngày tạo',
            children: formattedCreatedAt
        },

        {
            key: '8',
            label: 'Ngày cập nhật',
            children: formattedUpdatedAt,
        }
    ];

    return (
        <>
            <Drawer
                title="Thông tin người dùng"
                onClose={onClose}
                open={open}
                width={'50vw'}
            >
                <Descriptions
                    bordered
                    column={1}
                    items={items}
                />
            </Drawer>
        </>
    );
};
export default ModalViewDetailUser;