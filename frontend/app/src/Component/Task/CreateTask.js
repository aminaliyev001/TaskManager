import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select'; 

const CreateTask = ({ close }) => {
    const [name, setName] = useState('');
    const [detail, setDetail] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [deadLine, setDeadLine] = useState('');
    const [executiveUser, setExecutiveUser] = useState(null);
    const [elage, setElage] = useState('');
    const { themeId } = useParams();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [users, setUsers] = useState([]); 
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`https://localhost:7146/api/UserTheme/Theme/${themeId}/Users`);
                console.log('Users in theme', res.data.data);
                setUsers(res.data.data);
                
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [themeId]);

    const handleSubmit = async () => {
        try {
            const payload = {
                taskName: name,
                taskDescription: detail,
                status: status,
                priority: priority,
                deadLine: deadLine || null,
                contact: elage,
                themeId: parseInt(themeId),
                executiveUserId: executiveUser ? parseInt(executiveUser) : null,
                userId: selectedUsers.map((user) => parseInt(user.value)),
            };
            console.log(payload)
            await axios.post('https://localhost:7146/api/Task', payload);
            window.location.reload()
            close();
        } catch (error) {
            console.error('Error creating task:', error.response.data.errors);
            setError(error.response?.data?.errors || {});
        }
    };

    const userOptions = users.map((user) => ({
        value: user.userId,
        label: user.userName,
    }));

    return (
        <section className="popup-overlay">
            <div className="popup-container">
                <div className="popup-header">
                    <h3>Task Yarat</h3>
                    <i className="fa-solid fa-xmark" onClick={close}></i>
                </div>
                <div className="popup-content">
                    <div className="input-group">
                        <div className="input-half">
                            <label>Task Name</label>
                            <input
                                type="text"
                                placeholder="Task Name"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <span className={`errors ${error?.TaskName?.[0] ? 'visible' : ''}`}>
                                {error?.TaskName?.[0]}
                            </span>
                        </div>
                        <div className="input-half">
                            <label>DeadLine</label>
                            <input
                                type="date"
                                placeholder="DeadLine"
                                onChange={(e) => setDeadLine(e.target.value)}
                            />
                            <span className={`errors ${error?.DeadLine?.[0] ? 'visible' : ''}`}>
                                {error?.DeadLine?.[0]}
                            </span>
                        </div>
                    </div>

                    <div className="input-group">
                        <div className="input-half">
                            <label>Priority</label>
                            <select id="Priority" onChange={(e) => setPriority(e.target.value)}>
                                <option value="">Select</option>
                                <option value="Yüksək">Yüksək</option>
                                <option value="Orta">Orta</option>
                                <option value="Aşağı">Aşağı</option>
                                <option value="Ən Yüksək">Ən Yüksək</option>
                            </select>
                            <span className={`errors ${error?.Priority?.[0] ? 'visible' : ''}`}>
                                {error?.Priority?.[0]}
                            </span>

                        </div>
                        <div className="input-half">
                            <label>Status</label>
                            <select id="Status" onChange={(e) => setStatus(e.target.value)}>
                                <option value="">Select</option>
                                <option value="Prosesdə">Prosesdə</option>
                                <option value="Riskdə">Riskdə</option>
                                <option value="Gecikir">Gecikir</option>
                            </select>
                            <span className={`errors ${error?.Status?.[0] ? 'visible' : ''}`}>
                                {error?.Status?.[0]}
                            </span>
                        </div>
                        <div className="input-half">
                            <label>Əlaqə</label>
                            <input
                                type="text"
                                placeholder="Phone"
                                onChange={(e) => setElage(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <div className="input-half">
                            <label>Executive User</label>
                            <select id="ExecutiveUser" onChange={(e) => setExecutiveUser(e.target.value)}>
                                <option value="">Select</option>
                                {users.map((user) => (
                                    <option key={user.userId} value={user.userId}>
                                        {user.userName}
                                    </option>
                                ))}
                            </select>
                            <span className={`errors ${error?.ExecutiveUserId?.[0] ? 'visible' : ''}`}>
                                {error?.ExecutiveUserId?.[0]}
                            </span>
                        </div>
                        <div className="input-half">
                            <label>Select Users</label>
                            <Select
                                options={userOptions}
                                isMulti={true}
                                value={selectedUsers}
                                onChange={(selected) => setSelectedUsers(selected)}
                                placeholder="Select Users"
                                classNamePrefix="react-select"
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <div className="input-half">
                            <label>Task Description</label>
                            <textarea
                                placeholder="Details Content"
                                onChange={(e) => setDetail(e.target.value)}
                            />
                            <span className={`errors ${error?.TaskDescription?.[0] ? 'visible' : ''}`}>
                                {error?.TaskDescription?.[0]}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="popup-footer">
                    <button className="cancel-btn" onClick={close}>
                        İmtina et
                    </button>
                    <button className="submit-btn" onClick={handleSubmit}>
                        Təsdiq et
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CreateTask;
