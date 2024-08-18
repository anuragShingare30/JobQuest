import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

async function UserProfile(){

    let user = await currentUser();
    // console.log(user.username);

    return (
        <div className="px-4 flex items-center gap-2 absolute bottom-0 mb-10">
             {/* After SignOut we will redirect to ' redirectUrl '  */}
            <UserButton afterSwitchSessionUrl="/"></UserButton>
            <div> 
                <p className="text-base-content relative top-0">{user.fullName ? user.fullName : null}</p> 
                <p className="text-base-content relative bottom-0">{user.emailAddresses[0].emailAddress}</p>
                
            </div>
            
        </div>
    );
};

export {UserProfile}; 
