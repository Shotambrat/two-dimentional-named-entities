import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Styles/NamedEnt.css';
import axios from 'axios';
import Model from './Model';

const API_URL = 'http://localhost:3000/api/data';



export default function Table () {
    const dispatch = useDispatch();
    const data = useSelector(state => state.data);
    const [rows, setRows] = useState(data)
    const [editableRowId, setEditableRowId] = useState(null);
    const [modelActive, setModelActive] = useState(true);

    const editRow = (id) => ({
        type: 'EDIT_ROW',
        payload: id
    });

    const saveRow = () => ({
        type: 'SAVE_ROW'
    });

    const updateRow = (id, key, value) => ({
        type: 'UPDATE_ROW',
        payload: { id, key, value }
    });

        // этот код чтобы если список переполнит появился скролл
        useEffect(() => {
            const tableContainer = document.getElementById('table-container')
            const content = document.querySelector('.content');
    
            if (content.offsetHeight > tableContainer.offsetHeight) {
            tableContainer.classList.add('overflowY')
            } else {
                tableContainer.classList.remove('overflowY') // убрать скролл
            }
        }, [data])
    
    const handleAddRow = () => {
        const newRow = { id: rows.length + 1, name: "", coordinate: "", labels: []};
        setRows([...rows, newRow])

        dispatch({type: "ADD_ROW", payload: rows})
    };
    
    const handleDeleteRow = (id) => {
        const newRow = rows.filter(item => item.id !== id)
        setRows(newRow);

        dispatch({type:'REMOVE_ROW', payload: id})
    };

    const handleInputChange = (event, id, key) => {
        const newData = rows.map((row) => {
            if (row.id === id) {
                return { ...row, [key]: event.target.value };
            }
            return row;
        });
        // const res = await axios.post(API_URL, newData)
        setRows(newData);
        dispatch(updateRow(id, key, event.target.value));
    };
    
    const handleEditClick = (id) => {
        setEditableRowId(id);
        dispatch(editRow(id));
    };
    
    const handleSaveClick = () => {
        setEditableRowId(null);
        dispatch(saveRow());
    };

    return (
        <>
        <div id="table-container" className='old-class'>
            <table className="content">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>coordinate(2d)</th>
                        <th>Labels</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(item => (
                    <tr key={item.id}>
                        <td>
                            <input type="text" value={item.name} placeholder='Entities name' onChange={(event) => handleInputChange(event, item.id, "name")} disabled={editableRowId !== item.id}/>
                        </td>
                        <td>
                            <div className='coordinateDiv'>
                                X:<input className='coordinateInp' type="number" value={item.coordinate.x} onChange={(event) => handleInputChange(event, item.id, "coordinate")} disabled={editableRowId !== item.id}/>,
                                Y:<input className='coordinateInp' type="number" value={item.coordinate.y} onChange={(event) => handleInputChange(event, item.id, "coordinate")} disabled={editableRowId !== item.id}/>
                            </div>
                        </td>
                        <td id="label-container">
                            <div id="label-content">
                                <input type="text" value={item.labels.toString()} onChange={(event) => handleInputChange(event, item.id, "labels")} disabled={editableRowId !== item.id}/>
                            </div>
                        </td>
                        <td>
                            <button className="delete-button" onClick={() => handleDeleteRow(item.id)}>
                                Delete
                            </button>
                        </td>
                        <td>
                            {editableRowId === item.id ? (
                                <button className='change-button' onClick={handleSaveClick}>Save</button>
                            ) : (
                                <button className='change-button' onClick={() => handleEditClick(item.id)}>Edit</button>
                            )}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className='but-container'>
            <button className="button button1" onClick={handleAddRow}>Add table row</button>
        </div>
        <button className="modal-button" onClick={() => setModelActive(true)}>CANVAS</button>
        <Model data={rows} active={modelActive} setActive={setModelActive}/>
        </>
    )
}