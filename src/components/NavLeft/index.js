import React from 'react';
import { Menu } from 'antd';
import MenuConfig from '../../config/menuConfig';
import './index.less';
import { NavLink } from 'react-router-dom';
import LogoSvg from '../../../public/logo-ant.svg';
const { SubMenu } = Menu;

class NavLeft extends React.Component {

  componentWillMount() {
    const menuTreeNode = this.renderMenu(MenuConfig);
    this.setState({
      menuTreeNode
    })
  }
  //菜单渲染 data：  递归
  renderMenu = (data) => {
    return data.map((item) => {
      //如果有子节点  继续遍历渲染
      if (item.children) {
        return (
          <SubMenu key={item.key} title={item.title} >
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return <Menu.Item title={item.title} key={item.key} onClick={() => this.handleClick(item.title)} >
        <NavLink to={item.key}>{item.title}</NavLink>
      </Menu.Item>
    })
  }
  handleClick = (title) => {

  }
  render() {
    const { tabName } = this.props;
    return (
      <div>
        <div className="logo">
          <img src={LogoSvg} alt="logo" title="首页" />
          <h1>共享单车管理平台</h1>
        </div>
        <Menu theme="light" mode="inline">
          {this.state.menuTreeNode}
        </Menu>

      </div >
    )
  }

}
export default NavLeft;