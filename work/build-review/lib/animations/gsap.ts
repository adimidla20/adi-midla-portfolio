"use client";

import gsapImport from "gsap";
import { ScrollTrigger as ScrollTriggerPlugin } from "gsap/ScrollTrigger";
import { useGSAP as useGSAPHook } from "@gsap/react";

gsapImport.registerPlugin(ScrollTriggerPlugin, useGSAPHook);

export const gsap = gsapImport;
export const ScrollTrigger = ScrollTriggerPlugin;
export const useGSAP = useGSAPHook;
