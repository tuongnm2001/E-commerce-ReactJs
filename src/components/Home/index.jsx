import { Button, Checkbox, Col, Divider, Form, InputNumber, Rate, Row, Tabs, Pagination, Tooltip, Spin } from "antd";
import './home.scss'
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { getAllCategory, getListBookWithPaginate } from "../../services/api";
import { ReloadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const [form] = useForm();
    const [isLoading, setIsLoading] = useState(false)
    const [listCategory, setListCategory] = useState({})
    const [listBook, setListBook] = useState({})
    const [sortQuery, setSortQuery] = useState('sort=-createdAt')
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState({})
    const [filter, setFilter] = useState('')
    const navigate = useNavigate();

    const onFinish = (values) => {
        if (values?.range?.from >= 0 && values?.range.to >= 0) {
            let f = `price>=${values?.range?.from}&price<=${values?.range?.to}`;
            if (values?.category?.length) {
                const cate = values?.category?.join(',');
                f += `&category=${cate}`
            }
            setFilter(f);
        }
    }

    const handleChangeFilter = (changedValues, values) => {
        if (changedValues.category) {
            const cate = values.category
            if (cate && cate.length > 0) {
                const f = cate.join(',')
                setFilter(`category=${f}`)
            } else {
                setFilter('')
            }
        }
    }

    const fetAllCategory = async () => {
        const res = await getAllCategory();
        if (res && res.data) {
            setListCategory(res.data)
        }
    }

    useEffect(() => {
        fetAllCategory()
    }, [])

    const items = [
        {
            key: 'sort=-createdAt',
            label: `Hàng Mới`,
            children: <></>,
        },
        {
            key: 'sort=-sold',
            label: `Phổ biến`,
            children: <></>,
        },
        {
            key: 'sort=price',
            label: `Giá Thấp Đến Cao`,
            children: <></>,
        },
        {
            key: 'sort=-price',
            label: `Giá Cao Đến Thấp`,
            children: <></>,
        },

    ];

    const fetchAllBookWithPaginate = async () => {
        setIsLoading(true)
        let query = `current=${current}&pageSize=${pageSize}`

        if (sortQuery) {
            query += `&${sortQuery}`
        }

        if (filter) {
            query += `&${filter}`
        }

        const res = await getListBookWithPaginate(query);
        if (res && res.data) {
            setListBook(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchAllBookWithPaginate()
    }, [current, pageSize, filter, sortQuery])

    const handleOnChangePage = (pagination, filters, sorter, extra) => {

        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current)
            console.log(pagination.current);
        }

        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize)
            setCurrent(1)
        }
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

    const handleRedirectBook = (book) => {
        const slug = convertSlug(book.mainText);
        navigate(`/book/${slug}?id=${book._id}`)
    }

    return (
        <>
            <Row gutter={[20, 20]} className="homepage-container">
                <Col className="gutter-row" md={5} sm={0} xs={0}>
                    <div className="content-left">
                        <div className="title-button">
                            <span className="title-danh-muc">Danh mục</span>
                            <Tooltip title="Tải lại">
                                <ReloadOutlined onClick={() => { form.resetFields(), setFilter('') }} className="reload" />
                            </Tooltip>
                        </div>
                        <Form
                            onFinish={onFinish}
                            form={form}
                            onValuesChange={(changedValues, values) => handleChangeFilter(changedValues, values)}
                        >
                            <Form.Item
                                name="category"
                                labelCol={{ span: 24 }}
                            >
                                <Checkbox.Group>
                                    <div className="item-danhmuc">
                                        <Row className="item-checkbox">
                                            {
                                                listCategory && listCategory.length > 0 &&
                                                listCategory.map((item, index) => {
                                                    return (
                                                        <Checkbox key={`checkbox-${index}`} value={item}>{item}</Checkbox>
                                                    )
                                                })
                                            }
                                        </Row>
                                    </div>
                                </Checkbox.Group>
                            </Form.Item>
                            <Divider orientation="left">Khoảng giá</Divider>
                            <Form.Item
                                labelCol={{ span: 24 }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Form.Item name={["range", 'from']}>
                                        <InputNumber
                                            style={{
                                                width: 100,
                                            }}
                                            name='from'
                                            step={1000}
                                            min={0}
                                            placeholder="Từ"
                                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        />
                                    </Form.Item>
                                    <span>-</span>
                                    <Form.Item name={["range", 'to']}>
                                        <InputNumber
                                            style={{
                                                width: 100,
                                            }}
                                            name='to'
                                            step={1000}
                                            min={0}
                                            placeholder="Đến"
                                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        />
                                    </Form.Item>
                                </div>
                                <div>
                                    <Button style={{ width: '100%' }} onClick={() => form.submit()}
                                        type='primary'>Áp dụng</Button>
                                </div>
                            </Form.Item>
                            <Divider orientation="left  ">Đánh giá</Divider>
                            <Form.Item
                                labelCol={{ span: 24 }}
                            >
                                <div>
                                    <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                    <span className="ant-rate-text"></span>
                                </div>
                                <div>
                                    <Rate value={4} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                    <span className="ant-rate-text">trở lên</span>
                                </div>
                                <div>
                                    <Rate value={3} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                    <span className="ant-rate-text">trở lên</span>
                                </div>
                                <div>
                                    <Rate value={2} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                    <span className="ant-rate-text">trở lên</span>
                                </div>
                                <div>
                                    <Rate value={1} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                    <span className="ant-rate-text">trở lên</span>
                                </div>
                            </Form.Item>

                        </Form>
                    </div>
                </Col>

                <Col className="gutter-row" md={19} sm={24} xs={24}>
                    <Spin spinning={isLoading}>
                        <div className="content-right">
                            <Row>
                                <Tabs
                                    defaultActiveKey="sort=-createdAt"
                                    items={items}
                                    onChange={(value) => { setSortQuery(value) }}
                                    style={{ overflowX: 'auto' }}
                                />
                            </Row>

                            <Row className='customize-row'>
                                {
                                    listBook && listBook.length > 0 &&
                                    listBook.map((item, index) => {
                                        return (
                                            <div className="column" key={`book-${index}`} onClick={() => handleRedirectBook(item)}>
                                                <div className='wrapper'>
                                                    <div className='thumbnail'>
                                                        <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item?.thumbnail}`} alt="thumbnail book" />
                                                    </div>
                                                    <div className='text'>{item.mainText}</div>
                                                    <div className='price'>
                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                                                    </div>
                                                    <div className='rating'>
                                                        <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 8, marginRight: 0 }} />
                                                        <span className="separator "></span>
                                                        <span className="sold">Đã bán {item.sold}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Row>

                            <Row style={{ display: "flex", justifyContent: "center", padding: '25px' }}>
                                <Pagination
                                    total={total}
                                    current={current}
                                    pageSize={pageSize}
                                    responsive
                                    onChange={(p, s) => handleOnChangePage({ current: p, pageSize: s })}
                                />
                            </Row>
                        </div>
                    </Spin>
                </Col>
            </Row >
        </>
    );
}

export default Home;