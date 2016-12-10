import React from 'react';
import { Button } from 'antd';
import styles from './NavBar.less';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {expanded: false};
    }

    toggle = () => {
        this.setState((prev) => {
            return {expanded: !prev.expanded};
        });
    }

    render() {
        return (
            <div>
                <nav className={this.state.expanded ? `${styles.navBarExpanded} ${styles.navBar}`: styles.navBar}>
                    {this.props.children}
                </nav>
                <div className={styles.expander}>
                    <Button type="ghost" size="large" shape="circle" icon={this.state.expanded ? "menu-fold" : "menu-unfold"} onClick={this.toggle} />
                </div>
                <div className={ this.state.expanded ? styles.dimmedBackground : `${styles.dimmedBackground} ${styles.hidden}` } onClick={this.toggle}></div>
            </div>
        );
    }
}

export default NavBar;
