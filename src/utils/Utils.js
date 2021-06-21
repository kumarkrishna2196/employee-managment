const getRandomString  = () => {
    return (new Date()).getTime().toString();
};

const generateEmployeeID  = () => {
    return `EMP_${getRandomString()}`;
};
const Utils = {
    getRandomString,
    generateEmployeeID
}
export default Utils;