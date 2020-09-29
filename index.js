
const Robots = {
    openOS : require('./robots/robot_put'),
    captureRegion : require('./robots/robot_capture_data.js'),
    infoRecol : require('./robots/robot_info_recol.js'),
}

const Robot = () => {
    //Robots.openOS()
    //Robots.captureRegion()
    Robots.infoRecol()
}
Robot()
