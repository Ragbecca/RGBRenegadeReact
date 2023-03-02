import React, { useContext, useEffect, useState } from 'react';
import { test } from '../../../api/AuthApi';
import AuthContext from '../../../context/AuthContext';
import './Profile.css';

const Profile = () => {
    const authContext = useContext(AuthContext);

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (authContext.getUser() == null) {
            return;
        }
        test(authContext.getUser()).then(response => console.log(response));
        setLoading(false);
    }, [authContext.user])

    if (isLoading) {
        return (
            <div className="app-body">
                <div className="profile-container">
                    <div className="container">
                        <div className="profile-info">
                            <div className="profile-avatar">
                                Loading...
                            </div>
                            <div className="profile-name">
                                Loading...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="app-body">
            <div className="profile-container">
                <div className="container">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            {
                                authContext.getUser().imgUrl ? (
                                    <img src={authContext.getUser().imgUrl} alt={authContext.getUser().name} />
                                ) : (
                                    <div className="text-avatar">
                                        <span>{authContext.getUser().name && authContext.getUser().name[0]}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="profile-name">
                            <h2>{authContext.getUser().name}</h2>
                            <p className="profile-email">{authContext.getUser().username}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile