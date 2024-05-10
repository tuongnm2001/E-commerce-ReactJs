import ImageGallery from "react-image-gallery";
import { Breadcrumb, Col, Divider, Flex, Rate, Row, Tag } from 'antd';
import { CheckCircleOutlined, HomeOutlined, LikeOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import './view-detail.scss'
import ModalGallery from "./ModalGallery";
import { useState } from "react";

const ViewDetail = () => {

    const [open, setOpen] = useState(false)

    const images = [
        {
            original: "https://picsum.photos/id/1018/1000/600/",
            thumbnail: "https://picsum.photos/id/1018/250/150/",
        },
        {
            original: "https://picsum.photos/id/1015/1000/600/",
            thumbnail: "https://picsum.photos/id/1015/250/150/",
        },
        {
            original: "https://picsum.photos/id/1019/1000/600/",
            thumbnail: "https://picsum.photos/id/1019/250/150/",
        },
        {
            original: "https://picsum.photos/id/1018/1000/600/",
            thumbnail: "https://picsum.photos/id/1018/250/150/",
        },
        {
            original: "https://picsum.photos/id/1015/1000/600/",
            thumbnail: "https://picsum.photos/id/1015/250/150/",
        },
        {
            original: "https://picsum.photos/id/1019/1000/600/",
            thumbnail: "https://picsum.photos/id/1019/250/150/",
        },
    ];

    const handleOnClickImage = () => {
        setOpen(true)
    }

    return (
        <>
            <Breadcrumb style={{ paddingBottom: '20px' }} separator=">">
                <Breadcrumb.Item>
                    <Link to="/">
                        <HomeOutlined />
                        <span> Trang chủ</span>
                    </Link>
                </Breadcrumb.Item>

                <Breadcrumb.Item>
                    <span>How Psychology Works - Hiểu Hết Về Tâm Lý</span>
                </Breadcrumb.Item>
            </Breadcrumb>

            <div className="view-detail-container">
                <Row gutter={[20, 20]}>
                    <Col md={10}>
                        <div className="view-detail-content-left" >
                            <ImageGallery
                                onClick={() => handleOnClickImage()}
                                items={images}
                                showPlayButton={false} //hide play button
                                showFullscreenButton={false} //hide fullscreen button
                                renderLeftNav={() => <></>} //left arrow === <> </>
                                renderRightNav={() => <></>}//right arrow === <> </>
                                slideOnThumbnailOver={true}  //onHover => auto scroll images
                            />
                        </div>
                    </Col>

                    <Col md={14}>
                        <div className="view-detail-content-right">

                            <Flex gap="4px 0" wrap style={{ fontWeight: 700 }}>
                                <Tag icon={<LikeOutlined />} color="error">
                                    Top Deal
                                </Tag>

                                <Tag icon={<CheckCircleOutlined />} color="processing">
                                    Chính hãng
                                </Tag>
                            </Flex>

                            <div className='author'>Tác giả: <a href='#'>Jo Hemmings</a> </div>

                            <div className='title'>How Psychology Works - Hiểu Hết Về Tâm Lý Học
                                How Psychology Works - Hiểu Hết Về Tâm Lý Học
                            </div>

                            <div className='rating'>
                                <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 12 }} />
                                <span className='sold'>
                                    <Divider type="vertical" />
                                    Đã bán 6969
                                </span>

                            </div>

                            <div className='price'>
                                <span className='currency'>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(500000)}
                                </span>
                            </div>

                            <div className='delivery'>
                                <span className='left-side'>Vận chuyển</span>
                                <span className='right-side'>Miễn phí vận chuyển</span>
                            </div>

                            <div className='quantity'>
                                <span className='left-side'>Số lượng</span>
                                <span className='right-side'>
                                    <button className="btn-minus"><MinusOutlined /></button>
                                    <input className="inputValue" defaultValue={1} />
                                    <button className="btn-plus"><PlusOutlined /></button>
                                </span>
                            </div>
                            <div className='buy'>
                                <button className='cart'>
                                    <span>Thêm vào giỏ hàng</span>
                                </button>
                                <button className='now'>Mua ngay</button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

            <ModalGallery
                open={open}
                setOpen={setOpen}
                images={images}
            />
        </>
    );
}

export default ViewDetail;