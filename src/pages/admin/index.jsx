import { Avatar, Card, Col, Row, Statistic } from 'antd';
import './DashBoard.scss'
import Meta from 'antd/es/card/Meta';
import { ArrowDownOutlined, ArrowUpOutlined, PayCircleOutlined, UserOutlined } from '@ant-design/icons';
import CountUp from 'react-countup';
import { useEffect, useState } from 'react';
import { getDashBoard, totalBook } from '../../services/api';
import { IoBookSharp } from "react-icons/io5";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';


const DashBoard = () => {

    const [totalUser, setTotalUser] = useState([])
    const [totalOrder, setTotalOrder] = useState([])
    const [listBook, setListBook] = useState([])
    const [sold, setSold] = useState([])
    const formatter = (value) => <CountUp end={value} separator="," />;

    const fetchAllDashboard = async () => {
        const res = await getDashBoard();
        if (res && res.data) {
            setTotalUser(res.data.countUser)
            setTotalOrder(res.data.countOrder)
        }
    }

    const fetchAllTotalBook = async () => {
        const res = await totalBook();
        if (res && res.data) {
            setListBook(res.data)
        }
    }

    const calculateTotalSold = () => {
        const totalSold = listBook.reduce((accumulator, item) => {
            return accumulator + item.sold;
        }, 0); // 0 là giá trị khởi tạo của accumulator

        setSold(totalSold);
    };

    useEffect(() => {
        fetchAllDashboard()
        fetchAllTotalBook()
        calculateTotalSold()
    }, [])

    const data = [
        { name: 'Người dùng', value: totalUser, color: '#3f8600' },
        { name: 'Sản phẩm', value: listBook.length, color: '#754376' },
        { name: 'Đơn hàng', value: totalOrder, color: '#cf1322' },
    ];
    console.log(listBook);
    return (
        <div className='dashboard-container'>
            <Row gutter={[20, 20]}>
                <Col span={8}>
                    <Card bordered={false}>
                        <Statistic
                            title="Tổng người dùng"
                            value={totalUser}
                            precision={2}
                            valueStyle={{
                                color: '#3f8600',
                            }}
                            prefix={<UserOutlined />}
                            formatter={formatter}
                        />
                    </Card>
                </Col>

                <Col span={8}>
                    <Card bordered={false}>
                        <Statistic
                            title="Tổng sản phẩm"
                            value={listBook.length}
                            precision={2}
                            valueStyle={{
                                color: '#754376',
                            }}
                            prefix={<IoBookSharp />}
                            formatter={formatter}
                        />
                    </Card>
                </Col>

                <Col span={8}>
                    <Card bordered={false}>
                        <Statistic
                            title="Tổng đơn hàng"
                            value={totalOrder}
                            precision={2}
                            valueStyle={{
                                color: '#cf1322',
                            }}
                            prefix={<PayCircleOutlined />}
                            formatter={formatter}
                        />
                    </Card>
                </Col>

                <Col span={24}>
                    <Card bordered={false}>
                        <h3>Biểu đồ thống kê</h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#8884d8" barSize={50}>
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>

        </div>
    );
}

export default DashBoard;