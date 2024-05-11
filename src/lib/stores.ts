// place files you want to import through the `$lib` alias in this folder.
import { writable } from "svelte/store";
import type { Session, githubSession, Placemark, PlacemarkPlus } from "$lib/types/placemark-types";

export const currentSession = writable<Session>();
export const githubSession = writable<githubSession>();
export const subTitle = writable<string>();
export const placemarkStore = writable<Placemark[]>([]);
export const placemarkPlusStore = writable<PlacemarkPlus[]>([]);
export const latestPlacemark = writable<Placemark>();
