import './newHotel.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState } from 'react';
import { hotelInputs } from '../../formSource';
import useFetch from '../../hooks/userFetch';
import axios from 'axios';
import { gridColumnsTotalWidthSelector } from '@mui/x-data-grid';
import { containerClasses } from '@mui/system';

const NewHotel = () => {
    const [files, setFile] = useState('');
    const [info, setInfo] = useState({});
    const [rooms, setRooms] = useState([]);

    console.log('object values', Object.values({ name: 'son', age: 18 }));

    const { data, loading, error } = useFetch(`http://localhost:8800/api/rooms`);
    console.log('info', info);
    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const handleSelect = (e) => {
        //tranforms id from selectedOptions that we set key attribute for it
        const value = Array.from(e.target.selectedOptions, (option) => option.value);
        console.log('value', value);
        setRooms(value);
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            console.log(Object.values(files));
            const list = await Promise.all(
                Object.values(files).map(async (file) => {
                    const data = new FormData();
                    data.append('file', file);
                    data.append('upload_preset', 'upload');
                    const uploadRes = await axios.post('https://api.cloudinary.com/v1_1/lamadev/image/upload', data);

                    const { url } = uploadRes.data;
                    return url;
                }),
            );
            console.log('info', info);
            const newhotel = {
                ...info,
                rooms,
                photos: files,
            };
            console.log('newHotel', newhotel);
            await axios.get('http://localhost:8800/api/hotels', newhotel);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Add New Product</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                files
                                    ? URL.createObjectURL(files)
                                    : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                            }
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: 'none' }}
                                />
                            </div>

                            {hotelInputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                        id={input.id}
                                        onChange={handleChange}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                    />
                                </div>
                            ))}

                            <div className="formInput">
                                <span>
                                    <label>Featured</label>
                                    <select id="featured" onChange={handleChange}></select>
                                </span>
                            </div>
                            <div className="selectRooms">
                                <label>Rooms</label>
                                <select multiple id="rooms" onChange={handleSelect}>
                                    {loading
                                        ? 'loading'
                                        : data &&
                                          data.map((room) => (
                                              <option key={room._id} value={room._id}>
                                                  {room.title}
                                              </option>
                                          ))}
                                </select>
                            </div>
                            <button onClick={handleClick}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewHotel;
