import React, { useEffect, useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useFormik } from 'formik';
import { Swiper, SwiperSlide } from 'swiper/react';
import TextField from '@mui/material/TextField';





// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { getlocation } from '../../redux/slice/location.slice';
import { getblog } from '../../redux/slice/blog.slice';
import { getpackage } from '../../redux/slice/package.slice';
import { addcontect, putcontect } from '../../redux/slice/contect.slice';
import { object, string } from 'yup';

function Home(props) {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getlocation());
        dispatch(getblog());
        dispatch(getpackage());

    }, []);

    const locationdata = useSelector(State => State.location);
    console.log(locationdata.location);

    const blogdata = useSelector(State => State.blog);
    console.log(blogdata.blog);

    const packagedata = useSelector(State => State.package);
    console.log(packagedata.package);

    const auth=useSelector((state) => state.auth);
    console.log(auth);
    

    const [update, setupdate] = useState(false);

    const handleClose = () => { };
    const handleClickOpen = () => { };

    

    let contectschema = object({
        name: string().required('please enter name'),
        email: string().required('please enter email'),
        subject: string().required('please enter subject'),
        message: string().required('please select message'),



    });

    const formik = useFormik({
        initialValues: {

            name: '',
            email: '',
            subject: '',
            message: '',



        },
        validationSchema: contectschema,

        

        onSubmit: (values, { resetForm }) => {
            console.log(values);
        //     if (update) {
        //         console.log("update data");
        //         dispatch(putcontect(values));
        //     } else {
        //         dispatch(addcontect(values));

        //     }
        //     resetForm();
        //     handleClose()
        // },
         if (auth.user) {
            dispatch(bookpackage(values))
                
            } else {
             alert("please login first.");
             
             navigate("/login")

            }
            resetForm();
           
        },
    });

    const handleEdit = (data) => {
        console.log(data);
        handleClickOpen();
        formik.setValues(data);
        setupdate(true);

    }

    console.log(formik.errors, formik.touched);

    return (
        <main>
            <section id="hero">
                <div className="container">
                    <div className="hero-size">
                        <h1>Make in your journey.</h1>
                        <p className="sub-title">
                            Explore the world with what you love beautiful natural beauty.
                        </p>
                        {/* <form action="#" className="hero-form">
                            <select name="location" id="location">
                                <option value={0}>Location</option>
                                <option value="Goa">Goa</option>
                                <option value="Manali">Manali</option>
                            </select>
                            <select name="Data" id="data">
                                <option value={0}>Data</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                            </select>
                            <select name="People" id="people">
                                <option value={0}>People</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                            </select>
                            <input type="submit" name="Explore now" className="btn" />
                        </form>
                        <p><b>Popular Place :</b> Bali, Istanbul, Rome, Paris</p> */}
                    </div>
                </div>
            </section>
            <section id="About-US">
                <div className="container">
                    <h2 className="main-title">About US</h2>
                    <p className="sub-title">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="row all-work">
                        <div className="col-lg-4 col-md-6">
                            <div className="work">
                                <img src="./assets/image/Vector.png" alt />
                                <h2>Great team work</h2>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam..
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="work">
                                <img src="./assets/image/Vector (1).png" alt />
                                <h2>Our vision</h2>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam..
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="work">
                                <img src="./assets/image/Vector (2).png" alt />
                                <h2>Our mision</h2>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam..
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="Founder">
                <div className="container">
                    <div className="row all-siti">
                        <div className="col-lg-6 col-12">
                            <div className="siti-img">
                                <img src="./assets/image/Founder.png" alt />
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div className="siti-data">
                                <img src="./assets/image/Vector-4.png" alt />
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                                    porttitor sapien et urna tincidunt fringilla. Vivamus at augue
                                    interdum, blandit arcu quis, laoreet ipsum. In eu ipsum urna.
                                    Suspendisse suscipit est et neque.
                                </p>
                                <p>
                                    Mauris tempor tellus ante, ut fermentum erat gravida vel.
                                    Class aptent taciti sociosqu ad litora torquent per conubia
                                    nostra, per inceptos himenaeos. Aenean nec justo dui. Ut et
                                    consequat dui, a malesuada ipsum. Pellentesque nec turpis
                                    viverra, blandit mi a, accumsan justo.
                                </p>
                                <h4>Siti Sarah</h4>
                                <p>Founder Travosca</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="Popular-Packages">
                <div className="container">
                    <h2 className="main-title">Packages</h2>
                    <p className="sub-title">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="row all-popular">
                        <div className="Popular-data col-lg-6">
                            <h2>Popular Packages</h2>
                            <p>
                                orem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna
                            </p>
                        </div>
                        <div className="col-lg-3">
                            <a href="#" className="btn btn-1">Discover more</a>
                        </div>
                    </div>
                    <div className="row card">
                        {
                            packagedata.package?.map((v2) => (
                                <div className="col-lg-4 col-md-6">
                                    <div className="card-data resultImg">
                                        <div className="pckImg">
                                            <img src={"http://localhost:4000/" + v2.image} />                                        </div>
                                        <div className="Packages-data">
                                            <div className="day-price">


                                                <h4>{v2.name}</h4>
                                                <p>{v2.price}</p>
                                            </div>
                                            <p>
                                                {v2.duration}
                                            </p>
                                            <div className="row price">
                                                <div>
                                                    <span><i className="fa-solid fa-star" /></span>
                                                    <span><i className="fa-solid fa-star" /></span>
                                                    <span><i className="fa-solid fa-star" /></span>
                                                    <span><i className="fa-solid fa-star" /></span>
                                                    <span><i className="fa-solid fa-star" /></span>
                                                </div>
                                                <div>
                                                    <a href="#" className="btn">Booking now</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                            )

                        };

                    </div>
                </div>
            </section>
            <section id="Destination">
                <div className="container">
                    <h2 className="main-title">Location</h2>
                    <p className="sub-title">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>

                    <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={50}
                        slidesPerView={3}
                        navigation
                        pagination={{ clickable: true }}
                        // scrollbar={{ draggable: true }}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}


                    >
                        {
                            locationdata.location?.map((v) => (

                                <SwiperSlide><div className="all-data">
                                    <div className="slider-img">
                                        <img src={"http://localhost:4000/" + v.image} />
                                    </div>
                                    <div className="slide-data">
                                        <div className="slide-data1">“</div>
                                        <h4>{v.name}</h4>
                                        <p>
                                            {v.description}
                                        </p>
                                    </div>
                                </div></SwiperSlide>
                            ))
                        };






                    </Swiper>

                    {/* <div className="swiper products-slider">
                       

                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div className="all-data">
                                    <div className="slider-img">
                                        <img src="./assets/image/2.jpg" alt />
                                    </div>
                                    <div className="slide-data">
                                        <div className="slide-data1">“</div>
                                        <h4>Bali, Indonesia.</h4>
                                        <p>
                                            Bali is a beautiful tourist spot and is visited by many
                                            travelers.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="all-data">
                                    <div className="slider-img">
                                        <img src="./assets/image/3.jpg" alt />
                                    </div>
                                    <div className="slide-data">
                                        <div className="slide-data1">“</div>
                                        <h4>Bali, Indonesia.</h4>
                                        <p>
                                            Bali is a beautiful tourist spot and is visited by many
                                            travelers.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="all-data">
                                    <div className="slider-img">
                                        <img src="./assets/image/4.jpg" alt />
                                    </div>
                                    <div className="slide-data">
                                        <div className="slide-data1">“</div>
                                        <h4>Bali, Indonesia.</h4>
                                        <p>
                                            Bali is a beautiful tourist spot and is visited by many
                                            travelers.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="all-data">
                                    <div className="slider-img">
                                        <img src="./assets/image/5.jpg" alt />
                                    </div>
                                    <div className="slide-data">
                                        <div className="slide-data1">“</div>
                                        <h4>Bali, Indonesia.</h4>
                                        <p>
                                            Bali is a beautiful tourist spot and is visited by many
                                            travelers.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="all-data">
                                    <div className="slider-img">
                                        <img src="./assets/image/Paris.avif" alt />
                                    </div>
                                    <div className="slide-data">
                                        <div className="slide-data1">“</div>
                                        <h4>Bali, Indonesia.</h4>
                                        <p>
                                            Bali is a beautiful tourist spot and is visited by many
                                            travelers.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="all-data">
                                    <div className="slider-img">
                                        <img src="./assets/image/Singapore.avif" alt />
                                    </div>
                                    <div className="slide-data">
                                        <div className="slide-data1">“</div>
                                        <h4>Bali, Indonesia.</h4>
                                        <p>
                                            Bali is a beautiful tourist spot and is visited by many
                                            travelers.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="all-data">
                                    <div className="slider-img">
                                        <img src="./assets/image/Swiss.avif" alt />
                                    </div>
                                    <div className="slide-data">
                                        <div className="slide-data1">“</div>
                                        <h4>Bali, Indonesia.</h4>
                                        <p>
                                            Bali is a beautiful tourist spot and is visited by many
                                            travelers.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="all-data">
                                    <div className="slider-img">
                                        <img src="./assets/image/Thailand.avif" alt />
                                    </div>
                                    <div className="slide-data">
                                        <div className="slide-data1">“</div>
                                        <h4>Bali, Indonesia.</h4>
                                        <p>
                                            Bali is a beautiful tourist spot and is visited by many
                                            travelers.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-button-prev" />
                            <div className="swiper-button-next" />
                        </div>
                    </div> */}
                </div>
            </section>
            <section id="Blog">
                <div className="container">
                    <h2 className="main-title">Blog</h2>
                    <p className="sub-title">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="row all-blog">




                        {
                            blogdata.blog?.map((v1) => (
                                <div className="col-sm-12 col-lg-4 col-md-6">
                                    <div className="Blog-left">
                                        <h5>{new Date(v1.date).toLocaleDateString()}</h5>
                                        <img src={"http://localhost:4000/" + v1.blog_img} className='blog_img' />
                                        <h4>{v1.title}</h4>
                                        <p>
                                            {v1.description}
                                        </p>

                                        <a href="#" className="btn">Read More</a>
                                    </div>
                                </div>
                            ))
                        };


                        {/* <div className="col-sm-12 col-lg-12 col-md-6">
                                    <div className="Blog-left">
                                        <h5>Tips | Travel</h5>
                                        <h4>How Are We Going Travel in 2022 -</h4>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            sed do eiusmod tempor incididunt ut labore et dolore magna
                                        </p>
                                        <a href="#" className="btn">Read More</a>
                                    </div>
                                </div> */}


                        {/* <div className="col-lg-7">
                            <div className="Blog-right">
                                <div className="Blog-img">
                                    <img src="./assets/image/Travel.jpg" alt="Travel-img" />
                                </div>
                                <div className="Blog-data">
                                    <h5>Stories | Tips</h5>
                                    <h4>Travel Stories For Now and the Future</h4>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                        do eiusmod tempor incididunt ut labore et dolore magna
                                    </p>
                                    <a href="#" className="btn">Read More</a>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>
            <section id="Contact">
                <div className="container">
                    <h2 className="main-title">Contact</h2>
                    <p className="sub-title">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="row all-Contact">
                        <div className="col-lg-5">

                            <form onSubmit={formik.handleSubmit} id="contect-form">
                                <TextField

                                    error={formik.errors.name && formik.touched.name}
                                    margin="dense"
                                    id="name"
                                    name="name"
                                    label="name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    helperText={formik.errors.name && formik.touched.name ? formik.errors.name : ''}
                                />
                                <TextField

                                    error={formik.errors.email && formik.touched.email}
                                    margin="dense"
                                    id="email"
                                    name="email"
                                    label="email"
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    helperText={formik.errors.email && formik.touched.email ? formik.errors.email : ''}
                                />
                                <TextField

                                    error={formik.errors.subject && formik.touched.subject}
                                    margin="dense"
                                    id="subject"
                                    name="subject"
                                    label="subject"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.subject}
                                    helperText={formik.errors.subject && formik.touched.subject ? formik.errors.subject : ''}
                                />
                                <TextField

                                    error={formik.errors.message && formik.touched.message}
                                    margin="dense"
                                    id="message"
                                    name="message"
                                    label="message"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.message}
                                    helperText={formik.errors.message && formik.touched.message ? formik.errors.message : ''}
                                />
                                <input type="submit" defaultValue="Send Message" className="btn" />
                            </form>


                        </div>
                        {/* <div className="col-lg-7 Contact-data">
                            <h2 className="main-title">Get In Touch</h2>
                            <p className="sub-title">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna
                            </p>
                            <div className="row Contact-data1">
                                <div className="col-md-6 col-12">
                                    <h5>Lhoksemawe, Aceh</h5>
                                    <p>
                                        <span><i className="fa-solid fa-phone" /></span>+62 6943 6956
                                    </p>
                                    <p>
                                        <span><i className="fa-solid fa-comment" /></span>contact@domain.com
                                    </p>
                                    <p>
                                        <span><i className="fa-solid fa-location-dot" /></span>Jl.
                                        Darussalam Hagu selatan
                                    </p>
                                </div>
                                <div className="col-md-6 col-12">
                                    <h5>Lhoksemawe, Aceh</h5>
                                    <p>
                                        <span><i className="fa-solid fa-phone" /></span>+62 6943 6956
                                    </p>
                                    <p>
                                        <span><i className="fa-solid fa-comment" /></span>contact@domain.com
                                    </p>
                                    <p>
                                        <span><i className="fa-solid fa-location-dot" /></span>Jl.
                                        Darussalam Hagu selatan
                                    </p>
                                </div>
                                <div className="col-md-6 col-12">
                                    <h5>Lhoksemawe, Aceh</h5>
                                    <p>
                                        <span><i className="fa-solid fa-phone" /></span>+62 6943 6956
                                    </p>
                                    <p>
                                        <span><i className="fa-solid fa-comment" /></span>contact@domain.com
                                    </p>
                                    <p>
                                        <span><i className="fa-solid fa-location-dot" /></span>Jl.
                                        Darussalam Hagu selatan
                                    </p>
                                </div>
                                <div className="col-md-6 col-12">
                                    <h5>Lhoksemawe, Aceh</h5>
                                    <p>
                                        <span><i className="fa-solid fa-phone" /></span>+62 6943 6956
                                    </p>
                                    <p>
                                        <span><i className="fa-solid fa-comment" /></span>contact@domain.com
                                    </p>
                                    <p>
                                        <span><i className="fa-solid fa-location-dot" /></span>Jl.
                                        Darussalam Hagu selatan
                                    </p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>
            {/* <section id="Subcribe">
                <div className="container">
                    <div className="Subcribe-size">
                        <h2 className="main-title">Subcribe to get special price</h2>
                        <p className="sub-title">
                            Dont wanna miss something? subscribe right now and get special
                            promotion and monthly newsletter
                        </p>
                        <form action="#" className="Subcribe-form">
                            <input type="email" className="email" placeholder="Type your  email herel" />
                            <input type="submit" name="Explore now" defaultValue="Subscribe" className="btn" />
                        </form>
                    </div>
                </div>
            </section> */}
        </main>

    );
}

export default Home;