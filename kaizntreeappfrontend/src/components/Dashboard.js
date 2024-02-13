import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import Sidebar from './Sidebar';
import Modal from 'react-modal';
import './Dashboard.css';
import { FaSortAmountDown, FaSortAmountUp, FaFilter, FaClipboardList, FaBoxes } from 'react-icons/fa'; // For sorting icons


Modal.setAppElement('#root');

const Dashboard = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({
        SKU: '',
        name: '',
        tags: [],
        category: '',
        in_stock: false,
        available_stock: ''
    });
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [inStockFilter, setInStockFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);
    const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
    const [newCategory, setNewCategory] = useState('');


    useEffect(() => {
        const params = new URLSearchParams();

        // Only append 'search' parameter if it has a value
        if (searchTerm) {
            params.append('search', searchTerm);
        }

        // Only append 'in_stock' parameter if it has been specifically set by the user
        if (inStockFilter) {
            params.append('in_stock', inStockFilter);
        }

        // Append 'order_by' and 'sort_order' parameters for sorting functionality
        // These parameters are always set, either to their default or user-modified values
        params.append('order_by', 'available_stock');
        params.append('sort_order', sortOrder);

        const fetchItems = async () => {
            try {
                const response = await axios.get(`https://manjju12.pythonanywhere.com/api/items/?${params.toString()}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                console.log(response.data);
                setItems(response.data);
                const responseCategories = await axios.get(`https://manjju12.pythonanywhere.com/api/categories/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                // console.log(responseCategories.data);
                setCategories(responseCategories.data);

                const responseTags = await axios.get(`https://manjju12.pythonanywhere.com/api/tags/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                // console.log(responseTags.data);
                setTags(responseTags.data);
            }


            catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, [searchTerm, inStockFilter, sortOrder]);


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleInStockChange = (e) => {
        setInStockFilter(e.target.value);
    };

    const toggleSortOrder = () => {
        setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleNewItemChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'tags') {
            // Adjust for select multiple, which gives a string of values
            const values = Array.from(e.target.selectedOptions, option => option.value);
            setNewItem(prev => ({ ...prev, [name]: values }));
        } else {
            setNewItem(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        }
        console.log(name, value, newItem);
    };

    const handleNewCategoryChange = (e) => {
        setNewCategory(e.target.value);
    }

    const handleNewCategorySubmit = async (e) => {
        e.preventDefault();
        try {
            const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
            // console.log(newCategory);
            const response = await axios.post('https://manjju12.pythonanywhere.com/api/categories/', { name: newCategory }, { headers });
            setCategories([...categories, response.data]);
            setIsNewCategoryModalOpen(false);
        } catch (error) {
            console.error('Error adding new item:', error);
        }
    }

    const handleNewItemSubmit = async (e) => {
        e.preventDefault();
        // Preparing data for submission
        const submitData = {
            ...newItem,
            tags: newItem.tags.map(item => parseInt(item)),
            category: parseInt(newItem.category),
            available_stock: parseInt(newItem.available_stock),
        };

        try {
            const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
            console.log(submitData);
            const response = await axios.post('https://manjju12.pythonanywhere.com/api/items/', submitData, { headers });
            setItems([...items, response.data]);
            setIsNewItemModalOpen(false);
        } catch (error) {
            console.error('Error adding new item:', error);
        }
    };

    return (
        <div className="dashboard">
            <Sidebar />

            <div className="main-dashboard">
                <div className="dashboard-header">
                    <div className="header-left">
                        <h1>Item Dashboard</h1>
                        <p>All items</p>
                        <button className="new-item-btn" onClick={() => setIsNewCategoryModalOpen(true)}>NEW ITEM CATEGORY</button>
                    </div>
                    <div className="header-right">
                        <div className="total-categories">
                            <FaClipboardList className="icon" />
                            <p>Total Categories</p>
                            <p className="count">4</p>
                        </div>
                        <div className="separator"></div>
                        <div className="total-items">
                            <FaBoxes className="icon" />
                            <p>Total Items</p>
                            <p className="count">21</p>
                        </div>
                    </div>
                </div>

                <Modal className="modal-category" isOpen={isNewCategoryModalOpen} onRequestClose={() => setIsNewCategoryModalOpen(false)}>
                    <form onSubmit={handleNewCategorySubmit} className="modal-form">
                        <p>Add New Category</p>
                        <input
                            className="modal-input"
                            name="category"
                            value={newCategory}
                            onChange={handleNewCategoryChange}
                            placeholder="New Category"
                            required
                        />

                        <button className="modal-submit-btn" type="submit">Submit</button>
                    </form>
                </Modal>


                <Modal className="modal" isOpen={isNewItemModalOpen} onRequestClose={() => setIsNewItemModalOpen(false)} >
                    <form onSubmit={handleNewItemSubmit}>
                        <h2>Add New Item</h2>

                        <input name="SKU" value={newItem.SKU} onChange={handleNewItemChange} placeholder="SKU" required />
                        <input name="name" value={newItem.name} onChange={handleNewItemChange} placeholder="Name" required />
                        <select multiple name="tags" value={newItem.tags} onChange={handleNewItemChange}>
                            {tags.map(tag => (
                                <option key={tag.id} value={tag.id}>{tag.name}</option>
                            ))}
                        </select>
                        <select name="category" value={newItem.category} onChange={handleNewItemChange}>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        <label className='in-stock'> In Stock: <input name="in_stock" type="checkbox" checked={newItem.in_stock} onChange={handleNewItemChange} />
                        </label>


                        <input name="available_stock" type="number" value={newItem.available_stock} onChange={handleNewItemChange} placeholder="Available Stock" required />
                        <button type="submit">Submit</button>
                    </form>
                </Modal>



                <div className="controls">
                    <button onClick={() => setIsNewItemModalOpen(true)} className="control-button new-item-btn">
                        New Item
                    </button>

                    <button className="control-button options-btn">
                        Options
                    </button>
                    <SearchBar value={searchTerm} onChange={handleSearchChange} />
                    <div className="filter-control">
                        <FaFilter />
                        <select value={inStockFilter} onChange={handleInStockChange} title="Filter by stock">
                            <option value="">All</option>
                            <option value="true">In Stock</option>
                            <option value="false">Out of Stock</option>
                        </select>
                    </div>
                    <button onClick={toggleSortOrder} className="control-button new-item-btn">
                        {sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
                    </button>
                </div>


                <div className='table'>
                    <table>
                        <thead>
                            <tr>
                                <th><input type="checkbox" /></th>
                                <th>SKU</th>
                                <th>Name</th>
                                <th>Tags</th>
                                <th>Category</th>
                                <th>In Stock</th>
                                <th>Available Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item.id}>
                                    <td><input type="checkbox" /></td>
                                    <td>{item.SKU}</td>
                                    <td>{item.name}</td>
                                    <td>{item.tags.join(', ')}</td>
                                    <td>{item.category.name}</td>
                                    <td>{item.in_stock ? 'Yes' : 'No'}</td>
                                    <td>{item.available_stock}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
