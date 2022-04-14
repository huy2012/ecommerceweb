import React, { useState } from 'react';
import { Image, Affix, Button,List, Avatar, Space, Descriptions } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

const ProfileUser = () => {

    const [container, setContainer] = useState(null);

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
                    // actions={[
                    //     <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                    //     <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                    //     <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                    // ]}
                    // extra={
                    //     <img
                    //         width={272}
                    //         alt="logo"
                    //         src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    //     />
                    // }
                >
                    <List.Item.Meta
                        avatar={<Avatar size={200} src={"https://elead.com.vn/wp-content/uploads/2020/04/hinh-nen-den-doc-dao_053033588-1280x800-8.jpg"} />}
                        title={  <Descriptions title="User Info" style={{marginTop : "35px"}}>
                            <Descriptions.Item label="UserName">Tên bạn</Descriptions.Item>
                            <Descriptions.Item label="Telephone">1234567890</Descriptions.Item>
                            <Descriptions.Item label="Live">Hà Nội, Việt Nam</Descriptions.Item>
                            <Descriptions.Item label="Remark">empty</Descriptions.Item>
                            <Descriptions.Item label="Address">
                                No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                            </Descriptions.Item>
                        </Descriptions>}
                        // description={item.description}
                    />
                    {/*{item.content}*/}
                </List.Item>
            )}
        />
    );
};

export default ProfileUser;
