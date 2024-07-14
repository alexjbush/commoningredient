// See https://kit.svelte.dev/docs/types#app

import type { Locale } from "$lib/lang";
import type { UserPreference } from "$lib/types";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			userPreference: UserPreference
			user: null
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
