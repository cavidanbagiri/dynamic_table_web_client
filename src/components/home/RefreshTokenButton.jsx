import { useDispatch, useSelector } from 'react-redux';
import UserService from '../../service/UserService';

const RefreshTokenButton = () => {
    const dispatch = useDispatch();
    const refreshPending = useSelector((state) => state.loginRegisterSlice.refreshPending);
    const refreshError = useSelector((state) => state.loginRegisterSlice.refreshError);

    const handleRefresh = async () => {
        const result = await dispatch(UserService.refresh());
        if (UserService.refresh.fulfilled.match(result)) {
            console.log('Token refreshed successfully:', result.payload);
        } else {
            console.error('Failed to refresh token:', result.payload);
        }
    };

    return (
        <div>
            <button onClick={handleRefresh} disabled={refreshPending}>
                {refreshPending ? 'Refreshing...' : 'Refresh Token'}
            </button>
            {refreshError && <p style={{ color: 'red' }}>{refreshError}</p>}
        </div>
    );
};

export default RefreshTokenButton;