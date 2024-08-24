import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

async function UserProfile() {
    // Fetch the current user
    let user = await currentUser();

    // Handle the case where the user is not authenticated
    if (!user) {
        return (
            <div className="px-4 flex items-center gap-2 absolute bottom-0 mb-10">
                <p className="text-base-content">User not authenticated</p>
            </div>
        );
    };

    
    return (
        <div className="px-4 flex items-center gap-2 absolute bottom-0 mb-10">
            {/* After SignOut we will redirect to ' redirectUrl '  */}
            <UserButton afterSwitchSessionUrl="/" />
            <div>
                <p className="text-base-content relative top-0">
                    {user.fullName || "No name provided"}
                </p>
                <p className="text-base-content relative bottom-0">
                    {user.emailAddresses[0]?.emailAddress || "No email provided"}
                </p>
            </div>
        </div>
    );
}

export { UserProfile };
