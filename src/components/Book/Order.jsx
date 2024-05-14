import { Button, Col, Divider, InputNumber, Row } from "antd";
import './Order.scss'
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { doDeleteItemCartAction, doUpdateCartAction } from "../../redux/order/orderSlice";
import imgCartEmpty from '../../assets/cart-empty.jpg'
import { Link, useNavigate } from "react-router-dom";

const Order = () => {

    const carts = useSelector(state => state.order.carts);
    const [totalPrice, setTotalPrice] = useState(0)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (carts && carts.length > 0) {
            let sum = 0;
            carts.map((item) => {
                sum += item.quantity * item.detail.price;
            })
            setTotalPrice(sum)
        } else {
            setTotalPrice(0)
        }
    }, [carts])

    const handleChangeInputQuantity = (value, item) => {
        if (!value || value < 1) return;
        if (!isNaN(value)) {
            dispatch(doUpdateCartAction({ quantity: value, detail: item, _id: item._id }))
        }
    };

    const handleDeleteProduct = (id) => {
        dispatch(doDeleteItemCartAction({ _id: id }));
    }

    const nonAccentVietnamese = (str) => {
        str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/Đ/g, "D");
        str = str.replace(/đ/g, "d");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
        return str;
    }

    const convertSlug = (str) => {
        str = nonAccentVietnamese(str);
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        const from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
        const to = "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
        for (let i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes

        return str;
    }


    return (
        <>
            <Row gutter={[20, 20]} className="order-container">
                <Col md={18} sm={24} xs={24}>
                    <div className="content-left-order">
                        <div className="content-up-order">
                            <span className="title-left-order">Giỏ hàng</span>
                            <span className="title-right-order">{carts.length} sản phẩm</span>
                        </div>
                        <Divider />

                        {
                            carts && carts.length > 0 ?
                                carts.map((item, index) => {
                                    return (
                                        <>
                                            <div className="content-down-order" key={`product-order-${index}`}>
                                                <div className="product-order" >
                                                    <div className="img-order">
                                                        <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item?.detail?.thumbnail}`} alt="" />
                                                        <div className="mainText-order">
                                                            <span
                                                                style={{ cursor: 'pointer' }}
                                                                onClick={() => navigate(`/book/${convertSlug(item?.detail?.mainText)}?id=${item?._id}`)}
                                                            >
                                                                {item.detail.mainText}
                                                            </span>
                                                        </div>
                                                    </div>


                                                    <div className="price-order">
                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.detail.price)}
                                                    </div>

                                                    <div className="quantity-order">
                                                        <InputNumber
                                                            onChange={(value) => handleChangeInputQuantity(value, item)}
                                                            value={item.quantity}
                                                        />
                                                    </div>

                                                    <div className="total-price-order">
                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.detail.price * item.quantity)}
                                                    </div>
                                                    <div className="icon-delete-order">
                                                        <DeleteOutlined style={{ color: '#ff4d4f', cursor: 'pointer' }} onClick={() => handleDeleteProduct(item._id)} />
                                                    </div>
                                                </div>
                                                <Divider />
                                            </div>
                                        </>
                                    )
                                })
                                :
                                <>
                                    <div className="cart-empty">
                                        <img src={imgCartEmpty} />
                                        <span className="text-cart-empty">Giỏ hàng của bạn còn trống</span>
                                        <Link to={'/'}>
                                            <Button>Mua hàng ngay</Button>
                                        </Link>
                                    </div>
                                </>
                        }
                    </div>
                </Col>

                <Col md={6} sm={24} xs={24}>
                    <div className="content-right-order">
                        <div className="summary-order">
                            <span className="title-content-right-order">Tạm tính</span>

                            <Divider />

                            <div className="content-down-summary">
                                <div className="total-price-summary">
                                    <span>Tổng tiền</span>
                                    <span>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
                                    </span>
                                </div>
                                <div className="total-price-summary">
                                    <span>Giảm giá</span>
                                    <span>0đ</span>
                                </div>
                                <div className="total-price-summary">
                                    <span>Phí vận chuyển</span>
                                    <span>0đ</span>
                                </div>

                                <div className="total-price-summary">
                                    <span style={{ fontWeight: 600, color: '#ff4d4f' }}>Tổng thanh toán</span>
                                    <span style={{ fontWeight: 600, color: '#ff4d4f' }}>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
                                    </span>
                                </div>
                            </div>
                            <Button style={{ width: '100%' }} type='primary' >Mua hàng ({carts.length})</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default Order;