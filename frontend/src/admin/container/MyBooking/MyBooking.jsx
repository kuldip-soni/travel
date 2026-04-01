import React from 'react';
import { useDispatch } from 'react-redux';
import { getmyBooking } from '../../../redux/slice/bookpackage.slice';

function MyBooking(props) {
    const dispatch = useDispatch();
    useEffect(() => {

        dispatch((getmyBooking()));


    }, []);

    const mybook = useSelector(state => state.bookpackage);
    console.log(mybook.MyBooking);
    
    return (
        <div>
            <h2>My booking</h2>
            {mybook.MyBooking?.map((v)=>(
                <>
                <p>{v.name}</p>
                <p>{v.email}</p>
                </>

            )
        )}
         
        </div>
    );
}

export default MyBooking;