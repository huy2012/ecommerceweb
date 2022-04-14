import {Tabs} from 'antd';
import {useState} from 'react';

import CartHistory from "../Component/ProfilePage/CartHistory";
import ProfileUser from '../Component/ProfilePage/ProfileUser'

const {TabPane} = Tabs;

const Profile = () => {

    const [tabsKey , settabsKey] = useState("1");

    function callback(key) {
        settabsKey(key);
    }

    return(
        <div  >
            <Tabs activeKey={tabsKey} onTabClick={callback} size={"large"} >
                <TabPane tab="Thông tin cá nhân" key="1">
                    <ProfileUser />
                </TabPane>
                <TabPane tab="Lịch sử mua hàng" key="2">
                    <CartHistory />
                </TabPane>

            </Tabs>
        </div>
    );
};

export default Profile;
