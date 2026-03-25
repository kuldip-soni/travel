import React from 'react';

function Login(props) {
    return (
           <main>
      <section>
        <div className="container">
          <div className="row" style={{ justifyContent: "space-between", marginTop: '50px' }}>
            <div className="col-5">
                <img src="assets/image/login.png" alt="" width={"100%"} height={"500px"} />
            </div>
            <div className="col-6">
              <div className="login">
                <form>
                  <h3>Login</h3>
                  <div className="row">
                    
                    <div className="col-12">
                      <input type="email" placeholder="Email" required />
                    </div>
                    <div className="col-12">
                      <input type="password" placeholder="Password" required />
                    </div>
                    <div className="col-12">
                      <input
                        type="submit"
                        defaultValue="login"
                        className="btn"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    );
}

export default Login;