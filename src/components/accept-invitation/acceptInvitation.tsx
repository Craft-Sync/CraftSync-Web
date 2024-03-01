"use client";
import { signIn, useSession } from "next-auth/react";
import { FC } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface acceptInvitationProps {
  workspaceName: string;
  workspaceId: string;
  code: string;
}

export const AcceptInvitation: FC<acceptInvitationProps> = ({
  workspaceName,
  workspaceId,
  code,
}: acceptInvitationProps) => {
  // console.log("code: ", code, "workspaceId: ", workspaceId, "workspaceName: ", workspaceName);

  // TODO:
  // design invitation page
  // complete invitation api
  const { data: session, status } = useSession();
  if (status === "loading") {
    // make loader beautiful
    return <Loader2 className="h-4 w-4 animate-spin" />;
  }
  console.log(session?.user);
  

  return (
    
    <div>
      <MaxWidthWrapper className="mb-12 mt-20 sm:mt-20 flex flex-col items-center justify-center text-center">
        <h1 className="max-w-5xl text-6xl font-bold md:text-7xl lg:text-7xl">
          Craft<span className="text-blue-600">Sync</span>{" "}
        </h1>
        <p className="mt-5 max-w-[338px] text-zinc-700 sm:text-md">
          Elevate creativity with seamless collaboration. Effortless video
          syncing for your content creation joureny.
        </p>
        <p className="mt-4 font-bold text-zinc-700">You are Invited to join <span className="text-blue-600">{workspaceName}</span> workspace</p>

        {!session?.user ? (
          <button className={buttonVariants({ size: "lg", className: "mt-5" })} onClick={() =>
            signIn("google", {
              callbackUrl: `${process.env.NEXT_PUBLIC_URL}/accept-invitation?code=${code}&id=${workspaceId}&name=${workspaceName}`,
            })
          }>Login to Join</button>
        ) : (
          <button
          className={buttonVariants({
            size: "lg",
            className: "mt-5",
          })}
          onClick={() =>
            console.log("hiiii")
            
          }
          
          >
          Join Workspace
        </button>
        )}
      </MaxWidthWrapper>
      
    </div>
  );
};