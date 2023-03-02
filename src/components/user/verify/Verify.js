import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { verifyEmail } from '../../../api/AuthApi';
import { toast } from 'react-hot-toast';

const Verify = () => {
    const location = useLocation();
    const nav = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    function getUrlParameter(name) {
        name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const id = getUrlParameter('id');

    useEffect(() => {
        async function verifyEmailTask() {
            await verifyEmail(id).then(response => {
                setHasError(false);
            }).catch(error => {
                setHasError(true);
                toast(error.response.data.message);
            });
            setLoading(false);
        }
        if (id) {
            verifyEmailTask();
        } else {
            setHasError(false);
            setLoading(false);
        }
    }, [id])

    useEffect(() => {
        if (!isLoading) {
            if (hasError) {
                return nav("/");
            } else {
                return nav("/login");
            }
        }
    }, [isLoading])
}

export default Verify;