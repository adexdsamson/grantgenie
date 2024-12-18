import { authenticationPagePaths, dashboardPagePaths } from "@/routes";
import { ComponentType, lazy } from "react";



export type PagePaths = typeof authenticationPagePaths | typeof dashboardPagePaths;


// This type ensures that the dynamic import returns the correct module.
type PageModules = {
    [K in keyof PagePaths]: Record<string, ComponentType<any>>;
};

// The getPage function dynamically imports a page and returns the required component.
export const getPageComponent = <
    TPath extends keyof PagePaths,
     TPagePath extends PagePaths
>(
    path: TPath,
    pagePaths: TPagePath  //string // Changed to string to handle dynamic component names
) => {
    return lazy(() =>
        import(pagePaths[path])
            .then((module: PageModules[TPath]) => {
                const component = module[path];
                if (!component) {
                    throw new Error(`Component '${String(path)}' does not exist in module '${path}'`);
                }
                return { default: component as ComponentType<any> };
            })
            .catch((err) => {
                console.error(`Error loading component '${String(path)}' from '${path}':`, err);
                throw err;
            })
    );
};

export const getPageRoutes = (pagePaths: PagePaths, type: "index" | "dashboard" = "index") => {
    if(type === "index") {
        return Object.entries(pagePaths).map(([pageTitle]) => {
            const Component = getPageComponent(pageTitle as keyof typeof pagePaths, pagePaths);
            const isIndex = pageTitle.toLowerCase() === "index";
            return { path:  isIndex ? "/" : `/${pageTitle.toLowerCase()}`, element: <Component /> }
          })
    }


    return Object.entries(pagePaths).map(([pageTitle]) => {
        const Component = getPageComponent(pageTitle as keyof typeof pagePaths, pagePaths);
        return { path: `/dashboard/${pageTitle.toLowerCase()}`, element: <Component /> }
      })
} 

export const getPagePath = (pagePaths: PagePaths, name: keyof typeof dashboardPagePaths) => {
    return Object.entries(pagePaths).find(item => item[0].includes(name));
}

export function base64ToFile(base64String: string, fileName: string) {
    // Split the base64 string into parts
    const [mimePart, dataPart] = base64String.split(",");
    if (mimePart === null) return;
    // Extract the mime type
    const mimeType = mimePart?.match?.(/:(.*?);/)?.[1];
    // Decode the base64 string
    const byteCharacters = atob(dataPart);
    // Create an array of bytes
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    // Convert to a typed array
    const byteArray = new Uint8Array(byteNumbers);
    // Create a File from the typed array
    const file = new File([byteArray], fileName, { type: mimeType });
  
    return file;
  }