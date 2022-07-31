import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const createOrGetUser = async (res) => {
    const { name, picture, sub } = jwt_decode(res.credential)
    const user = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture
    }
    return(user);
    // await axios.post('http://localhost:3000/api/auth', user)
}