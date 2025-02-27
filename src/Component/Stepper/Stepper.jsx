import { Link, useLocation } from "react-router-dom";

export default function Stepper() {
  const location = useLocation();

  // Define steps with corresponding paths
  const steps = [
    { label: "Your Email", path: "/setnewpassword" },
    { label: "Reset Code", path: "/setnewpassword/resetcode" },
    { label: "New Password", path: "/setnewpassword/newpassword" },
  ];

  return (
    <ol className="flex items-center justify-center text-xl font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-xs dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
      {steps.map((step, index) => {
        const isActive = location.pathname === step.path;
        const isCompleted =
          index < steps.findIndex((s) => s.path === location.pathname);

        return (
          <li
            key={index}
            className={`flex items-center dark:text-white ${
              isActive
                ? "text-green-600 dark:text-green-500 font-semibold"
                : "text-gray-700"
            }`}
          >
            <Link to={step.path} className="flex items-center">
              <span
                className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${
                  isActive
                    ? "border-green-600 dark:border-green-500"
                    : "border-gray-500 dark:border-gray-400"
                }`}
              >
                {index + 1}
              </span>
              {step.label}
              {index < steps.length - 1 && (
                <svg
                  className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 12 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m7 9 4-4-4-4M1 9l4-4-4-4"
                  />
                </svg>
              )}
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
