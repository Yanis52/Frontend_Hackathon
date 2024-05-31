import React from 'react';
import { AppstoreAddOutlined, GatewayOutlined, HomeOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Image, Layout, Menu, theme } from 'antd';
import './Navbar.css';
import {  Outlet, useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;



const Navbar: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedKey, setSelectedKey] = React.useState<string>('dashboard');

  const handleMenuClick = (key: string) => {
    setSelectedKey(key);
    navigate(`/${key}`)
  };

  const navigate = useNavigate();

  return (
    <Layout>
     <Header style={{ display: 'flex', alignItems: 'center',backgroundColor:'white' }}>
        <div className="demo-logo" style={{backgroundColor:'white'}}>
        <Image src="/assets/images/image.webp" width={60} preview={false} />
        </div>
        <Menu
          mode="horizontal"
          style={{ flex: 1, minWidth: 0, backgroundColor: 'white', marginLeft: 100 }}
        >
          <Menu.Item
            onClick={() => handleMenuClick('dashboard')}
            className={selectedKey === 'dashboard' ? 'selected-menu-item' : ''}
            style={{
              backgroundColor: selectedKey === 'dashboard' ? '#d5c47e' : '',
              color: selectedKey === 'dashboard' ? 'white' : 'black',
              fontFamily: 'Poppins',
            }}
          >
            <HomeOutlined style={{marginRight:10}} />
            Home
          </Menu.Item>
          <Menu.Item
            onClick={() => handleMenuClick('athletes')}
            className={selectedKey === 'athletes' ? 'selected-menu-item' : ''}
            style={{
              backgroundColor: selectedKey === 'athletes' ? '#d5c47e' : '',
              color: selectedKey === 'athletes' ? 'white' : 'black',
              fontFamily: 'Poppins',
            }}
          >
            <TeamOutlined style={{marginRight:10}} />
            Athletes
          </Menu.Item>
          <Menu.Item
            onClick={() => handleMenuClick('host')}
            className={selectedKey === 'host' ? 'selected-menu-item' : ''}
            style={{
              backgroundColor: selectedKey === 'host' ? '#d5c47e' : '',
              color: selectedKey === 'host' ? 'white' : 'black',
              fontFamily: 'Poppins',
            }}
          >
            <TeamOutlined style={{marginRight:10}} />
            Hosts
          </Menu.Item>
        </Menu>
      </Header>
      
      
    <Content style={{ padding: '0 0px' }}>
      <Layout style={{ padding: '5px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}>
        <Sider style={{ background: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} width={200}>
          <Menu
            className="custom-menu"
            mode="inline"
            defaultSelectedKeys={['dashboard']}
            defaultOpenKeys={['dashboard']}
            style={{ height: '100%',marginTop:25 }}
          >
            <Menu.Item onClick={() => handleMenuClick('dashboard')}
            className={selectedKey === 'dashboard' ? 'selected-menu-item' : ''} style={{ marginTop: 0 }} >
              <AppstoreAddOutlined />
              <span style={{fontFamily:'Poppins'}}>Dashboard</span>
            </Menu.Item>
            <Menu.Item onClick={() => handleMenuClick('athletes')}
            className={selectedKey === 'athletes' ? 'selected-menu-item' : ''}>
              <UserOutlined />
              <span style={{fontFamily:'Poppins'}}>Athletes</span>
            </Menu.Item>
            <Menu.Item onClick={() => handleMenuClick('host')}
            className={selectedKey === 'host' ? 'selected-menu-item' : ''}>
              <GatewayOutlined />
              <span style={{fontFamily:'Poppins'}}>Hosts</span>
            </Menu.Item>
            <Menu.Item onClick={() => handleMenuClick('prediction')}
            className={selectedKey === 'prediction' ? 'selected-menu-item' : ''}>
              <GatewayOutlined />
              <span style={{fontFamily:'Poppins'}}>Prediction</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ padding: '24px', minHeight: '100vh' }}>
          <Outlet />
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      Hackhaton ©{new Date().getFullYear()} Created by GROUP 8 IPSSI 
    </Footer>
  </Layout>
  );
};

export default Navbar;