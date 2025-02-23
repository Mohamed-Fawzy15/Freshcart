import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Stepper from "../../Component/Stepper/Stepper";

export default function SetNewPassword() {
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    // Define step mapping based on route paths
    const stepMapping = {
      "/set-password": 1,
      "/set-password/resetcode": 2,
      "/set-password/newpassword": 3,
    };

    // Update step based on the current route
    setActiveStep(stepMapping[location.pathname] || 1);
  }, [location.pathname]); // Runs every time route changes

  return (
    <div>
      <div className="container my-5">
        <Stepper activeStep={activeStep} />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
