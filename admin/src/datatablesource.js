export const userColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'user',
        headerName: 'User',
        width: 230,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img
                        className="cellImg"
                        src={
                            params.row.img ||
                            'https://scontent-itm1-1.xx.fbcdn.net/v/t39.30808-6/292466995_5456558047772438_3214686028226935866_n.jpg?stp=cp1_dst-jpg&_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=0hpGJQCUXiIAX8mm3ME&tn=TiQkjMHCxQ3mfxb3&_nc_ht=scontent-itm1-1.xx&oh=00_AT9WpF437NR-1cznUHQ8QiVgRfrH-z4I_JqhTcvBPkHr3A&oe=63138367'
                        }
                        alt="avatar"
                    />
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
