export const userColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'user',
        headerName: 'User',
        width: 230,
        img: [
            'https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-xinh-cuc-dep.jpg',
            'https://icdn.dantri.com.vn/thumb_w/640/2020/12/16/ngam-dan-hot-girl-xinh-dep-noi-bat-nhat-nam-2020-docx-1608126694049.jpeg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiiKrCa3Qw7-51XCIhUJPjdW1AFP--qyTz_Q&usqp=CAU',
        ],
        renderCell: (params) => {
            const randomNum = Math.floor(Math.random() * userColumns[1].img.length);

            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.img || userColumns[1].img[randomNum]} alt="avatar" />
                    {params.row.username}
                </div>
            );
        },
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 230,
    },

    {
        field: 'country',
        headerName: 'Country',
        width: 100,
    },
    {
        field: 'city',
        headerName: 'City',
        width: 100,
    },
    {
        field: 'phone',
        headerName: 'Phone',
        width: 100,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 160,
        renderCell: (params) => {
            return <div className={`cellWithSatus ${params.row.status}`}>{params.row.status}</div>;
        },
    },
];

//temporary data

export const hotelColumns = [
    { field: '_id', headerName: 'ID', width: 250 },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
    },
    {
        field: 'type',
        headerName: 'Type',
        width: 100,
    },
    {
        field: 'title',
        headerName: 'Title',
        width: 230,
    },
    {
        field: 'city',
        headerName: 'City',
        width: 100,
    },
];

export const roomColumns = [
    { field: '_id', headerName: 'ID', width: 70 },
    {
        field: 'title',
        headerName: 'Title',
        width: 230,
    },
    {
        field: 'desc',
        headerName: 'Description',
        width: 200,
    },
    {
        field: 'price',
        headerName: 'Price',
        width: 100,
    },
    {
        field: 'maxPeople',
        headerName: 'Max People',
        width: 100,
    },
];
