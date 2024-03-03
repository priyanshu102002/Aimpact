import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-500">
            {children}
        </div>
    );
};

export default AuthLayout;
