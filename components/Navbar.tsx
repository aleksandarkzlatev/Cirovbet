import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"

export default function NavBar() {
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
			<Button className="auth-btns" variant={"outline"}>Log In</Button>
			<Button className="auth-btns" variant={"outline"}>Sign Up</Button>
		</div>
	</div>
  );
}
