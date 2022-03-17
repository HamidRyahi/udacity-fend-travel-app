const imgContainer = document.querySelector('.img_container');

const updateImg = (dt) => {
    imgContainer.setAttribute('src', '');
    if (dt.img !== undefined) {
        imgContainer.setAttribute('src', `${dt.img}`);
    }
    if (dt.img === undefined) {
        imgContainer.src = `${dt.countryFlagsBase}${geoNamesData[0].countryCode.toLowerCase()}.jpg`;
    }
}

export { updateImg }
