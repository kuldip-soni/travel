
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

        const { user_id, location_id, travel_date, passengers, transaction_id, mode, date, amount, selectedHotelId, hotelQty, checkIn, checkOut, selectedTransportId, transportQty, from, to, selectedRestaurantId, restaurantQty } = req.body;




        const [hotelData] = await pool.query("SELECT * FROM hotel WHERE id=?", [selectedHotelId]);

        console.log("hotelData", selectedHotelId, hotelData, hotelData[0]?.vendor_id, hotelData[0]?.service_id, hotelData[0]?.amount);

        const [transportData] = await pool.query("SELECT * FROM transport WHERE id=?", [selectedTransportId]);

        console.log("transportData", selectedTransportId, transportData, transportData[0]?.vendor_id, transportData[0]?.service_id, transportData[0]?.amount);

        const [restaurantData] = await pool.query("SELECT * FROM restaurant WHERE id=?", [selectedRestaurantId]);

        console.log("restaurantData", selectedRestaurantId, restaurantData, restaurantData[0]?.vendor_id, restaurantData[0]?.service_id, restaurantData[0]?.amount);


        // const {user_id, travel_date,name,age,selectedTransportId, transportQty, selectedHotelId, hotelQty, checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount} = req.body;
        // console.log(transportQty, selectedHotelId, hotelQty);


        console.log(req.body);

        const [bookingResult] = await pool.query(
            `INSERT INTO booking (
            user_id,
            location_id,
            travel_date,
            passenger,
            type,
            amount
           ) VALUES (?,?,?,?,?,?)`,
            [user_id, location_id, travel_date, passengers.length, "customized_package", amount]
        );

        const booking_id = bookingResult.insertId;

        const passengerValues = passengers.map(p => [
            booking_id,
            p.name,
            p.age
        ]);

        await pool.query(
            "INSERT INTO passenger (booking_id, name, age) VALUES ?",
            [passengerValues]
        );




        const [paymentResult] = await pool.query(
            `INSERT INTO payment (
                user_id,
                booking_id,
                transaction_id,
                mode,
                date,
                amount
            ) VALUES (?,?,?,?,?,?)
            `,
            [user_id, bookingResult.insertId, transaction_id, mode, date, amount]
        );

        console.log(paymentResult.insertId);


        if (selectedTransportId) {
                    const [transportResult] = await pool.query(
            `INSERT INTO transport (
        location_id,
        booking_id,
        vendor_id,
        service_id,
        \`from\`,
        \`to\`,
        datetime,
        passenger,
        amount,
        type
    ) VALUES (?,?,?,?,?,?,?,?,?,?)
    `,
            [
                location_id,
                bookingResult.insertId,
                transportData[0]?.vendor_id,
                transportData[0]?.service_id,
                transportData[0]?.from,
                transportData[0]?.to,
                date,
                passengers?.length,
                transportData[0]?.amount * transportQty,
                "customized_package"
            ]
        );

        console.log(transportResult.insertId);
        }


        if (selectedHotelId) {
            const [hotelResult] = await pool.query(
            `INSERT INTO hotel (
                location_id,
                booking_id,
                vendor_id,
                service_id,
                checkin,
                checkout,
                datetime,
                passenger,
                amount,
                type
            ) VALUES (?,?,?,?,?,?,?,?,?,?)
            `,
            [
                location_id,
                bookingResult.insertId,
                hotelData[0]?.vendor_id,
                hotelData[0]?.service_id,
                checkIn,
                checkOut,
                date,
                passengers?.length,
                hotelData[0]?.amount * hotelQty,
                "customized_package"
            ]
        );

        console.log(hotelResult.insertId);
        }


        if (selectedRestaurantId) {
                    const [restaurantResult] = await pool.query(
            `INSERT INTO restaurant (
                location_id,
                booking_id,
                vendor_id,
                service_id,
                datetime,
                meals,
                passenger,
                amount,
                type
            ) VALUES (?,?,?,?,?,?,?,?,?)
            `,
            [
                location_id,
                bookingResult.insertId,
                restaurantData[0]?.vendor_id,
                restaurantData[0]?.service_id,
                date,
                restaurantQty,

                passengers?.length,
                restaurantData[0]?.amount * restaurantQty,
                "customized_package"
            ]
        );

        console.log(restaurantResult.insertId);
        }














        //   const [data2] = await pool.query("INSERT INTO transport (travel_date,name,age,selectedTransportId,transportQty,selectedHotelId,hotelQty,checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        //     [travel_date,name,age,selectedTransportId, transportQty, selectedHotelId, hotelQty, checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount]

        // )

        // const [data3] = await pool.query("INSERT INTO hotel (travel_date,name,age,selectedTransportId,transportQty,selectedHotelId,hotelQty,checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        //     [travel_date,name,age,selectedTransportId, transportQty, selectedHotelId, hotelQty, checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount]

        // )

        //  const [data4] = await pool.query("INSERT INTO restaurant (travel_date,name,age,selectedTransportId,transportQty,selectedHotelId,hotelQty,checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        //     [travel_date,name,age,selectedTransportId, transportQty, selectedHotelId, hotelQty, checkIn,checkOut,selectedRestaurantId,restaurantQty,mode,transaction_id,date,amount]

        // )




        res.status(200).json({
            sucess: true,
            data: [],
            message: "bookCustomized is add sucessfuly"
        })



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