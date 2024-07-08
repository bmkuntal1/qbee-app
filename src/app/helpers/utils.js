// Helper functions for the application

// Function to get the api file url 
export const getApiFileUrl = (fileName) => {
    //get the api url from the environment
    let apiUrl = import.meta.env.VITE_API_URL;
    //replace the api part with the file name
    const url = apiUrl.replace("api", fileName);
    return url;
}

// Function to group the custom list item by type
export const groupCustomList = (data) => {
    const customList = Object.groupBy(data, ({ type }) => type);
    return customList;
}

// Function to convert the attributes to object
export const convertAttributesToObject = (attributes) => {
    const attribs = {}
    if (attributes) {
        attributes.forEach((item) => {
            const [key, value] = item.split(":");
            attribs[key] = value;
        });
    }
    return attribs;
}
