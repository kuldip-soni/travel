
const { error } = require("console");
const pool = require("../db/mysql");
const fs = require('fs');


const getpackage = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM package');

        res.status(200).json({
            sucess: true,
            data: rows,
            message: "package is add sucessfuly"
        })




    } catch (error) {
        res.status(500).json({
            sucess: true,
            data: null,
            message: "internal server error (getpackage)" + error

        })

    }


}

const addpackage = async (req, res) => {
    try {
        // console.log("req.body");
        //console.log("dddddd",req.body, req.file.path);
        const { location_id, name, duration, price, itineary_id, image } = req.body;
        console.log(name, duration, price, image);

        const [rows, fields, result] = await pool.query("INSERT INTO package (location_id,name,duration,price,itineary_id,image) VALUES(?,?,?,?,?,?)",
            [location_id, name, duration, price, itineary_id, req.file.path]

        )

        res.status(200).json({
            sucess: true,
            data: { ...req.body, id: rows.insertId, image: req.file.path },
            message: "package is add sucessfuly"
        })



        console.log(rows, fields, result);


    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (getpackage)" + error
        })

    }

}

const putpackage = async (req, res) => {
    try {
        console.log("req.body");
        // console.log(req.body, req.file.path);

        const { location_id, name, duration, price, itineary_id } = req.body;
        const packageId = req.params.id;
        console.log(name, duration, price, packageId);

        const [rows] = await pool.query(`SELECT * FROM package WHERE id=${packageId}`);
        let fileimg = '';

        if (req.file) {

            fs.unlinkSync(rows[0].image, (error) => {
                console.log(error);

            })
            fileimg = req.file.path;
        } else {
            fileimg = rows[0].image
        }


        await pool.query("UPDATE  package  SET location_id=?, name=?, duration=?, price=?, itineary_id=?, image=? WHERE id=?",
            [location_id, name, duration, price, itineary_id, fileimg, packageId]

        )

        res.status(200).json({
            sucess: true,
            data: { location_id, id: packageId, name, duration, price, itineary_id, image: fileimg, id: packageId },
            message: "package is update sucessfuly"

        })
        console.log(fields, result);



    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (putpackage)" + error
        })

    }

}

const delpackage = async (req, res) => {
    try {
        // const { city, state, country, image } = req.body;
        const packageId = req.params.id;
        // console.log(packageId);

        const [rows] = await pool.query(`SELECT * FROM package WHERE id=${packageId}`);

        fs.unlinkSync(rows[0].image, (error) => {
            console.log(error);

        })

        await pool.query("DELETE FROM package WHERE id=?",
            [packageId]

        )

        res.status(200).json({
            sucess: true,
            data: null,
            message: "package is deleated sucessfuly"

        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (delpackage)" + error
        })

    }

}

const bookCustomized = async (req, res) => {
    try {
        console.log("ookok");
        
        const {user_id, location_id, travel_date, passengers  } = req.body;

        console.log(user_id, location_id, travel_date, passengers );
        
        
        // const {user_id, travel_date,name,age,selectedTransportId, transportQty, selectedHotelId, hotelQty, checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount} = req.body;
        // console.log(transportQty, selectedHotelId, hotelQty);


        console.log(req.body);
        
        const [bookingResult] = await pool.query(
            `INSERT INTO booking (
                user_id,
                location_id,
                travel_date,
                passenger,
                type
            ) VALUES (?,?,?,?,?)
            `,
            [user_id, location_id, travel_date, passengers?.length, "customized_package" ]
        );

        console.log(bookingResult.insertId);
        


        // const [rows, fields, result] = await pool.query("INSERT INTO booking (travel_date,name,age,selectedTransportId,transportQty,selectedHotelId,hotelQty,checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        //     [travel_date,name,age,selectedTransportId, transportQty, selectedHotelId, hotelQty, checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount]

        // )
        //  const [data1] = await pool.query("INSERT INTO payment (travel_date,name,age,selectedTransportId,transportQty,selectedHotelId,hotelQty,checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        //     [travel_date,name,age,selectedTransportId, transportQty, selectedHotelId, hotelQty, checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount]

        // )

        //   const [data2] = await pool.query("INSERT INTO transport (travel_date,name,age,selectedTransportId,transportQty,selectedHotelId,hotelQty,checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        //     [travel_date,name,age,selectedTransportId, transportQty, selectedHotelId, hotelQty, checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount]

        // )

        // const [data3] = await pool.query("INSERT INTO hotel (travel_date,name,age,selectedTransportId,transportQty,selectedHotelId,hotelQty,checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        //     [travel_date,name,age,selectedTransportId, transportQty, selectedHotelId, hotelQty, checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount]

        // )

        //  const [data4] = await pool.query("INSERT INTO restaurant (travel_date,name,age,selectedTransportId,transportQty,selectedHotelId,hotelQty,checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        //     [travel_date,name,age,selectedTransportId, transportQty, selectedHotelId, hotelQty, checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount]

        // )

        


        // res.status(200).json({
        //     sucess: true,
        //     data: { ...req.body, id: rows.insertId },
        //     message: "bookCustomized is add sucessfuly"
        // })



        // console.log(rows, fields, result,data1,data2,data3,data4);


        


    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            data: null,
            message: "internal server error (bookCustomized)" + error
        })

    }

//     try {
        
//         const { travel_date,name,age,selectedTransportId, transportQty, selectedHotelId, hotelQty, checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount} = req.body;
//         //console.log(transportQty, selectedHotelId, hotelQty);

//         const [rows, fields, result] = await pool.query("INSERT INTO payment (travel_date,name,age,selectedTransportId,transportQty,selectedHotelId,hotelQty,checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
//             [travel_date,name,age,selectedTransportId, transportQty, selectedHotelId, hotelQty, checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount]

//         )

        


//         res.status(200).json({
//             sucess: true,
//             data: { ...req.body, id: rows.insertId },
//             message: "bookCustomized is add sucessfuly"
//         })



//         console.log(rows, fields, result);


        


//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             sucess: false,
//             data: null,
//             message: "internal server error (bookCustomized)" + error
//         })

//     }

    
//      try {
        
//         const { travel_date,name,age,selectedTransportId, transportQty, selectedHotelId, hotelQty, checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount} = req.body;
//         //console.log(transportQty, selectedHotelId, hotelQty);

//         const [rows, fields, result] = await pool.query("INSERT INTO transport (travel_date,name,age,selectedTransportId,transportQty,selectedHotelId,hotelQty,checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
//             [travel_date,name,age,selectedTransportId, transportQty, selectedHotelId, hotelQty, checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount]

//         )

        


//         res.status(200).json({
//             sucess: true,
//             data: { ...req.body, id: rows.insertId },
//             message: "bookCustomized is add sucessfuly"
//         })



//         console.log(rows, fields, result);


        


//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             sucess: false,
//             data: null,
//             message: "internal server error (bookCustomized)" + error
//         })

//     }



// try {
        
//         const { travel_date,name,age,selectedTransportId, transportQty, selectedHotelId, hotelQty, checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount} = req.body;
//         //console.log(transportQty, selectedHotelId, hotelQty);

//         const [rows, fields, result] = await pool.query("INSERT INTO hotel (travel_date,name,age,selectedTransportId,transportQty,selectedHotelId,hotelQty,checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
//             [travel_date,name,age,selectedTransportId, transportQty, selectedHotelId, hotelQty, checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount]

//         )

        


//         res.status(200).json({
//             sucess: true,
//             data: { ...req.body, id: rows.insertId },
//             message: "bookCustomized is add sucessfuly"
//         })



//         console.log(rows, fields, result);


        


//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             sucess: false,
//             data: null,
//             message: "internal server error (bookCustomized)" + error
//         })

//     }


//     try {
        
//         const { travel_date,name,age,selectedTransportId, transportQty, selectedHotelId, hotelQty, checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount} = req.body;
//         //console.log(transportQty, selectedHotelId, hotelQty);

//         const [rows, fields, result] = await pool.query("INSERT INTO restaurant (travel_date,name,age,selectedTransportId,transportQty,selectedHotelId,hotelQty,checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
//             [travel_date,name,age,selectedTransportId, transportQty, selectedHotelId, hotelQty, checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount]

//         )

        


//         res.status(200).json({
//             sucess: true,
//             data: { ...req.body, id: rows.insertId },
//             message: "bookCustomized is add sucessfuly"
//         })



//         console.log(rows, fields, result);


        


//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             sucess: false,
//             data: null,
//             message: "internal server error (bookCustomized)" + error
//         })

//     }
}




module.exports = {
    getpackage,
    addpackage,
    putpackage,
    delpackage,
    bookCustomized	


}