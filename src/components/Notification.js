import React from "react";

function Notification() {
  return (
    <>
      <div classNameName="col-lg-12">
        <div className="pagetitle">
          <h1>Notifications</h1>
        </div>

        <section className="section contact">
          <div className="row gy-4">
            <div className="col-xl-12">
              <div className="notifications card p-4">
                <ul className="list-unstyled">
                  <li class="notification-item border-bottom">
                    <i class="bi bi-exclamation-circle text-warning"></i>
                    <div>
                      <h4>Jin sakia has deposit job funds to Escrow:</h4>
                      <p>
                        We are seeking a talented Front End Developer with a
                        keen eye for design to join us in developing a stealth{" "}
                      </p>
                      <p>30 min. ago</p>
                    </div>
                  </li>

                  <li class="notification-item border-bottom">
                    <i class="bi bi-x-circle text-danger"></i>
                    <div>
                      <h4>Bin jane has declined your offer for Job:</h4>
                      <p>
                        We are seeking a talented Front End Developer with a
                        keen eye for design to join us in developing a stealth{" "}
                      </p>
                      <p>1 hr. ago</p>
                    </div>
                  </li>

                  <li class="notification-item border-bottom">
                    <i class="bi bi-check-circle text-success"></i>
                    <div>
                      <h4>Paul brown has accept your offer for Job:</h4>
                      <p>
                        We are seeking a talented Front End Developer with a
                        keen eye for design to join us in developing a stealth{" "}
                      </p>
                      <p>2 hrs. ago</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Notification;
