
import { useState } from 'react'

import { useDispatch } from 'react-redux';

import Checkbox from '@mui/material/Checkbox';

import { changeHeaderCondition } from '../../store/table_store';

function TableHeadersItemComponent({header, actualKey, value}) {

    const dispatch = useDispatch();

    const [checked, setChecked] = useState(value);

    const handleChange = (event) => {
      setChecked(event.target.checked);
      dispatch(changeHeaderCondition({key: actualKey, value: event.target.checked}));
    };

    return (
        <div className='flex flex-row items-center bg-gray-100 mt-1 -p-1 hover:cursor-pointer duration-200 hover:bg-gray-200 rounded-md'>
            <Checkbox
                size="small"
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
            />
            <span>
                {header}
            </span>
        </div>
    )
}

export default TableHeadersItemComponent