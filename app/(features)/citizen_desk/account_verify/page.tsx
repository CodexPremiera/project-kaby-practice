// "use client";
"use server";
import AccVerifyClient from "./AccVerifyClient";

import TemporaryAccountService from "@/services/TemporaryAccountService";
import { createClient } from "@/utils/supabase/server";
export default async function AccountVerify() {

	return <AccVerifyClient/>;
	
}