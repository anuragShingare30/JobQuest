import React from "react";
import { Button } from "../components/ui/button";




const HomePage = () => {
  return (
    <div>
      <div>
        <div className="navbar bg-base-300">
          {/* <img src="logo.svg" alt="logo" width="150px"/> */}
          <h1 className="text-3xl font-bold mx-10">JobQuest</h1>
        </div>
      </div>
      <div className="flex items-center gap-12">
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img
              src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
              className="max-w-sm rounded-lg shadow-2xl" />

            <div className="mx-20">
              <h1 className="text-6xl font-bold">Job <span className="text-blue-600">Tracking</span> App</h1>
              <p className="py-6 w-96">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                quasi. In deleniti eaque aut repudiandae et a id nisi.
              </p>
              <button className="btn btn-primary">Get Started</button>
            </div>

          </div>
        </div>
      </div>
    </div>

  )
}

export default HomePage;
