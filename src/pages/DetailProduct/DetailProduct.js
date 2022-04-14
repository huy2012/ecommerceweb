import React from "react";
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import {useLocation} from "react-router-dom";

import './DetailProduct.css'

const DetailProduct = () => {

    const {state} = useLocation();

    console.log(state);

    const listData = [];
    for (let i = 0; i < 1; i++) {
        listData.push({
            href: 'https://ant.design',
            title: `ant design part ${i}`,
            avatar: 'https://joeschmoe.io/api/v1/random',
            description:
                'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        });
    }

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    return(
        <List
            itemLayout="vertical"
            size="large"

            dataSource={listData}

            renderItem={item => (
                <List.Item
                    key={item.title}

                    extra={
                        <img
                            width={272}
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                    }
                >

                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                    >
                    </List.Item.Meta>
                </List.Item>
            )}
        />
    );
};

export default DetailProduct;
