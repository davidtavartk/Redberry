export const formatPhoneNumber = (number) => {
    const match = number.toString().match(/(\d{3})(\d{3})(\d{3})/);
    return match ? `${match[1]} ${match[2]} ${match[3]}` : number;
};
