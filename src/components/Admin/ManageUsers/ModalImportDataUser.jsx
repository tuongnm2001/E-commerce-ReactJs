import React, { useState } from 'react';
import { Button, Modal, message, Upload, Table } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const ModalImportDataUser = (props) => {

    const { Dragger } = Upload;
    const { open, setOpen } = props;

    const columns =
        [
            { dataIndex: 'fullName', title: 'Tên hiển thị' },
            { dataIndex: 'email', title: 'Email' },
            { dataIndex: 'phone', title: 'Số điện thoại' },
        ]

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess('ok')
        }, 1000);
    }

    const propsUpload = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        accept: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
        // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        customRequest: dummyRequest,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <>
            <Modal
                title="Import data user"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Import data"
                maskClosable={false}
                centered
                width={"50vw"}
            >
                <Dragger {...propsUpload} size='3   '>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single upload. Only accept .csv .xls .xlsx
                    </p>
                </Dragger>

                <Table
                    columns={columns}
                    style={{ paddingTop: '20px' }}
                    caption="Du lieu up load"
                />
            </Modal >
        </>
    );
}

export default ModalImportDataUser;