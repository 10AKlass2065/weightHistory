export const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const validatePassword = (password) => {
    return password.length > 4;
}

export const generateFakeData = () => {
    const data = []
    let date = new Date()
    let count = 60;
    for(let i = 0; i < 365; i++) {
        let decrease = Math.random() >= 0.5 && count < 80 && count > 60
        data.push({
            readableDate: date.toJSON().substring(0,10),
            date: new Date(date.toJSON().substring(0,10)).toJSON(),
            weight: (decrease ? count-- : count++).toFixed(1)
        })
        date.setDate(date.getDate()-1);
    }

    return data
}

export const filterWeightData = (startDate, endDate, weightData) => {
    const preparedStartDate = new Date(startDate.toJSON().substring(0,10));
    const preparedEndDate = new Date(endDate.toJSON().substring(0,10));

    return weightData
        .filter(data => new Date(data.date) <= preparedStartDate && new Date(data.date) >= preparedEndDate)
        .sort((a, b) => b.date - a.date);
}