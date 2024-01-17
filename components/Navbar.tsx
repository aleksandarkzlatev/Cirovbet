import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import Logout from "@/app/logout";

export default async function NavBar() {
	const session = await getServerSession();
  return (
    <div className="navbar">
		<Link className="left" href="/">
			<Image src="/logo.png" alt="CirovBet" width={100} height={100} />
		</Link>

		<div className="center">
			<Link className='nav-path' href="/market">Market</Link>
			<Link className='nav-path' href="/trading">Trading</Link>
		</div>

		<div className="right">
			{!session &&
			<Link className='nav-path' href="/api/auth/signin">Sign up</Link>
			}
			{session &&
			<Logout />
			}
			{session &&
			<Link className='nav-path' href="/profile">Profile</Link>
			}
			{!session &&
			<Link className='nav-path' href="/logIn">Log in</Link>
			}
		</div>
	</div>
  );
}
