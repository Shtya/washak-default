"use client"

import { useEffect } from "react";

export function onEnter(func) {
  
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Enter') {
				func();
			}
		};
	
		// Attach the event listener when component mounts
		document.addEventListener('keydown', handleKeyDown);
	
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [func]);

}
