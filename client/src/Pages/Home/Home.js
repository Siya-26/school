import React from 'react';
import Sidebar from '../../components/Sidebar';
import PastEvents from '../../components/pastEvents';
import '../../globals.css';

function Home() {
    return (
        <div className="DashboardContainer">
            <Sidebar/>
            <div className="ContentArea">
                <div className="home">       
                    <div className="main-content">
                        <div>
                            <h2 className='title-home'>
                                Events
                            </h2>
                        </div>
                        <div className="past-events-container">
                            
                            <PastEvents />
                        </div>
                        <div className="upcoming-events">
                            <h2>Upcoming Events</h2>
                            <p>Nothing yet. Here you use the cards above but with your own details. Events go in the past events component.</p>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    );
}

export default Home;