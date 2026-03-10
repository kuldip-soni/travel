import React from 'react';

function Home(props) {
    return (
        <main>
            <section id="hero">
                <div className="container">
                    <div className="hero-size">
                        <h1>Make in your journeyc.</h1>
                        <p className="sub-title">
                            Explore the world with what you love beautiful natural beauty.
                        </p>
                        <form action="#" className="hero-form">
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
                        <p><b>Popular Place :</b> Bali, Istanbul, Rome, Paris</p>
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
                        <div className="col-lg-4 col-md-6">
                            <div className="card-data resultImg">
                                <div className="pckImg">
                                    <img src="./assets/image/Paris.avif" alt="Paris-img" />
                                </div>
                                <div className="Packages-data">
                                    <div className="day-price">
                                        <h4>Paris</h4>
                                        <p>$299.00/2days</p>
                                    </div>
                                    <p>
                                        Lorem ipsum dolor sit amet, consect adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore incididunt ut
                                        labore et dolore
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
                        <div className="col-lg-4 col-md-6">
                            <div className="card-data resultImg">
                                <div className="pckImg">
                                    <img src="./assets/image/Swiss.avif" alt="Swiss-img" />
                                </div>
                                <div className="Packages-data">
                                    <div className="day-price">
                                        <h4>Swiss</h4>
                                        <p>$299.00/3days</p>
                                    </div>
                                    <p>
                                        Lorem ipsum dolor sit amet, consect adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore incididunt ut
                                        labore et dolore
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
                        <div className="col-lg-4 col-md-6">
                            <div className="card-data resultImg">
                                <div className="pckImg">
                                    <img src="./assets/image/Thailand.avif" alt="Thailand-img" />
                                </div>
                                <div className="Packages-data">
                                    <div className="day-price">
                                        <h4>Thailand</h4>
                                        <p>$299.00/3days</p>
                                    </div>
                                    <p>
                                        Lorem ipsum dolor sit amet, consect adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore incididunt ut
                                        labore et dolore
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
                        <div className="col-lg-4 col-md-6">
                            <div className="card-data resultImg">
                                <div className="pckImg">
                                    <img src="./assets/image/Taiwan.avif" alt="Taiwan-img" />
                                </div>
                                <div className="Packages-data">
                                    <div className="day-price">
                                        <h4>Taiwan</h4>
                                        <p>$299.00/4days</p>
                                    </div>
                                    <p>
                                        Lorem ipsum dolor sit amet, consect adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore incididunt ut
                                        labore et dolore
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
                        <div className="col-lg-4 col-md-6">
                            <div className="card-data resultImg">
                                <div className="pckImg">
                                    <img src="./assets/image/Indonesi.avif" alt="Indonesi-img" />
                                </div>
                                <div className="Packages-data">
                                    <div className="day-price">
                                        <h4>Indonesi</h4>
                                        <p>$299.00/3days</p>
                                    </div>
                                    <p>
                                        Lorem ipsum dolor sit amet, consect adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore incididunt ut
                                        labore et dolore
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
                        <div className="col-lg-4 col-md-6">
                            <div className="card-data resultImg">
                                <div className="pckImg">
                                    <img src="./assets/image/Singapore.avif" alt="Singapore-img" />
                                </div>
                                <div className="Packages-data">
                                    <div className="day-price">
                                        <h4>Singapore</h4>
                                        <p>$299.00/3days</p>
                                    </div>
                                    <p>
                                        Lorem ipsum dolor sit amet, consect adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore incididunt ut
                                        labore et dolore
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
                    </div>
                </div>
            </section>
            <section id="Destination">
                <div className="container">
                    <h2 className="main-title">Destination</h2>
                    <p className="sub-title">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="swiper products-slider">
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
                        </div>
                        <div className="swiper-button-prev" />
                        <div className="swiper-button-next" />
                    </div>
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
                        <div className="col-lg-5 col-md-12">
                            <div className="row Blog-left-all">
                                <div className="col-sm-12 col-lg-12 col-md-6">
                                    <div className="Blog-left">
                                        <h5>Perfect | Tips</h5>
                                        <h4>9 Popular Travel Destintion on Sale in 2022 -</h4>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            sed do eiusmod tempor incididunt ut labore et dolore magna
                                        </p>
                                        <a href="#" className="btn">Read More</a>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-lg-12 col-md-6">
                                    <div className="Blog-left">
                                        <h5>Tips | Travel</h5>
                                        <h4>How Are We Going Travel in 2022 -</h4>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            sed do eiusmod tempor incididunt ut labore et dolore magna
                                        </p>
                                        <a href="#" className="btn">Read More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
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
                        </div>
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
                            <form action="#" className="Contact-form">
                                <input type="text" placeholder="Your Name" />
                                <input type="email" placeholder="Your EMail" />
                                <input type="text" placeholder="Subject" />
                                <textarea name id cols={30} rows={10} placeholder="Your Message" defaultValue={""} />
                                <input type="submit" defaultValue="Send Message" className="btn" />
                            </form>
                        </div>
                        <div className="col-lg-7 Contact-data">
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
                        </div>
                    </div>
                </div>
            </section>
            <section id="Subcribe">
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
            </section>
        </main>

    );
}

export default Home;