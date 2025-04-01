// This file tells TypeScript about global properties added by external scripts

declare global {
    interface Window {
      // Define the gtag function added by Google Analytics
      gtag?: (...args: any[]) => void;
  
      // Define the dataLayer array used by Google Analytics/Tag Manager
      dataLayer?: any[];
  
      // You could add other global declarations here if needed in the future
      // e.g., __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
    }
  }
  
  // Adding this empty export statement makes this file a module,
  // which is often necessary for global augmentations to be picked up correctly.
  export {};
  