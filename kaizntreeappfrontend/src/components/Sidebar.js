import React from 'react';
import './Sidebar.css'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faBox,
    faCogs,
    faUsers,
    faFileInvoiceDollar,
    faTruckMoving,
    faIndustry,
    faShoppingCart,
    faChartLine,
    faQuestionCircle,
    faProjectDiagram,
    faSignOutAlt,
    faUserCircle,
}

    from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <NavLink to="/" exact className="sidebar-item">
                <FontAwesomeIcon icon={faHome} /><span>Home</span>
            </NavLink>
            <NavLink to="/dashboard" className="sidebar-item">
                <FontAwesomeIcon icon={faBox} /><span>Items</span>
            </NavLink>
            <NavLink to="/stock" className="sidebar-item">
                <FontAwesomeIcon icon={faCogs} /><span>Stock</span>
            </NavLink>
            <NavLink to="/build" className="sidebar-item">
                <FontAwesomeIcon icon={faIndustry} /><span>Build</span>
            </NavLink>
            <NavLink to="/customers" className="sidebar-item">
                <FontAwesomeIcon icon={faUsers} /><span>Customers</span>
            </NavLink>
            <NavLink to="/sales-orders" className="sidebar-item">
                <FontAwesomeIcon icon={faFileInvoiceDollar} /><span>Sales Orders</span>
            </NavLink>
            <NavLink to="/suppliers" className="sidebar-item">
                <FontAwesomeIcon icon={faTruckMoving} /><span>Suppliers</span>
            </NavLink>
            <NavLink to="/manufacturers" className="sidebar-item">
                <FontAwesomeIcon icon={faIndustry} /><span>Manufacturers</span>
            </NavLink>
            <NavLink to="/purchase-orders" className="sidebar-item">
                <FontAwesomeIcon icon={faShoppingCart} /><span>Purchase Orders</span>
            </NavLink>
            <NavLink to="/reports" className="sidebar-item">
                <FontAwesomeIcon icon={faChartLine} /><span>Reports</span>
            </NavLink>
            <div className='sidebar-bottom-links'>
                <NavLink to="/help" className="sidebar-item">
                    <FontAwesomeIcon icon={faQuestionCircle} /><span>Help!</span>
                </NavLink>
                <NavLink to="/integrations" className="sidebar-item">
                    <FontAwesomeIcon icon={faProjectDiagram} /><span>Integrations</span>
                </NavLink>
                <NavLink to="/logout" className="sidebar-item">
                    <FontAwesomeIcon icon={faSignOutAlt} /><span>Logout</span>
                </NavLink>
                <NavLink to="/profile" className="sidebar-item">
                    <FontAwesomeIcon icon={faUserCircle} /><span>My Profile</span>
                </NavLink>
            </div>


        </div>
    );
};

export default Sidebar;



