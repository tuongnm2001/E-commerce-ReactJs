import { Button, Checkbox, Col, Divider, Form, InputNumber, Rate, Row, Tabs, Pagination, Space, Tooltip } from "antd";
import './home.scss'
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { getAllCategory, getListBookWithPaginate } from "../../services/api";
import { ReloadOutlined } from "@ant-design/icons";

const Home = () => {

    const [form] = useForm();
    const [listCategory, setListCategory] = useState({})
    const [listBook, setListBook] = useState({})
    const [sortQuery, setSortQuery] = useState('sort=-sold')
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState({})

    const onFinish = (values) => {
        console.log(values);
    }

    const handleChangeFilter = (changedValues, values) => {
        console.log(">>> check handleChangeFilter", changedValues, values)
    }

    const onChange = (key) => {
        console.log(key);
    };

    const items = [
        {
            key: '1',
            label: `Phổ biến`,
            children: <></>,
        },
        {
            key: '2',
            label: `Hàng Mới`,
            children: <></>,
        },
        {
            key: '3',
            label: `Giá Thấp Đến Cao`,
            children: <></>,
        },
        {
            key: '4',
            label: `Giá Cao Đến Thấp`,
            children: <></>,
        },
    ];

    const fetAllCategory = async () => {
        const res = await getAllCategory();
        if (res && res.data) {
            setListCategory(res.data)
        }
    }

    useEffect(() => {
        fetAllCategory()
    }, [])

    const fetchAllBookWithPaginate = async () => {
        let query = `current=${current}&pageSize=${pageSize}`

        if (sortQuery) {
            query += `&${sortQuery}`
        }

        const res = await getListBookWithPaginate(query);
        if (res && res.data) {
            setListBook(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total)
        }
    }

    useEffect(() => {
        fetchAllBookWithPaginate()
    }, [current, pageSize, sortQuery])

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

    return (
        <>
            <Row gutter={[20, 20]} className="homepage-container">
                <Col className="gutter-row" md={5} sm={0} xs={0}>
                    <div className="content-left">
                        <div className="title-button">
                            <span className="title-danh-muc">Danh mục</span>
                            <Tooltip title="Tải lại">
                                <ReloadOutlined onClick={() => form.resetFields()} className="reload" />
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
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                                    <Form.Item name={["range", 'from']}>
                                        <InputNumber
                                            name='from'
                                            min={0}
                                            placeholder="đ TỪ"
                                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        />
                                    </Form.Item>
                                    <Form.Item name={["range", 'to']}>
                                        <InputNumber
                                            name='to'
                                            min={0}
                                            placeholder="đ ĐẾN"
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
                    <div className="content-right">
                        <Row>
                            <Tabs
                                defaultActiveKey="1"
                                items={items}
                                onChange={onChange}
                                responsive
                            />
                        </Row>

                        <Row className='customize-row'>
                            {
                                listBook && listBook.length > 0 &&
                                listBook.map((item, index) => {
                                    return (
                                        <div className="column" key={`book-${index}`}>
                                            <div className='wrapper'>
                                                <div className='thumbnail'>
                                                    <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item?.thumbnail}`} alt="thumbnail book" />
                                                </div>
                                                <div className='text'>{item.mainText}</div>
                                                <div className='price'>
                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                                                </div>
                                                <div className='rating'>
                                                    <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 10 }} />
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
                </Col>
            </Row >
        </>
    );
}

export default Home;